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
    setFormData({
      ...formData,
      [level]: { ...formData[level], [field]: value },
    });
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">
        
        <div className="md:flex">
          {/* Panneau gauche */}
          <div className="md:w-2/5 bg-gradient-to-br from-emerald-500 to-teal-600 p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white mb-3 leading-tight">Demande de<br/>relevé de notes</h1>
              <p className="text-emerald-50/80 text-sm leading-relaxed">
                Sélectionnez les niveaux et années universitaires pour lesquels vous souhaitez obtenir vos relevés.
              </p>
            </div>

            <div className="relative z-10 space-y-4 mt-8">
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-emerald-50/60 text-xs font-medium uppercase tracking-wide">Tarif unitaire</p>
                    <p className="text-white text-2xl font-bold mt-0.5">2 000 <span className="text-sm font-normal opacity-80">Ar</span></p>
                  </div>
                </div>
              </div>

              {totalReleves > 0 && (
                <div className="bg-black/25 backdrop-blur-md rounded-2xl p-4 border border-white/30 shadow-lg transform transition-all duration-300 scale-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-emerald-50/60 text-xs font-medium uppercase tracking-wide">Montant total</p>
                      <p className="text-white text-2xl font-bold mt-0.5">{totalPrix.toLocaleString()} <span className="text-sm font-normal opacity-80">Ar</span></p>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shadow-md">
                      <span className="text-white text-lg font-bold">{totalReleves}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <p className="relative z-10 text-emerald-50/40 text-xs mt-auto pt-8">© 2025 Service Scolarité</p>
          </div>

          {/* Panneau droit */}
          <div className="md:w-3/5 bg-white p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-800">Informations personnelles</h2>
              <p className="text-slate-500 text-sm mt-1">Veuillez remplir vos informations</p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2 block">Nom complet</label>
                  <input
                    type="text"
                    placeholder="Ex: RAKOTO Jean"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className="w-full border border-slate-200 bg-slate-50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2 block">N° inscription</label>
                  <input
                    type="text"
                    placeholder="Ex: 2024-001"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    className="w-full border border-slate-200 bg-slate-50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-all"
                  />
                </div>
              </div>

              <div className="flex-1">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3 block">Sélectionnez les niveaux</label>
                
                {/* En-têtes des colonnes */}
                <div className="hidden sm:flex items-center gap-3 mb-3 px-3">
                  <div className="w-5"></div>
                  <div className="w-14 text-xs text-slate-500 font-semibold">Niveau</div>
                  <div className="flex-1 text-xs text-slate-500 font-semibold">Année universitaire</div>
                  <div className="w-20 text-xs text-slate-500 font-semibold text-center">Quantité</div>
                </div>

                <div className="space-y-2">
                  {niveaux.map((level) => (
                    <div
                      key={level}
                      className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl transition-all duration-200 ${
                        formData[level].selected
                          ? "bg-emerald-50 ring-2 ring-emerald-400 shadow-sm"
                          : "bg-slate-50 hover:bg-slate-100 border border-slate-200"
                      }`}
                    >
                      {/* Checkbox visible */}
                      <label className="relative flex items-center cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={formData[level].selected}
                          onChange={(e) => handleChange(level, "selected", e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-5 h-5 border-2 border-slate-300 rounded-md flex items-center justify-center peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-all group-hover:border-emerald-400">
                          {formData[level].selected && (
                            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </label>

                      {/* Badge niveau */}
                      <div className={`w-14 h-10 rounded-lg flex items-center justify-center font-bold text-sm transition-all ${
                        formData[level].selected 
                          ? "bg-emerald-500 text-white shadow-md" 
                          : "bg-slate-200 text-slate-500"
                      }`}>
                        {level}
                      </div>

                      {/* Année universitaire */}
                      <div className="flex-1">
                        <input
                          type="number"
                          placeholder="Ex: 2023"
                          min="2000"
                          max={currentYear}
                          className={`w-full border px-3 py-2.5 rounded-lg text-sm focus:outline-none transition-all ${
                            !formData[level].selected 
                              ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed" 
                              : "bg-white border-slate-300 focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                          }`}
                          value={formData[level].annee}
                          onChange={(e) => handleChange(level, "annee", e.target.value)}
                          disabled={!formData[level].selected}
                        />
                      </div>

                      {/* Nombre de relevés */}
                      <div className="w-20">
                        <input
                          type="number"
                          placeholder="Qté"
                          min="1"
                          className={`w-full border px-3 py-2.5 rounded-lg text-sm text-center focus:outline-none transition-all ${
                            !formData[level].selected 
                              ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed" 
                              : "bg-white border-slate-300 focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                          }`}
                          value={formData[level].nombre}
                          onChange={(e) => handleChange(level, "nombre", e.target.value)}
                          disabled={!formData[level].selected}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-base mt-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Soumettre la demande
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}