'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function VerifyCodePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  
  const [code, setCode] = useState('');

  useEffect(() => {
    if (!email) {
      router.push('/forgotpassword');
    }
  }, [email, router]);

  const handleSubmit = () => {
    if (code.length === 6) {
      router.push('/forgotpassword/reset-password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-2xl border border-gray-200">
        <h2 className="text-2xl font-bold mb-2 text-center">Vérification</h2>
        <p className="text-gray-600 text-sm text-center mb-6">
          Entrez le code envoyé à <span className="font-medium">{email}</span>
        </p>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Code de vérification
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-center text-2xl tracking-widest"
              placeholder="000000"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength={6}
              required
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={code.length !== 6}
            className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Vérifier
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          <Link href="/forgotpassword" className="text-green-600 hover:underline font-medium">
            Renvoyer un code
          </Link>
        </p>
      </div>
    </div>
  );
}