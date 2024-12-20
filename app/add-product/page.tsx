"use client";

import { useState, useEffect } from "react";
import { LayoutGrid, Heart, LogOut, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface Product {
	id: string;
	name: string;
	brandName: string;
	price: number;
	category: string;
	image: string;
}

export default function AddProduct() {
	const router = useRouter();
	const productQuery = useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			const response = await fetch("/api/product");
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		},
	});

	// State to track selected products
	const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

	// Load selected products from sessionStorage on component mount
	useEffect(() => {
		const storedProducts: Product[] = JSON.parse(
			sessionStorage.getItem("selectedProducts") || "[]",
		);
		setSelectedProducts(storedProducts);
	}, []);

	const handleToggleProduct = (product: Product) => {
		const isSelected = selectedProducts.some((p) => p.id === product.id);

		if (isSelected) {
			// Remove the product from selectedProducts
			const updatedProducts = selectedProducts.filter(
				(p) => p.id !== product.id,
			);
			setSelectedProducts(updatedProducts);
			sessionStorage.setItem(
				"selectedProducts",
				JSON.stringify(updatedProducts),
			);
		} else {
			// Add the product to selectedProducts
			const updatedProducts = [...selectedProducts, product];
			setSelectedProducts(updatedProducts);
			sessionStorage.setItem(
				"selectedProducts",
				JSON.stringify(updatedProducts),
			);
		}
	};

	if (productQuery.isLoading) {
		return <span>Loading...</span>;
	}

	if (productQuery.isError) {
		return <span>Error loading products</span>;
	}

	return (
		<div className="min-h-screen flex bg-white">
			{/* Sidebar */}
			<div className="w-[280px] bg-black text-white p-6 flex flex-col">
				{/* Logo */}
				<div className="flex items-center gap-2 mb-12">
					<div className="w-8 h-8 bg-white" />
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
				>
					<LogOut className="mr-2 h-4 w-4" />
					Logout
				</Button>
			</div>

			{/* Main Content */}
			<div className="flex-1 flex flex-col">
				{/* Top Bar */}
				<header className="h-16 border-b flex items-center justify-between px-8">
					<div />
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
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{/* Back Button */}
						<div className="col-span-3 mb-4">
							<Button
								variant="ghost"
								className="flex items-center gap-2"
								onClick={() => router.push("/new-box")}
							>
								<ArrowLeft size={20} />
								Back to New Box
							</Button>
						</div>

						{productQuery.data.map((product: Product) => {
							const isSelected = selectedProducts.some(
								(p) => p.id === product.id,
							);
							return (
								<div key={product.id} className="space-y-4">
									<div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
										<img
											src={product.image}
											alt={product.name}
											className="w-full h-full object-cover"
										/>
									</div>
									<div className="space-y-2">
										<h3 className="text-xl font-semibold">{product.name}</h3>
										<p className="text-gray-500">{product.brandName}</p>
										<p className="font-medium">
											IDR {product.price.toLocaleString()}.00
										</p>
										<Button
											className={`w-full ${
												isSelected
													? "bg-green-500 hover:bg-green-600"
													: "bg-violet-500 hover:bg-violet-600"
											}`}
											onClick={() => handleToggleProduct(product)}
										>
											{isSelected ? "Selected" : "Add to Box"}
										</Button>
									</div>
								</div>
							);
						})}
					</div>
				</main>
			</div>
		</div>
	);
}
