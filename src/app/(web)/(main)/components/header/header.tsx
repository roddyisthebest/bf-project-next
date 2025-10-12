"use client";

import { LogoutButton } from "@/components/custom/logout-button";
import { NavigationMenuDemo } from "./subs/navigation-menu";
import Link from "next/link";
import Image from "next/image";
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
import { useRouter, usePathname } from "next/navigation";
import { UserRole } from "@/enums";
import { Profile } from "@/types";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const handleLogout = async () => {
    try {
      const response = await fetch("/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Logout failed with status:", response.status);
        return;
      }

      if (pathname.startsWith("/admin")) {
        router.push("/");
      } else {
        window.location.reload();
      }
    } catch (err) {
      console.error("Logout network error:", err);
      window.location.reload();
    }
  };

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

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single<Profile>();

        setProfile(profile);
      }
    };

    window.addEventListener("scroll", handleScroll);
    getUser();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0  bg-gradient-to-b from-brand-50/60 to-white backdrop-blur z-50 transition-all duration-200 ${
        isScrolled ? "border-b border-brand-100" : ""
      }`}
    >
      <div className="h-20 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {/* 로고 */}
          <Link href="/" className="relative block">
            <Image
              src="/logo_transparent.png"
              alt="큰숲교회 로고"
              width={80}
              height={80}
              className="object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </Link>

          <NavigationMenuDemo />
        </div>

        <nav className="flex items-center flex-1 justify-end gap-2 max-[840px]:hidden">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-brand-600 border-brand-100 hover:bg-brand-50 rounded-full p-2"
                >
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-3 py-2 text-sm border-b">
                  <div className="flex items-center gap-2">
                    <div className="font-medium text-gray-900">
                      {user?.user_metadata.name || user.email}
                    </div>
                    {profile?.role && (
                      <span
                        className={`text-xs font-medium px-1.5 py-0.5 rounded text-center ${
                          profile.role === UserRole.Admin
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {profile.role === UserRole.Admin ? "관리자" : "사용자"}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-600">{user.email}</div>
                </div>
                {profile?.role === UserRole.Admin && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="cursor-pointer">
                      관리자 페이지
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleLogout}>
                  로그아웃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button
                variant="outline"
                className="border-brand-100 text-brand-600 hover:bg-brand-50 rounded-xl"
              >
                로그인
              </Button>
            </Link>
          )}
        </nav>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="hidden max-[840px]:block">
              <Menu />
            </Button>
          </DialogTrigger>
          <DialogContent className="h-full  p-0 min-w-full [&>button]:hidden rounded-none">
            <div className="flex flex-col ">
              <DialogTitle
                className={`flex items-center justify-between h-20 px-4 bg-gradient-to-b from-brand-50/60 to-white backdrop-blur transition-all duration-200 ${
                  isScrolled ? "border-b border-brand-100" : ""
                }`}
              >
                <Link href="/" className="flex items-center">
                  <Image src="/logo.png" alt="Logo" width={80} height={80} />
                </Link>

                <DialogClose asChild>
                  <Button variant="ghost" className="">
                    <X />
                  </Button>
                </DialogClose>
              </DialogTitle>
              <div className="px-4 mt-4">
                {user ? (
                  <div className="bg-brand-50 rounded-xl p-4 border border-brand-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-brand-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="font-medium text-gray-900 truncate">
                            {user?.user_metadata.name || user.email}
                          </div>
                          {profile?.role && (
                            <span
                              className={`text-xs font-medium px-1.5 py-0.5 rounded text-center ${
                                profile.role === UserRole.Admin
                                  ? "bg-red-100 text-red-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {profile.role === UserRole.Admin
                                ? "관리자"
                                : "사용자"}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-600 truncate">
                          {user.email}
                        </div>
                      </div>
                    </div>
                    {profile?.role === UserRole.Admin && (
                      <Link href="/admin" className="block mb-3">
                        <Button
                          variant="outline"
                          className="w-full border-red-200 text-red-700 hover:bg-red-50 rounded-xl"
                        >
                          관리자 페이지
                        </Button>
                      </Link>
                    )}
                    <LogoutButton />
                  </div>
                ) : (
                  <DialogClose asChild>
                    <Link href="/login">
                      <Button
                        variant="outline"
                        className="border-brand-100 text-brand-600 hover:bg-brand-50 rounded-xl w-full"
                      >
                        로그인
                      </Button>
                    </Link>
                  </DialogClose>
                )}
              </div>
              <MobileNavigationMenu />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {/* 하단 라인 */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-600/60 to-transparent" />
    </header>
  );
}
