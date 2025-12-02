import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  nom_complet: string;
  numero_inscription: string;
  role: 'etudiant' | 'admin';
  created_at: string;
};

export type Demande = {
  id: string;
  user_id: string;
  type_demande: 'releve' | 'attestation' | 'certificat';
  sous_type: string | null;
  details: Record<string, any>;
  statut: 'en_attente' | 'en_cours' | 'terminee';
  created_at: string;
  updated_at: string;
};
