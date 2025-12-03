import { storageService, type User, type Profile } from './storage';

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export async function signUp(
  email: string,
  password: string,
  nom_complet: string,
  numero_inscription: string,
  role: 'etudiant' | 'admin' = 'etudiant'
) {
  try {
    const users = storageService.getUsers();

    if (users[email]) {
      return { error: new Error('Cet email est déjà utilisé') };
    }

    const userId = generateId();

    users[email] = {
      id: userId,
      email,
      password,
    };

    storageService.saveUsers(users);

    const profiles = storageService.getProfiles();
    profiles.push({
      id: userId,
      nom_complet,
      numero_inscription,
      role,
      created_at: new Date().toISOString(),
    });

    storageService.saveProfiles(profiles);

    return { data: { user: { id: userId, email } }, error: null };
  } catch (error: any) {
    return { error };
  }
}

export async function signIn(email: string, password: string) {
  try {
    const users = storageService.getUsers();

    if (!users[email] || users[email].password !== password) {
      return { error: new Error('Email ou mot de passe incorrect') };
    }

    const user = { id: users[email].id, email };
    storageService.setCurrentUser(user);

    return { data: { user }, error: null };
  } catch (error: any) {
    return { error };
  }
}

export async function signOut() {
  storageService.clear();
  return { error: null };
}

export async function getCurrentUser(): Promise<User | null> {
  return storageService.getCurrentUser();
}

export async function getCurrentProfile(): Promise<Profile | null> {
  const user = await getCurrentUser();
  if (!user) return null;

  const profiles = storageService.getProfiles();
  return profiles.find(p => p.id === user.id) || null;
}
