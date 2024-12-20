"use client";

import { useState, useEffect } from "react";
import { LayoutGrid, Heart, LogOut, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  role: string;
  banned: boolean | null;
  banReason: string | null;
  banExpires: string | null;
}

interface UserDetail {
  userId: string;
  height: number;
  weight: number;
  bust: number;
  waist: number;
  hip: number;
  shoeSize: number;
  colorPreference: string;
  stylePreference: string;
  job: string;
}

interface Customer {
  user: User;
  user_detail: UserDetail;
}

interface Product {
  id: string;
  name: string;
  brandName: string;
  price: number;
  category: string;
  image: string;
}

export default function NewBox() {
  const queryClient = useQueryClient();

  const customersQuery = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const response = await fetch("/api/customer");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const handleSelect = (value: string) => {
    const customer = customersQuery.data?.find(
      (cust: Customer) => cust.user.id === value
    );
    setSelectedCustomer(customer || null);
  };

  // Load selected products from sessionStorage on component mount
  useEffect(() => {
    const storedProducts: Product[] = JSON.parse(
      sessionStorage.getItem("selectedProducts") || "[]"
    );
    setSelectedProducts(storedProducts);
  }, []);

  // Mutation to submit the new box
  const createBoxMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/box", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: selectedCustomer?.user.id,
          productIds: selectedProducts.map((product) => product.id),
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create box");
      }
      return response.json();
    },
    onSuccess: () => {
      // Invalidate related queries
      // queryClient.invalidateQueries(["boxes"]);
      // Clear selected products
      setSelectedProducts([]);
      sessionStorage.removeItem("selectedProducts");
      // Optionally, redirect or show a success message
      alert("Box created successfully!");
    },
    onError: (error) => {
      // Handle error (e.g., show a notification)
      alert(`Error: ${error.message}`);
    },
  });

  if (customersQuery.isLoading) {
    return <span>Loading...</span>;
  }

  if (customersQuery.isError) {
    return <span>Error loading customers</span>;
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* Sidebar */}
      <div className="w-[280px] bg-black text-white p-6 flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-12">
          <div className="w-8 h-8 bg-white"></div>
          <span className="text-2xl font-semibold">Styla</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 flex-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            <LayoutGrid size={20} />
            Dashboard
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-4 py-2 text-white bg-pink-500 rounded-md"
          >
            <Heart size={20} />
            Curate Box
          </Link>
        </nav>

        {/* Logout Button */}
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800"
          onClick={() => {
            authClient.signOut();
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 border-b flex items-center justify-between px-8">
          <div></div>
          <div className="flex items-center gap-3">
            <span>Glinda</span>
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>GL</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">
          <div className="space-y-8 max-w-4xl">
            <h1 className="text-2xl font-semibold">New Box</h1>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>Customer</Label>
                  <Select onValueChange={handleSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {customersQuery.data?.map((customer: Customer) => (
                        <SelectItem
                          key={customer.user.id}
                          value={customer.user.id}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {customer.user.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div>{customer.user.name}</div>
                              <div className="text-sm text-gray-500">
                                {customer.user_detail.job}
                              </div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedCustomer && (
                  <div className="space-y-4">
                    <Label>Customer Information</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="height">Height</Label>
                        <span className="text-gray-700">
                          {selectedCustomer.user_detail.height} cm
                        </span>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="weight">Weight</Label>
                        <span className="text-gray-700">
                          {selectedCustomer.user_detail.weight} kg
                        </span>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bust">Bust</Label>
                        <span className="text-gray-700">
                          {selectedCustomer.user_detail.bust} cm
                        </span>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="waist">Waist</Label>
                        <span className="text-gray-700">
                          {selectedCustomer.user_detail.waist} cm
                        </span>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hip">Hip</Label>
                        <span className="text-gray-700">
                          {selectedCustomer.user_detail.hip} cm
                        </span>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shoeSize">Shoe Size</Label>
                        <span className="text-gray-700">
                          {selectedCustomer.user_detail.shoeSize}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="colorPreferences">
                          Color Preferences
                        </Label>
                        <span className="text-gray-700">
                          {selectedCustomer.user_detail.colorPreference}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stylePreferences">
                          Style Preferences
                        </Label>
                        <span className="text-gray-700">
                          {selectedCustomer.user_detail.stylePreference}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="job">Job</Label>
                        <span className="text-gray-700">
                          {selectedCustomer.user_detail.job}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Product List</Label>
                  <Button className="bg-black hover:bg-gray-800">
                    <Link href="/add-product">Add Product</Link>
                  </Button>
                </div>
                {/* Display Selected Products */}
                {selectedProducts.length > 0 && (
                  <div className="mt-4">
                    <h2 className="text-lg font-semibold mb-2">
                      Selected Products
                    </h2>
                    <ul className="space-y-2">
                      {selectedProducts.map((product) => (
                        <li
                          key={product.id}
                          className="flex justify-between items-center bg-gray-100 p-2 rounded"
                        >
                          <span>{product.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const updatedProducts = selectedProducts.filter(
                                (p) => p.id !== product.id
                              );
                              setSelectedProducts(updatedProducts);
                              sessionStorage.setItem(
                                "selectedProducts",
                                JSON.stringify(updatedProducts)
                              );
                            }}
                          >
                            Remove
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <Button
              className="w-full bg-violet-500 hover:bg-violet-600 py-6 text-lg"
              onClick={() => createBoxMutation.mutate()}
              disabled={
                !selectedCustomer ||
                selectedProducts.length === 0 ||
                createBoxMutation.isPending
              }
            >
              {createBoxMutation.isPending ? "Submitting..." : "Submit Box"}
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
