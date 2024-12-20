"use client";

import { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const { useSession } = authClient;

// Type Definitions Based on the Response
interface Box {
  id: string;
  customerId: string;
  createdAt: string;
  updatedAt: string;
}

interface BoxProduct {
  boxId: string;
  productId: string;
}

interface Product {
  id: string;
  name: string;
  brandName: string;
  price: number;
  category: string;
  image: string | null;
}

interface BoxItem {
  box: Box;
  box_product: BoxProduct;
  product: Product;
}

export default function InsideYourBox() {
  const router = useRouter();
  const {
    data: session,
    isPending: sessionLoading,
    error: sessionError,
  } = useSession();

  // Fetch boxes using useQuery with TypeScript Types
  const {
    data: boxes,
    isLoading: boxesLoading,
    isError: boxesError,
    error: boxesErrorMsg,
  } = useQuery<BoxItem[], Error>({
    queryKey: ["boxes"],
    queryFn: async () => {
      const response = await fetch("/api/box");
      if (!response.ok) {
        throw new Error("Failed to fetch boxes");
      }
      return response.json();
    },
    enabled: !!session && session.user.role === "user", // Only fetch if user is authenticated
  });

  // Handle session loading and errors
  if (sessionLoading) {
    return <div>Loading session...</div>;
  }

  if (sessionError) {
    return <div>Error: {sessionError.message}</div>;
  }

  // Handle boxes loading and errors
  if (boxesLoading) {
    return <div>Loading your boxes...</div>;
  }

  if (boxesError) {
    return <div>Error: {boxesErrorMsg.message}</div>;
  }

  // If no boxes found
  if (!boxes || boxes.length === 0) {
    return (
      <div className="min-h-screen w-full">
        <Navbar />
        <section className="relative w-full min-h-screen bg-white">
          <div className="pt-20 px-10">
            <h1 className="text-black text-2xl font-semibold">
              Inside Your Box
            </h1>
          </div>
          <div className="w-full px-10">
            <p>No boxes found.</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <section className="relative w-full min-h-screen bg-white">
        <div className="pt-20 px-10">
          <h1 className="text-black text-2xl font-semibold">Inside Your Box</h1>
        </div>
        <div className="w-full px-10">
          {/* Display each box */}
          {boxes.map((item, index) => (
            <div key={index} className="flex flex-row gap-2 pt-5">
              <h1 className="font-semibold">Box ID: </h1>
              <h1>{item.box.id}</h1>
              <div className="flex flex-wrap justify-between gap-5">
                {item.product ? (
                  <div className="flex flex-col pt-5">
                    <div className="w-[240px] h-[268px]">
                      <Image
                        src={item.product.image || "/placeholder.png"} // Display default image if `image` is null
                        alt={item.product.name}
                        width={240}
                        height={268}
                        className="w-full h-full object-cover object-center rounded-lg"
                      />
                    </div>
                    <div className="pt-5">
                      <h1 className="font-semibold">{item.product.name}</h1>
                      <h1>{item.product.brandName}</h1>
                      <h1>IDR {item.product.price.toLocaleString("id-ID")}</h1>
                    </div>
                  </div>
                ) : (
                  <div>No product details available.</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
