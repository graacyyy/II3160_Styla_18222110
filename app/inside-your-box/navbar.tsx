"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Navbar() {

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 bg-black text-white"
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex text-xl font-semibold">
          <Image
            src="/logo.png"
            alt="Logo"
            width={28}
            height={28}
          />
          <h1 className="ml-3 mr-10">Styla</h1>
        </Link>
      </div>
    </header>
  );
}