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

function initializeDefaultAdmin() {
  try {
    const users = getUsers();
    const profiles = getProfiles();
    const adminEmail = 'admin@example.com';
    const adminId = 'admin-001';

    if (!users[adminEmail]) {
      users[adminEmail] = {
        id: adminId,
        email: adminEmail,
        password: 'admin123',
      };

      const adminExists = profiles.some(p => p.id === adminId);
      if (!adminExists) {
        profiles.push({
          id: adminId,
          nom_complet: 'Administrateur',
          numero_inscription: 'ADM-001',
          role: 'admin',
          created_at: new Date().toISOString(),
        });
      }

      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
    }
  } catch (error) {
    console.error('Error initializing admin account:', error);
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
  },

  initializeDefaultAdmin() {
    initializeDefaultAdmin();
  }
};
