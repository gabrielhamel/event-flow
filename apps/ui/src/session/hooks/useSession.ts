import { createAuthClient } from "better-auth/react";
import { useState } from "react";
import { configs } from "../../configs";

const authClient = createAuthClient({
  baseURL: `${configs.apiBaseUrl}/auth`,
});

export const useSession = () => {
  const { data: session, isPending } = authClient.useSession();
  const [isSignIn, setIsSignIn] = useState(false);

  const signIn = () => {
    setIsSignIn(true);

    authClient.signIn.social({
      callbackURL: configs.uiBaseUrl,
      provider: "github",
    }).catch((error: unknown) => {
      console.error("Error signing in:", error);

      setIsSignIn(false);
    });
  };

  const signOut = () => {
    authClient.signOut().catch((error: unknown) => {
      console.error("Error signing out:", error);
    });
  };

  return {
    isSessionLoading: isPending,
    isSignIn,
    session,
    signIn,
    signOut,
  };
};
