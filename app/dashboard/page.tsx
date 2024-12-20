"use client";

import {
  LayoutGrid,
  Heart,
  LogOut,
  Plus,
  MoreVertical,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useEffect } from "react";

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

export default function Dashboard() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: session, isPending, error } = useSession();

  // Fetch boxes using useQuery with TypeScript Types
  const {
    data: boxItems,
    isLoading: boxesLoading,
    isError: boxesError,
    error: boxesErrorMsg,
  } = useQuery<BoxItem[], Error>({
    queryKey: ["boxes"],
    queryFn: async () => {
      const response = await fetch("/api/box");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch boxes");
      }
      return response.json();
    },
    enabled: !!session && session.user?.role === "admin", // Only fetch if user is authenticated and is admin
  });

  // Handle session loading and redirection
  useEffect(() => {
    if ((!session || session.user?.role !== "admin") && !isPending) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  // Group boxItems by Box ID to calculate total products per box
  const boxesSummary = useMemo(() => {
    const summary: Record<string, { box: Box; totalProduct: number }> = {};

    boxItems?.forEach((item) => {
      const boxId = item.box.id;
      if (!summary[boxId]) {
        summary[boxId] = { box: item.box, totalProduct: 1 };
      } else {
        summary[boxId].totalProduct += 1;
      }
    });

    return Object.values(summary);
  }, [boxItems]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
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
            href="/curate-box"
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
            <span>{session?.user?.name}</span>
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>GL</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">Curate Box</h1>
              <Button className="bg-violet-500 hover:bg-violet-600">
                <Link href="/new-box">
                  Curate New Box
                </Link>
              </Button>
            </div>

            {/* Loading and Error States */}
            {boxesLoading && <div>Loading boxes...</div>}
            {boxesError && <div>Error: {boxesErrorMsg.message}</div>}

            {/* Boxes Table */}
            {!boxesLoading && !boxesError && boxesSummary && (
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Customer ID</TableHead>
                      <TableHead>Total Product</TableHead>
                      <TableHead>Total Price</TableHead>
                      <TableHead className="cursor-pointer hover:text-gray-900">
                        <div className="flex items-center gap-2">
                          Date Curated
                          <ChevronDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {boxesSummary.map(({ box, totalProduct }) => (
                      <TableRow key={box.id}>
                        <TableCell>{box.id}</TableCell>
                        <TableCell>{box.customerId}</TableCell>
                        <TableCell>{totalProduct}</TableCell>
                        <TableCell>
                          {`IDR ${boxItems!
                            .filter((item) => item.box.id === box.id)
                            .reduce((sum, item) => sum + item.product.price, 0)
                            .toLocaleString("id-ID")}`}
                        </TableCell>
                        <TableCell>
                          {new Date(box.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-sm `}
                          >
                            Sent to pack
                          </span>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Link href={`/dashboard/${box.id}`}>
                                  View details
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Link href={`/dashboard/edit/${box.id}`}>
                                  Edit box
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                Delete box
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
