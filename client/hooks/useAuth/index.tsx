import { actionCreateCompany } from "@/client/actions";
import { firebaseSignUp } from "@/client/config/firebase";
import { pages } from "@/client/config/pages";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";

const setKey = (key: string) => `@landing-page-${key}`;
const getKey = (key: string) => `@landing-page-${key}`;

export const useAuth = () => {
  const { push } = useRouter();

  const [authState, setAuthState] = useRecoilState(authStateAtom);

  const [isLoading, setLoading] = useState(false);

  const getAuthState = () => {
    return storage.getItem<AuthState | undefined>("auth");
  };

  const onLogIn = async () => {
    try {
      setLoading(true);
      const { displayName, email, photoURL, uid } = await firebaseSignUp();
      if (!email) throw new Error("Email not available");
      const auth = { name: displayName, avatarURL: photoURL, email, id: uid };
      storage.setItem("auth", auth);
      const response = await actionCreateCompany(email);
      if (!response) throw new Error("Failed");
      push(pages.app.href);
    } catch (e: any) {
      alert(e);
    } finally {
      setLoading(false);
    }
  };

  const onLogOut = () => {
    setAuthState(INITIAL_AUTH_STATE);
    push(pages.landing.href);
  };

  useEffect(() => {
    const auth = getAuthState();
    if (!auth?.email) {
      push(pages.landing.href);
      storage.removeItem("auth");
    }
  }, []);

  return {
    methods: { onLogIn, onLogOut, getAuthState },
    state: { isLoading },
  };
};

interface AuthState {
  email: string;
  name: string;
  avatarURL: string;
  id: string;
}

export const INITIAL_AUTH_STATE: AuthState = {
  avatarURL: "",
  email: "",
  id: "",
  name: "",
};

const authStateAtom = atom<AuthState>({
  key: "authState",
  default: INITIAL_AUTH_STATE,
});

const storage = {
  setItem: (key: string, value: any) => {
    localStorage.setItem(setKey(key), JSON.stringify(value));
  },
  getItem: <T,>(key: string) => {
    try {
      const item = localStorage.getItem(getKey(key));
      if (!item) return;
      return JSON.parse(item) as T;
    } catch (e: any) {
      return undefined;
    }
  },
  removeItem: (key: string) => localStorage.removeItem(getKey(key)),
};
