"use client";

import { LogoutButton } from "@/components/custom/logout-button";
import { NavigationMenuDemo } from "./subs/navigation-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MobileNavigationMenu } from "./subs/mobile-navigation-menu";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    const getUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    window.addEventListener('scroll', handleScroll);
    getUser();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 bg-gradient-to-b from-emerald-50/60 to-white backdrop-blur z-50 transition-all duration-200 ${isScrolled ? 'border-b border-emerald-100' : ''}`}>
      <div className="h-20 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {/* 타이틀에 살짝 BB 요소(엣지 라인 + 라운드) */}
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-200 bg-white text-lg font-bold leading-none">
              B
            </span>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-200 bg-white text-lg font-bold leading-none">
              F
            </span>
          </div>

          <NavigationMenuDemo />
        </div>

        <nav className="flex items-center gap-2 max-md:hidden">
          {user ? (
            <LogoutButton />
          ) : (
            <Link href="/login">
              <Button
                variant="outline"
                className="border-emerald-200 text-emerald-800 hover:bg-emerald-50 rounded-xl"
              >
                로그인
              </Button>
            </Link>
          )}
        </nav>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="hidden max-md:block">
              <Menu />
            </Button>
          </DialogTrigger>
          <DialogContent className="h-full  p-0 min-w-full [&>button]:hidden rounded-none">
            <div className="flex flex-col ">
              <DialogTitle className={`flex items-center justify-between h-20 px-4 bg-gradient-to-b from-emerald-50/60 to-white backdrop-blur transition-all duration-200 ${isScrolled ? 'border-b border-emerald-100' : ''}`}>
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-200 bg-white text-lg font-bold leading-none">
                    B
                  </span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-200 bg-white text-lg font-bold leading-none">
                    F
                  </span>
                </div>

                <DialogClose asChild>
                  <Button variant="ghost" className="">
                    <X />
                  </Button>
                </DialogClose>
              </DialogTitle>
              <div className="px-4 mt-4">
                {user ? (
                  <LogoutButton />
                ) : (
                  <Link href="/login">
                    <Button
                      variant="outline"
                      className="border-emerald-200 text-emerald-800 hover:bg-emerald-50 rounded-xl w-full"
                    >
                      로그인
                    </Button>
                  </Link>
                )}
              </div>
              <MobileNavigationMenu />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {/* 하단 에메랄드 라인 글로우 */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent" />
    </header>
  );
}
