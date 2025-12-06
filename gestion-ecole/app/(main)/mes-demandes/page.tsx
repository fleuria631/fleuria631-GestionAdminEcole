'use client';

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getMyDemandes } from "@/lib/demandes";
import { useRouter } from "next/navigation";
import type { Demande } from "@/lib/storage";

export default function MesDemandesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      loadDemandes();
    }
  }, [user, authLoading]);

  async function loadDemandes() {
    try {
      const data = await getMyDemandes();
      setDemandes(data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  }

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

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mes demandes</h1>

        {demandes.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500 mb-4">Vous n'avez aucune demande</p>
            <button
              onClick={() => router.push('/demandes/releves')}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Faire une demande
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {demandes.map((demande) => (
              <div
                key={demande.id}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {getTypeDemande(demande.type_demande, demande.sous_type)}
                    </h3>

                    <div className="space-y-1 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">Date de demande:</span>{' '}
                        {new Date(demande.created_at).toLocaleDateString('fr-FR')}
                      </p>

                      {demande.type_demande === 'releve' && demande.details.releves && (
                        <p>
                          <span className="font-medium">Niveaux:</span>{' '}
                          {demande.details.releves.map((r: any) => r.niveau).join(', ')}
                        </p>
                      )}

                      {demande.details.total && (
                        <p>
                          <span className="font-medium">Montant:</span> {demande.details.total} Ar
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="ml-4">
                    {getStatutBadge(demande.statut)}
                  </div>
                </div>

                {demande.statut === 'terminee' && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-green-600 font-medium">
                      Votre demande est prête. Vous pouvez la retirer au secrétariat.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
