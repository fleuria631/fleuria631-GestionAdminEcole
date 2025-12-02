
"use client";

import Link from "next/link";
import { useState } from "react";
import { UserCircle } from "lucide-react";

export function UserMenu() {
  const [open, setOpen] = useState(false);
  const isLogged = false; // Temporaire, plus tard on utilisera l’auth réelle.

  return (
    <div className="relative">
      <UserCircle
        size={40}
        className="text-green-700 cursor-pointer hover:text-green-900"
        onClick={() => setOpen(!open)}
      />

      {open && (
        <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg p-3 w-40">
          {!isLogged ? (
            <>
              <Link className="block p-2 hover:bg-gray-100" href="/login">
                Se connecter
              </Link>
              <Link className="block p-2 hover:bg-gray-100" href="/register">
                S'inscrire
              </Link>
            </>
          ) : (
            <button className="block w-full p-2 text-left hover:bg-gray-100">
              Déconnexion
            </button>
          )}
        </div>
      )}
    </div>
  );
}
