import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin SignIn",
  description: "Login with credentials",
};

export default function SignIn() {
  return <SignInForm />;
}
