
export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Connexion</h2>

      <form className="flex flex-col gap-4">
        <input className="border p-2 rounded" placeholder="Email" type="email" />
        <input className="border p-2 rounded" placeholder="Mot de passe" type="password" />

        <button className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Se connecter
        </button>
      </form>
    </div>
  );
}
