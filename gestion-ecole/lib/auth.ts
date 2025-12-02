import { supabase } from './supabase';

export async function signUp(email: string, password: string, nom_complet: string, numero_inscription: string, role: 'etudiant' | 'admin' = 'etudiant') {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nom_complet,
        numero_inscription,
        role
      }
    }
  });

  return { data, error };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getCurrentProfile() {
  const user = await getCurrentUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  if (error) throw error;
  return data;
}
