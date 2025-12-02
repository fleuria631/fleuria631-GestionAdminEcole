'use client';
import { useState } from "react";

export default function CertificatPage() {
  const [selectedType] = useState("scolarite");
  const [nom, setNom] = useState("");
  const [numero, setNumero] = useState("");
  const [nomPere, setNomPere] = useState("");
  const [nomMere, setNomMere] = useState("");

  const handleSubmit = () => {
    console.log({ type: selectedType, nom, numero, nomPere, nomMere });
    alert("Demande envoyée avec succès !");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl space-y-8">
        
        {/* Bandeau d'information */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Guide de demande</h3>
              <p className="text-sm text-gray-600">
                Pour faire une demande de certificat de scolarité, veuillez remplir les informations suivantes : 
                vos informations personnelles, les noms de vos deux parents, et sélectionner le type de certificat souhaité.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom du père</label>
                <input
                  type="text"
                  placeholder="Ex: RAKOTO Michel"
                  value={nomPere}
                  onChange={(e) => setNomPere(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom de la mère</label>
                <input
                  type="text"
                  placeholder="Ex: RAZAFY Marie"
                  value={nomMere}
                  onChange={(e) => setNomMere(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Colonne droite - Certificat de scolarité */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-xl font-medium text-gray-900 mb-6">Certificat demandé</h2>

            <div className="border border-gray-900 bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-4">
                {/* Radio button */}
                <div className="w-5 h-5 rounded-full border-2 border-gray-900 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-gray-900"></div>
                </div>

                {/* Label */}
                <p className="font-medium text-gray-900">Certificat de scolarité</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ligne finale - Bouton d'envoi */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
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