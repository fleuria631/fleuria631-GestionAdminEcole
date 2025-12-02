/*
  # Système de gestion des demandes étudiants

  1. Tables créées
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `nom_complet` (text)
      - `numero_inscription` (text, unique)
      - `role` (text: 'etudiant' ou 'admin')
      - `created_at` (timestamptz)
    
    - `demandes`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `type_demande` (text: 'releve', 'attestation', 'certificat')
      - `sous_type` (text: type spécifique selon la demande)
      - `details` (jsonb: contient toutes les informations de la demande)
      - `statut` (text: 'en_attente', 'en_cours', 'terminee')
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Sécurité
    - Enable RLS sur toutes les tables
    - Les étudiants peuvent lire leurs propres données
    - Les étudiants peuvent créer leurs propres demandes
    - Les admins peuvent tout voir et tout modifier
    - Policies restrictives par défaut
*/

-- Table profiles pour les informations utilisateurs
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nom_complet text NOT NULL,
  numero_inscription text UNIQUE NOT NULL,
  role text NOT NULL DEFAULT 'etudiant' CHECK (role IN ('etudiant', 'admin')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Table demandes pour toutes les demandes (relevés, attestations, certificats)
CREATE TABLE IF NOT EXISTS demandes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type_demande text NOT NULL CHECK (type_demande IN ('releve', 'attestation', 'certificat')),
  sous_type text,
  details jsonb NOT NULL DEFAULT '{}',
  statut text NOT NULL DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'en_cours', 'terminee')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE demandes ENABLE ROW LEVEL SECURITY;

-- RLS Policies pour profiles
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can read all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- RLS Policies pour demandes
CREATE POLICY "Students can read own demandes"
  ON demandes FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Students can create own demandes"
  ON demandes FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can read all demandes"
  ON demandes FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update all demandes"
  ON demandes FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour updated_at sur demandes
DROP TRIGGER IF EXISTS update_demandes_updated_at ON demandes;
CREATE TRIGGER update_demandes_updated_at
  BEFORE UPDATE ON demandes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour créer automatiquement un profil lors de l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, nom_complet, numero_inscription, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nom_complet', ''),
    COALESCE(NEW.raw_user_meta_data->>'numero_inscription', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'etudiant')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour créer le profil automatiquement
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
