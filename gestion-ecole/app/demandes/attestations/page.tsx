'use client';
import { useState } from "react";

export default function AttestationPage() {
  const typesAttestation = [
    { id: "reussite", label: "Attestation de réussite" },
    { id: "findetude", label: "Attestation de fin d'étude" },
    { id: "duree", label: "Attestation de durée de formation" },
    { id: "inscription", label: "Attestation d'inscription" },
    { id: "langue", label: "Attestation de langue française" }
  ];

  const [selectedType, setSelectedType] = useState("");
  const [nom, setNom] = useState("");
  const [numero, setNumero] = useState("");
  const [anneeDebut, setAnneeDebut] = useState("");
  const [anneeFin, setAnneeFin] = useState("");
  
  const currentYear = new Date().getFullYear();

  const handleSubmit = () => {
    const anneeUniversitaire = anneeDebut && anneeFin ? `${anneeDebut}-${anneeFin}` : "";
    console.log({ type: selectedType, nom, numero, anneeUniversitaire });
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

        {/* Colonne droite - Type d'attestation */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <h2 className="text-xl font-medium text-gray-900 mb-6">Type d'attestation</h2>

          <div className="space-y-3">
            {typesAttestation.map((type) => (
              <div
                key={type.id}
                className={`border rounded-lg p-4 transition-all cursor-pointer ${
                  selectedType === type.id ? "border-gray-900 bg-gray-50" : "border-gray-300 hover:border-gray-400"
                }`}
                onClick={() => setSelectedType(type.id)}
              >
                <div className="flex items-start gap-4">
                  {/* Radio button */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedType === type.id ? "border-gray-900" : "border-gray-400"
                    }`}
                  >
                    {selectedType === type.id && (
                      <div className="w-3 h-3 rounded-full bg-gray-900"></div>
                    )}
                  </div>

                  {/* Label */}
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{type.label}</p>
                    
                    {/* Champ année universitaire pour fin d'étude */}
                    {selectedType === type.id && type.id === "findetude" && (
                      <div className="mt-4">
                        <label className="block text-sm text-gray-600 mb-1">Année universitaire</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="2024"
                            value={anneeDebut}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                              setAnneeDebut(value);
                            }}
                            maxLength="4"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                          <span className="text-gray-500 font-medium">-</span>
                          <input
                            type="text"
                            placeholder="2025"
                            value={anneeFin}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                              setAnneeFin(value);
                            }}
                            maxLength="4"
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

        {/* Ligne finale - Bouton d'envoi */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm md:col-span-2">
          <div className="flex justify-center">
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