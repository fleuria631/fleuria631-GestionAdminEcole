
"use client";

import Link from "next/link";
import { useState } from "react";
import { UserCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "@/lib/auth";
import { useRouter } from "next/navigation";

export function UserMenu() {
  const [open, setOpen] = useState(false);
  const { user, profile } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <div className="relative">
      <UserCircle
        size={40}
        className="text-green-700 cursor-pointer hover:text-green-900"
        onClick={() => setOpen(!open)}
      />

      {open && (
        <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg p-3 w-48 z-50">
          {!user ? (
            <>
              <Link className="block p-2 hover:bg-gray-100 rounded" href="/login">
                Se connecter
              </Link>
              <Link className="block p-2 hover:bg-gray-100 rounded" href="/register">
                S'inscrire
              </Link>
            </>
          ) : (
            <>
              <div className="px-2 py-1 text-sm text-gray-600 border-b mb-2">
                {profile?.nom_complet}
              </div>
              {profile?.role === 'admin' && (
                <Link className="block p-2 hover:bg-gray-100 rounded" href="/admin">
                  Tableau de bord
                </Link>
              )}
              <Link className="block p-2 hover:bg-gray-100 rounded" href="/mes-demandes">
                Mes demandes
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full p-2 text-left hover:bg-gray-100 rounded text-red-600"
              >
                Déconnexion
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
