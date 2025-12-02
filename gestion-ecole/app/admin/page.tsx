'use client';

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getAllDemandes, updateDemandeStatut } from "@/lib/demandes";
import { useRouter } from "next/navigation";

type DemandeWithProfile = {
  id: string;
  user_id: string;
  type_demande: 'releve' | 'attestation' | 'certificat';
  sous_type: string | null;
  details: Record<string, any>;
  statut: 'en_attente' | 'en_cours' | 'terminee';
  created_at: string;
  updated_at: string;
  profiles: {
    nom_complet: string;
    numero_inscription: string;
  };
};

export default function AdminPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const [demandes, setDemandes] = useState<DemandeWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'en_attente' | 'en_cours' | 'terminee'>('all');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    if (profile && profile.role !== 'admin') {
      router.push('/');
      return;
    }

    if (user && profile?.role === 'admin') {
      loadDemandes();
    }
  }, [user, profile, authLoading]);

  async function loadDemandes() {
    try {
      const data = await getAllDemandes();
      setDemandes(data as DemandeWithProfile[]);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleStatusChange = async (demandeId: string, newStatus: 'en_attente' | 'en_cours' | 'terminee') => {
    try {
      await updateDemandeStatut(demandeId, newStatus);
      await loadDemandes();
    } catch (error) {
      console.error('Erreur:', error);
      alert("Erreur lors de la mise à jour du statut");
    }
  };

  const getStatutBadge = (statut: string) => {
    const styles = {
      en_attente: 'bg-yellow-100 text-yellow-800',
      en_cours: 'bg-blue-100 text-blue-800',
      terminee: 'bg-green-100 text-green-800'
    };
    const labels = {
      en_attente: 'En attente',
      en_cours: 'En cours',
      terminee: 'Terminée'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[statut as keyof typeof styles]}`}>
        {labels[statut as keyof typeof labels]}
      </span>
    );
  };

  const getTypeDemande = (type: string, sousType: string | null) => {
    const types: Record<string, string> = {
      releve: 'Relevé de notes',
      attestation: 'Attestation',
      certificat: 'Certificat'
    };

    if (sousType && type === 'attestation') {
      const sousTypes: Record<string, string> = {
        reussite: 'de réussite',
        findetude: "de fin d'étude",
        duree: 'de durée de formation',
        inscription: "d'inscription",
        langue: 'de langue française'
      };
      return `${types[type]} ${sousTypes[sousType] || ''}`;
    }

    if (sousType && type === 'certificat') {
      return `${types[type]} de scolarité`;
    }

    return types[type] || type;
  };

  const filteredDemandes = filter === 'all'
    ? demandes
    : demandes.filter(d => d.statut === filter);

  const stats = {
    total: demandes.length,
    en_attente: demandes.filter(d => d.statut === 'en_attente').length,
    en_cours: demandes.filter(d => d.statut === 'en_cours').length,
    terminee: demandes.filter(d => d.statut === 'terminee').length,
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord administrateur</h1>
          <p className="text-gray-600">Gérez les demandes des étudiants</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <p className="text-gray-600 text-sm mb-1">Total</p>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          </div>

          <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-6 shadow-sm">
            <p className="text-yellow-700 text-sm mb-1">En attente</p>
            <p className="text-3xl font-bold text-yellow-800">{stats.en_attente}</p>
          </div>

          <div className="bg-blue-50 rounded-xl border border-blue-200 p-6 shadow-sm">
            <p className="text-blue-700 text-sm mb-1">En cours</p>
            <p className="text-3xl font-bold text-blue-800">{stats.en_cours}</p>
          </div>

          <div className="bg-green-50 rounded-xl border border-green-200 p-6 shadow-sm">
            <p className="text-green-700 text-sm mb-1">Terminées</p>
            <p className="text-3xl font-bold text-green-800">{stats.terminee}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filter === 'all'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Toutes
              </button>
              <button
                onClick={() => setFilter('en_attente')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filter === 'en_attente'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                En attente
              </button>
              <button
                onClick={() => setFilter('en_cours')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filter === 'en_cours'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                En cours
              </button>
              <button
                onClick={() => setFilter('terminee')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filter === 'terminee'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Terminées
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredDemandes.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                Aucune demande trouvée
              </div>
            ) : (
              filteredDemandes.map((demande) => (
                <div key={demande.id} className="p-6 hover:bg-gray-50 transition">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {getTypeDemande(demande.type_demande, demande.sous_type)}
                        </h3>
                        {getStatutBadge(demande.statut)}
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <p><span className="font-medium">Étudiant:</span> {demande.profiles.nom_complet}</p>
                          <p><span className="font-medium">N° inscription:</span> {demande.profiles.numero_inscription}</p>
                        </div>
                        <div>
                          <p><span className="font-medium">Date:</span> {new Date(demande.created_at).toLocaleDateString('fr-FR')}</p>
                          {demande.details.total && (
                            <p><span className="font-medium">Montant:</span> {demande.details.total} Ar</p>
                          )}
                        </div>
                      </div>

                      {demande.type_demande === 'releve' && demande.details.releves && (
                        <div className="mt-3">
                          <p className="text-sm font-medium text-gray-700 mb-1">Détails:</p>
                          <div className="flex flex-wrap gap-2">
                            {demande.details.releves.map((r: any, idx: number) => (
                              <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                                {r.niveau} ({r.annee}) - {r.nombre}x
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {demande.type_demande === 'certificat' && (
                        <div className="mt-3 text-sm text-gray-600">
                          <p><span className="font-medium">Père:</span> {demande.details.nom_pere}</p>
                          <p><span className="font-medium">Mère:</span> {demande.details.nom_mere}</p>
                        </div>
                      )}
                    </div>

                    <div className="ml-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Changer le statut
                      </label>
                      <select
                        value={demande.statut}
                        onChange={(e) => handleStatusChange(demande.id, e.target.value as any)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="en_attente">En attente</option>
                        <option value="en_cours">En cours</option>
                        <option value="terminee">Terminée</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
