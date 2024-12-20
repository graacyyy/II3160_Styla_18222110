"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const { useSession } = authClient;

const formSchema = z.object({
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	password: z.string().min(1, {
		message: "Password is required.",
	}),
});

export default function LoginForm() {
	const { data: session, isPending, error } = useSession();
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		await authClient.signIn.email({
			email: values.email,
			password: values.password,
		});

		router.push("/home");
	}

	return (
		<div className="flex min-h-screen">
			{/* Left side with image and branding */}
			<div className="hidden w-1/2 bg-gradient-to-br from-pink-400 via-pink-500 to-orange-400 lg:block">
				<div className="flex h-full flex-col justify-between p-8 text-white">
					<div className="text-4xl font-bold">Styla</div>
					<h1 className="mb-8 text-5xl leading-tight">
						Your Personal Style Journey Starts Here!
					</h1>
				</div>
			</div>

			{/* Right side with form */}
			<div className="flex w-full items-center justify-center p-8 lg:w-1/2">
				<div className="w-full max-w-md space-y-8">
					<div className="space-y-2">
						<h2 className="text-3xl font-semibold">Login to your account</h2>
					</div>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email Address</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter your email"
												type="email"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter your password"
												type="password"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button
								type="submit"
								className="w-full bg-pink-500 hover:bg-pink-600"
							>
								Sign in to account
							</Button>
						</form>
					</Form>

					<div className="text-center text-sm">
						Don&apos;t have an account?{" "}
						<Link href="/signup" className="text-pink-500 hover:text-pink-600">
							Sign Up
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
