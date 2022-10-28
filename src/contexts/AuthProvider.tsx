import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { auth } from 'helpers/firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from '@firebase/auth';
import { AuthContext, User } from 'types/Auth';

const authContext = createContext<AuthContext>({});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();

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
      console.log('auth user: ', currentUser);

      if (currentUser) {
        const { displayName, email, uid, photoURL } = currentUser;

        setUser({
          displayName,
          email,
          uid,
          photoURL,
        });

        navigate('/');

        return;
      }

      navigate('/login');
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  return (
    <authContext.Provider value={{ user, logIn, logOut, register }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}
