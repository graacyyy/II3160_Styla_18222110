"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

const { useSession } = authClient;

export default function Home() {
  const router = useRouter();
  const { data: session, isPending, error } = useSession();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const posters = ["/ads1.png", "/ads2.png"];

  useEffect(() => {
    setIsMounted(true); // Prevent rendering differences
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % posters.length);
    }, 20000);

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  // Define the newestBox query with proper caching
  const newestBoxQuery = useQuery({
    queryKey: ["newestBox"],
    queryFn: async () => {
      const response = await fetch("/api/box/newest");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    staleTime: 30000,
    // cacheTime: 1000 * 60 * 5,
    enabled: !!session && session.user?.role === "user" && isMounted,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  // Handle redirects in useEffect to avoid rules of hooks violations
  useEffect(() => {
    if (!isMounted) return; // Do nothing until mounted

    if (isPending) return; // Optionally handle pending state

    if (error) return; // Optionally handle error state

    if (session?.user.role === "admin") {
      router.push("/dashboard");
    } else if (!session || session.user.role !== "user") {
      router.push("/login");
    }
  }, [isMounted, isPending, error, session, router]);

  if (!isMounted) {
    return null; // Render nothing on first client render to match server
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (newestBoxQuery.isLoading) {
    return <div>Loading latest box...</div>;
  }

  if (newestBoxQuery.isError) {
    return <div>Error loading latest box.</div>;
  }

  const latestBox = newestBoxQuery.data;

  return (
    <div className="min-h-screen">
      <Navbar />
      <section id="hero" className="relative w-full h-[543px]">
        <Image
          src={posters[currentIndex]}
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="container px-6 text-center"></div>
        </div>
      </section>

      {/* Inside Your Box Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold text-gray-900">
              Inside Your Box
            </h1>

            <Link href="/inside-your-box" passHref>
              <Button
                variant="link"
                className="text-lg text-pink-500 hover:text-pink-700"
              >
                See More →
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mt-8">
            {latestBox && latestBox.product ? (
              <div className="flex flex-col items-center justify-center border rounded-lg p-5 bg-white">
                {latestBox.product.image ? (
                  <Image
                    src={latestBox.product.image}
                    alt={latestBox.product.name}
                    width={200}
                    height={200}
                    className="h-56 w-full object-cover mb-4"
                  />
                ) : (
                  <div className="h-56 w-full bg-gray-300 mb-4"></div>
                )}
                <h3 className="text-lg font-medium text-gray-900">
                  {latestBox.product.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {latestBox.product.brandName}
                </p>
                <p className="text-lg text-gray-900 mt-2">
                  IDR {latestBox.product.price.toLocaleString("id-ID")}
                </p>
              </div>
            ) : (
              <div>No latest box available.</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
