import { storageService, type Demande } from './storage';
import { getCurrentUser } from './auth';

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export async function createDemande(
  type_demande: 'releve' | 'attestation' | 'certificat',
  sous_type: string | null,
  details: Record<string, any>
) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Non authentifié');

  const demandes = storageService.getDemandes();
  const newDemande: Demande = {
    id: generateId(),
    user_id: user.id,
    type_demande,
    sous_type,
    details,
    statut: 'en_attente',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  demandes.push(newDemande);
  storageService.saveDemandes(demandes);

  return newDemande;
}

export async function getMyDemandes() {
  const user = await getCurrentUser();
  if (!user) throw new Error('Non authentifié');

  const demandes = storageService.getDemandes();
  return demandes
    .filter(d => d.user_id === user.id)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function getAllDemandes() {
  const demandes = storageService.getDemandes();
  const profiles = storageService.getProfiles();

  return demandes
    .map(d => ({
      ...d,
      profiles: profiles.find(p => p.id === d.user_id) || { nom_complet: '', numero_inscription: '' }
    }))
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function updateDemandeStatut(demandeId: string, statut: 'en_attente' | 'en_cours' | 'terminee') {
  const demandes = storageService.getDemandes();
  const index = demandes.findIndex(d => d.id === demandeId);

  if (index === -1) throw new Error('Demande non trouvée');

  demandes[index].statut = statut;
  demandes[index].updated_at = new Date().toISOString();

  storageService.saveDemandes(demandes);

  return demandes[index];
}
