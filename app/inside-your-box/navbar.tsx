"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { redirect, useRouter } from "next/navigation";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { useSession, signOut } = authClient;
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 flex justify-center bg-black text-white"
    >
      <div className="container flex h-16 items-center justify-between px-4 w-screen">
        <Link href="/" className="flex text-xl font-semibold">
          <Image
            src="/logo.png"
            alt="Logo"
            width={28}
            height={28}
          />
          <h1 className="ml-3 mr-10 text-white">Styla</h1>
        </Link>

        {session && (
          <Button
            onClick={handleLogout}
            className= "bg-pink-500 text-white hover:bg-pink-600"
          >
            Logout
          </Button>
        )}
      </div>
    </header>
  );
}