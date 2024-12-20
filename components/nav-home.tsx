"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 ${
        isScrolled ? "bg-white text-black" : "bg-transparent text-white"
      } transition-all duration-300`}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex text-xl font-semibold">
          <Image
            src={isScrolled ? "/logo-dark.png" : "/logo.png"}
            alt="Logo"
            width={28}
            height={28}
          />
          <h1 className="ml-3 mr-10">Styla</h1>
        </Link>

        <nav className="hidden gap-6 md:flex">
          <Link
            href="/#about"
            className="text-md font-medium transition-colors hover:text-purple-400"
          >
            About Us
          </Link>
          <Link
            href="/#how-it-works"
            className="text-md font-medium transition-colors hover:text-purple-400"
          >
            How It Works
          </Link>
          <Link
            href="/#subscription"
            className="text-md font-medium transition-colors hover:text-purple-400"
          >
            Subscription
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button
              size="lg"
              className={`rounded-full px-6 py-2 transition-colors ${
                isScrolled
                  ? "bg-black text-white hover:bg-gray-800"
                  : "border-2 border-white text-white bg-transparent hover:bg-white hover:text-black"
              }`}
            >
              Login
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}