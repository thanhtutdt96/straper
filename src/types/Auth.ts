export type User = {
  displayName?: string | null;
  email: string | null;
  uid: string;
  photoURL?: string | null;
};

export type AuthContext = {
  user: User | null;
  logIn: (email: string, password: string) => void;
  logOut: () => void;
  register: (email: string, password: string) => void;
};
