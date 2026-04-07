import { Button } from "@mui/material";

export const SignInButton = ({
  isSignInLoading,
  signIn,
}: {
  signIn: () => void;
  isSignInLoading: boolean;
}) => (
  <Button variant="outlined" onClick={signIn} loading={isSignInLoading}>
    Sign in
  </Button>
);
