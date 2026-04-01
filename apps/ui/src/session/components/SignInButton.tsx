import { Button } from "@mui/material";

export const SignInButton = ({ isSessionLoading, signIn }: { signIn: () => void; isSessionLoading: boolean }) => (
  <Button
    variant="outlined"
    onClick={signIn}
    loading={isSessionLoading}
  >
    Sign in
  </Button>
);
