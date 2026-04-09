import { createAuthClient } from "better-auth/react";
import { useState } from "react";
import { configs } from "../../configs";

const authClient = createAuthClient({
  baseURL: `${configs.apiBaseUrl}/auth`,
});

export const useSession = () => {
  const { data: session, isPending } = authClient.useSession();
  const [isSignInLoading, setIsSignInLoading] = useState(false);

  const signIn = (provider: "github" | "google") => {
    setIsSignInLoading(true);

    authClient.signIn
      .social({
        callbackURL: configs.uiBaseUrl,
        provider,
      })
      .catch((error: unknown) => {
        console.error("Error signing in:", error);

        setIsSignInLoading(false);
      });
  };

  const signOut = () => {
    authClient.signOut().catch((error: unknown) => {
      console.error("Error signing out:", error);
    });
  };

  return {
    isSessionLoading: isPending,
    isSignInLoading,
    session,
    signIn,
    signOut,
  };
};
