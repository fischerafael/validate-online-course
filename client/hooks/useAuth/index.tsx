import { firebaseSignUp } from "@/client/config/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";

export const useAuth = () => {
  const { push } = useRouter();

  const [authState, setAuthState] = useRecoilState(authStateAtom);

  const [isLoading, setLoading] = useState(false);

  const onChangeAuthState = (key: keyof AuthState, value: string) => {
    setAuthState((prev) => ({ ...prev, [key]: value }));
  };

  const onLogIn = async () => {
    try {
      setLoading(true);
      const { displayName, email, photoURL } = await firebaseSignUp();
      if (!email) throw new Error("Email not available");

      onChangeAuthState("email", email);
      onChangeAuthState("avatarURL", photoURL || "");
      onChangeAuthState("name", displayName || "");

      push("/app");
    } catch (e: any) {
      alert(e);
    } finally {
      setLoading(false);
    }
  };

  const onLogOut = () => {
    setAuthState(INITIAL_AUTH_STATE);
    push("/");
  };

  useEffect(() => {
    if (!authState.email) {
      push("/");
    }
  }, [authState.email]);

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
