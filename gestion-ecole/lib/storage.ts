export type User = {
  id: string;
  email: string;
};

export type Profile = {
  id: string;
  nom_complet: string;
  numero_inscription: string;
  role: 'etudiant' | 'admin';
  created_at: string;
};

export type Demande = {
  id: string;
  user_id: string;
  type_demande: 'releve' | 'attestation' | 'certificat';
  sous_type: string | null;
  details: Record<string, any>;
  statut: 'en_attente' | 'en_cours' | 'terminee';
  created_at: string;
  updated_at: string;
};

const USERS_KEY = 'app_users';
const PROFILES_KEY = 'app_profiles';
const DEMANDES_KEY = 'app_demandes';
const CURRENT_USER_KEY = 'app_current_user';

function getUsers(): Record<string, any> {
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function getProfiles(): Profile[] {
  try {
    const data = localStorage.getItem(PROFILES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function getDemandes(): Demande[] {
  try {
    const data = localStorage.getItem(DEMANDES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function getCurrentUser(): User | null {
  try {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export const storageService = {
  getUsers,
  getProfiles,
  getDemandes,
  getCurrentUser,

  saveUsers(users: Record<string, any>) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  saveProfiles(profiles: Profile[]) {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  },

  saveDemandes(demandes: Demande[]) {
    localStorage.setItem(DEMANDES_KEY, JSON.stringify(demandes));
  },

  setCurrentUser(user: User | null) {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  },

  clear() {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};
