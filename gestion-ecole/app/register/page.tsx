
export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Inscription</h2>

      <form className="flex flex-col gap-4">
        <input className="border p-2 rounded" placeholder="Nom complet" />
        <input className="border p-2 rounded" placeholder="Email" type="email" />
        <input className="border p-2 rounded" placeholder="Mot de passe" type="password" />

        <select className="border p-2 rounded">
          <option value="eleve">Élève</option>
          <option value="admin">Administrateur</option>
        </select>

        <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          S'inscrire
        </button>
      </form>
    </div>
  );
}
