"use client";

import { LogoutButton } from "@/components/custom/logout-button";
import { NavigationMenuDemo } from "./subs/navigation-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MobileNavigationMenu } from "./subs/mobile-navigation-menu";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User as UserType } from "@supabase/supabase-js";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [profile, setProfile] = useState<any>(null);

  console.log(user, "user");
  console.log(profile, "profile");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    const supabase = createClient();

    // 초기 사용자 상태 가져오기
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    window.addEventListener("scroll", handleScroll);
    getUser();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 bg-gradient-to-b from-emerald-50/60 to-white backdrop-blur z-50 transition-all duration-200 ${
        isScrolled ? "border-b border-emerald-100" : ""
      }`}
    >
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

        <nav className="flex items-center flex-1 justify-end gap-2 max-md:hidden">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-emerald-700 border-emerald-200 hover:bg-emerald-50 rounded-full p-2"
                >
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-3 py-2 text-sm border-b">
                  <div className="font-medium text-gray-900">
                    {user?.user_metadata.name || user.email}
                  </div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </div>
                <DropdownMenuItem asChild>
                  <LogoutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
              <DialogTitle
                className={`flex items-center justify-between h-20 px-4 bg-gradient-to-b from-emerald-50/60 to-white backdrop-blur transition-all duration-200 ${
                  isScrolled ? "border-b border-emerald-100" : ""
                }`}
              >
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
                  <div className="space-y-2">
                    <div className="text-center text-sm text-emerald-700 py-1 truncate">
                      {profile?.name || user.email}님
                    </div>
                    <LogoutButton />
                  </div>
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
