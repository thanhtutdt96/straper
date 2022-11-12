import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { auth } from 'helpers/firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from '@firebase/auth';
import { AuthContext, User } from 'types/Auth';

const authContext = createContext<AuthContext>({
  user: null,
  logIn: () => ({}),
  logOut: () => ({}),
  register: () => ({}),
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const register = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const { displayName, email, uid, photoURL } = currentUser;

        setUser({
          displayName,
          email,
          uid,
          photoURL,
        });

        if (location.pathname === '/login') {
          navigate('/');
        }

        return;
      }

      navigate('/login');
    });

    return () => {
      unsubscribe();
    };
  }, [location.pathname, navigate]);

  return (
    <authContext.Provider value={{ user, logIn, logOut, register }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}
