'use client';
import { useState, useMemo, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { createDemande } from "@/lib/demandes";
import { useRouter } from "next/navigation";

export default function RelevesPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login');
      } else {
        setIsReady(true);
      }
    }
  }, [authLoading, user, router]);
  const niveaux = ["L1", "L2", "L3", "M1", "M2"];
  const prixParReleve = 2000;
  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState<Record<string, { selected: boolean; annee: string; nombre: string }>>(
    niveaux.reduce((acc, level) => {
      acc[level] = { selected: false, annee: "", nombre: "" };
      return acc;
    }, {} as Record<string, { selected: boolean; annee: string; nombre: string }>)
  );

  const [loading, setLoading] = useState(false);

  const handleChange = (level: string, field: string, value: any) => {
    setFormData({ ...formData, [level]: { ...formData[level], [field]: value } });
  };

  const totalReleves = useMemo(() => {
    return Object.values(formData).reduce((sum, item) => {
      return sum + (item.selected && item.nombre ? parseInt(item.nombre) || 0 : 0);
    }, 0);
  }, [formData]);

  const totalPrix = totalReleves * prixParReleve;

  const handleSubmit = async () => {
    if (!user) {
      alert("Veuillez vous connecter pour faire une demande");
      router.push('/login');
      return;
    }

    setLoading(true);
    try {
      const relevesDetails = Object.entries(formData)
        .filter(([_, data]: any) => data.selected)
        .map(([niveau, data]: any) => ({
          niveau,
          annee: data.annee,
          nombre: parseInt(data.nombre) || 0
        }));

      if (relevesDetails.length === 0) {
        alert("Veuillez sélectionner au moins un relevé");
        setLoading(false);
        return;
      }

      await createDemande('releve', null, {
        releves: relevesDetails,
        total: totalPrix,
        nom_complet: profile?.nom_complet,
        numero_inscription: profile?.numero_inscription
      });

      alert("Demande envoyée avec succès !");
      router.push('/mes-demandes');
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'envoi de la demande");
    } finally {
      setLoading(false);
    }
  };

  if (!isReady) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-gray-600">Chargement de vos informations...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Colonne gauche - Informations personnelles */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <h2 className="text-xl font-medium text-gray-900 mb-6">Informations personnelles</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
              <input
                type="text"
                value={profile?.nom_complet || ''}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">N° d'inscription</label>
              <input
                type="text"
                value={profile?.numero_inscription || ''}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* Colonne droite - Sélection des relevés */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <h2 className="text-xl font-medium text-gray-900 mb-6">Sélection des relevés</h2>

          <div className="space-y-3">
            {niveaux.map((level) => (
              <div
                key={level}
                className={`border rounded-lg p-4 transition-all cursor-pointer ${
                  formData[level].selected ? "border-gray-900 bg-gray-50" : "border-gray-300 hover:border-gray-400"
                }`}
                onClick={() => handleChange(level, "selected", !formData[level].selected)}
              >
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <div className="pt-1">
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        formData[level].selected ? "bg-gray-900 border-gray-900" : "border-gray-400"
                      }`}
                    >
                      {formData[level].selected && (
                        <svg
                          className="w-3.5 h-3.5 text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{level}</p>

                    {formData[level].selected && (
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Année académique</label>
                          <input
                            type="number"
                            placeholder={currentYear.toString()}
                            value={formData[level].annee}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => handleChange(level, "annee", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Nombre de relevés</label>
                          <input
                            type="number"
                            placeholder="Ex : 1"
                            value={formData[level].nombre}
                            min="1"
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => handleChange(level, "nombre", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ligne finale */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm md:col-span-2">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xl font-bold">Total : {totalPrix} Ar</div>

            <button
              onClick={handleSubmit}
              disabled={loading || !user}
              className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-xl text-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Envoi...' : 'Envoyer la demande'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
