"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="#EA4335"
        d="M12 10.2v3.6h5.1c-.2 1.4-1.5 4.1-5.1 4.1-3.1 0-5.6-2.6-5.6-5.9s2.5-5.9 5.6-5.9c1.8 0 3 .7 3.7 1.3l2.5-2.4C16.4 3.2 14.4 2.4 12 2.4 6.9 2.4 2.8 6.5 2.8 11.6S6.9 20.8 12 20.8c6.3 0 8.8-4.4 8.8-8.1 0-.5 0-.8-.1-1.2H12z"
      />
    </svg>
  );
}

export function GoogleButton({ className = "w-80" }: { className?: string }) {
  const supabase = createClient();
  const search = useSearchParams();
  const next = search.get("next") ?? "/";
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${
            window.location.origin
          }/auth/callback?next=${encodeURIComponent(next)}`,
          // 필요하면 refresh 토큰:
          // queryParams: { access_type: "offline", prompt: "consent" },
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={signInWithGoogle}
      disabled={loading}
      variant="outline"
      aria-label="Continue with Google"
      className={[
        "group relative h-13 justify-center gap-3  border",
        "bg-white hover:bg-white/90 dark:bg-neutral-950",
        "border-neutral-200 dark:border-neutral-800",
        "shadow-sm hover:shadow-md active:shadow transition-all duration-150",
        "focus-visible:ring-2 focus-visible:ring-black/10 dark:focus-visible:ring-white/20",
        className,
      ].join(" ")}
    >
      {loading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <GoogleIcon className="h-5 w-5" />
      )}
      <span className="text-sm font-medium tracking-tight">
        Continue with Google
      </span>

      {/* 살짝 반짝이는 라인효과 */}
      <span
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(66,133,244,.08), transparent)",
        }}
      />
    </Button>
  );
}
