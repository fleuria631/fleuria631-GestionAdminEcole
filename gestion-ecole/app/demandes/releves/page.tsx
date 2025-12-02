'use client';
import { useState, useMemo } from "react";

export default function RelevesPage() {
  const niveaux = ["L1", "L2", "L3", "M1", "M2"];
  const prixParReleve = 2000;
  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState(
    niveaux.reduce((acc, level) => {
      acc[level] = { selected: false, annee: "", nombre: "" };
      return acc;
    }, {})
  );

  const [nom, setNom] = useState("");
  const [numero, setNumero] = useState("");

  const handleChange = (level, field, value) => {
    setFormData({ ...formData, [level]: { ...formData[level], [field]: value } });
  };

  const totalReleves = useMemo(() => {
    return Object.values(formData).reduce((sum, item) => {
      return sum + (item.selected && item.nombre ? parseInt(item.nombre) || 0 : 0);
    }, 0);
  }, [formData]);

  const totalPrix = totalReleves * prixParReleve;

  const handleSubmit = () => {
    console.log({ nom, numero, ...formData });
    alert("Demande envoyée avec succès !");
  };

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
                placeholder="Ex: RAKOTO Jean"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">N° d'inscription</label>
              <input
                type="text"
                placeholder="Ex: 2024-001"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
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
                            placeholder={currentYear}
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
              className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-xl text-lg transition"
            >
              Envoyer la demande
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
