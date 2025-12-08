'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (email) {
      router.push(`/forgotpassword/verify-code?email=${encodeURIComponent(email)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-2xl border border-gray-200">
        <h2 className="text-2xl font-bold mb-2 text-center">Mot de passe oublié</h2>
        <p className="text-gray-600 text-sm text-center mb-6">
          Entrez votre email pour recevoir un code de vérification
        </p>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!email}
            className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Envoyer le code
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          <Link href="/login" className="text-green-600 hover:underline font-medium">
            Retour à la connexion
          </Link>
        </p>
      </div>
    </div>
  );
}