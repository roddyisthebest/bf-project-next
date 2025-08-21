import { Separator } from "@/components/ui/separator";
import EmailForm from "./components/email-form";
import { GoogleButton } from "./components/google-button";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center flex-1 h-screen flex-col">
      <div className="flex flex-col items-center mt-4 gap-y-3">
        <h1 className="font-semibold text-3xl">Log in to BF</h1>
        <EmailForm />
        <Separator className="bg-neutral-300" />
        <GoogleButton />
      </div>
    </div>
  );
}
