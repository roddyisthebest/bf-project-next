"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function EmailForm() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const sendMagicLink = async () => {
    setSending(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setSending(false);

    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("just check your email for the magic link!");
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMagicLink();
  };

  return (
    <form className="mt-4 flex flex-col" onSubmit={onSubmit}>
      <Input
        type="email"
        placeholder="Email Address"
        className="border h-auto py-4 px-3 mb-2"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <Button
        type="submit"
        className="border h-auto py-4 px-3"
        disabled={sending}
      >
        {sending ? <Loader /> : "Continue With Email"}
      </Button>
    </form>
  );
}
