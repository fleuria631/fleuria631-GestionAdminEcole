import { supabase } from './supabase';
import type { Demande } from './supabase';

export async function createDemande(
  type_demande: 'releve' | 'attestation' | 'certificat',
  sous_type: string | null,
  details: Record<string, any>
) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Non authentifié');

  const { data, error } = await supabase
    .from('demandes')
    .insert({
      user_id: user.id,
      type_demande,
      sous_type,
      details,
      statut: 'en_attente'
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getMyDemandes() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Non authentifié');

  const { data, error } = await supabase
    .from('demandes')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Demande[];
}

export async function getAllDemandes() {
  const { data, error } = await supabase
    .from('demandes')
    .select(`
      *,
      profiles:user_id (
        nom_complet,
        numero_inscription
      )
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateDemandeStatut(demandeId: string, statut: 'en_attente' | 'en_cours' | 'terminee') {
  const { data, error } = await supabase
    .from('demandes')
    .update({ statut })
    .eq('id', demandeId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
