
"use client";

import Link from "next/link";
import { UserMenu } from "./UserMenu";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { profile } = useAuth();
  const isAdmin = profile?.role === 'admin';

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">

      {/* LOGO */}
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="Logo" className="h-10 w-10" />
        <h1 className="text-xl font-bold">École Nationale d'informatique</h1>
      </div>

      {/* MENUS */}
      <div className="flex gap-8 text-gray-700 font-medium">
        {isAdmin ? (
          <Link href="/admin">Tableau de bord</Link>
        ) : (
          <>
            <Link href="/demandes/releves">Relevé de note</Link>
            <Link href="/demandes/attestations">Attestation</Link>
            <Link href="/demandes/certificats">Certificat</Link>
          </>
        )}
      </div>

      {/* USER MENU */}
      <UserMenu />
    </nav>
  );
}
