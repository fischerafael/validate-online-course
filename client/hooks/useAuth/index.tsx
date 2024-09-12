import { firebaseSignUp } from "@/client/config/firebase";
import { pages } from "@/client/config/pages";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";

const setKey = (key: string) => `@landing-page-${key}`;
const getKey = (key: string) => `@landing-page-${key}`;

const storage = {
  setItem: (key: string, value: any) => {
    localStorage.setItem(setKey(key), value);
  },
  getItem: (key: string) => localStorage.getItem(getKey(key)),
  removeItem: (key: string) => localStorage.removeItem(getKey(key)),
};

export const useAuth = () => {
  const { push } = useRouter();

  const [authState, setAuthState] = useRecoilState(authStateAtom);

  const [isLoading, setLoading] = useState(false);

  const onChangeAuthState = (key: keyof AuthState, value: string) => {
    setAuthState((prev) => ({ ...prev, [key]: value }));
    storage.setItem(setKey(key), value);
  };

  const onLogIn = async () => {
    try {
      setLoading(true);
      const { displayName, email, photoURL } = await firebaseSignUp();
      if (!email) throw new Error("Email not available");

      onChangeAuthState("email", email);
      onChangeAuthState("avatarURL", photoURL || "");
      onChangeAuthState("name", displayName || "");

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
    const email = storage.getItem(getKey("email"));
    const avatarURL = storage.getItem(getKey("avatarURL"));
    const name = storage.getItem(getKey("name"));

    if (!email) {
      push(pages.landing.href);
      storage.removeItem(getKey("email"));
      storage.removeItem(getKey("avatarURL"));
      storage.removeItem(getKey("name"));
      return;
    }
    onChangeAuthState("email", email);
    onChangeAuthState("avatarURL", avatarURL || "");
    onChangeAuthState("name", name || "");
  }, []);

  return {
    methods: { onChangeAuthState, onLogIn, onLogOut },
    state: { authState, isLoading },
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
