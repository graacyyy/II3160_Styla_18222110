"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { redirect, useRouter } from "next/navigation";

const { useSession } = authClient;

export default function CustomerInfoPage() {
  const [step, setStep] = useState<"subscription" | "customerInfo">(
    "subscription"
  );

  const handleContinue = () => {
    setStep("customerInfo");
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {step === "subscription" ? (
          <SubscriptionPlans onContinue={handleContinue} />
        ) : (
          <CustomerInfoForm />
        )}
      </div>
    </div>
  );
}

function SubscriptionPlans({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black"></div>
          <span className="text-2xl font-semibold">Styla</span>
        </div>

        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Let's Get You Styled!
          </h1>
          <p className="text-xl text-gray-600">
            Complete your subscription to continue
          </p>
        </div>

        {/* Subscription Plans */}
        <RadioGroup defaultValue="basic" className="space-y-4">
          {/* Free Trial */}
          <label className="flex items-center justify-between p-4 rounded-lg border cursor-pointer hover:border-pink-400 [&:has(:checked)]:border-pink-400">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="trial" />
              <div>
                <div className="font-medium">Try 1 for free first</div>
              </div>
            </div>
          </label>

          {/* Basic Plan */}
          <label className="flex items-center justify-between p-4 rounded-lg border cursor-pointer hover:border-pink-400 [&:has(:checked)]:border-pink-400">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="basic" />
              <div>
                <div className="font-medium">Basic Plan</div>
                <div className="text-gray-600">
                  Ideal for newcomers, one curated box each month
                </div>
              </div>
            </div>
            <div className="font-semibold">IDR 99K</div>
          </label>

          {/* Premium Plan */}
          <label className="flex items-center justify-between p-4 rounded-lg border cursor-pointer hover:border-pink-400 [&:has(:checked)]:border-pink-400">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="premium" />
              <div>
                <div className="font-medium">Premium Plan</div>
                <div className="text-gray-600">
                  Ideal for newcomers, one curated box each month
                </div>
              </div>
            </div>
            <div className="font-semibold">IDR 179K</div>
          </label>

          {/* Ultimate Plan */}
          <label className="flex items-center justify-between p-4 rounded-lg border cursor-pointer hover:border-pink-400 [&:has(:checked)]:border-pink-400">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="ultimate" />
              <div>
                <div className="font-medium">Ultimate Plan</div>
                <div className="text-gray-600">
                  Ideal for newcomers, one curated box each month
                </div>
              </div>
            </div>
            <div className="font-semibold">IDR 269K</div>
          </label>
        </RadioGroup>

        {/* Continue Button */}
        <Button
          onClick={onContinue}
          className="w-full bg-pink-500 hover:bg-pink-600 text-lg py-6"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

function CustomerInfoForm() {
  const queryClient = useQueryClient();

  const [age, setAge] = useState("");
  const [job, setJob] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bust1, setBust1] = useState("");
  const [waist1, setWaist1] = useState("");
  const [hip, setHip] = useState("");
  const [shoeSize, setShoeSize] = useState("");
  const [colorPreferences, setColorPreferences] = useState("");
  const [stylePreferences, setStylePreferences] = useState("");
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (formData: any) => {
      const response = await fetch("/api/customerDetail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit customer info");
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch any relevant queries
      // queryClient.invalidateQueries(["customerInfo"]);
      // Redirect or provide feedback
      alert("Customer information submitted successfully!");
      router.push("/home");
    },
    onError: (error: any) => {
      alert(`Submission failed: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      age,
      job,
      height,
      weight,
      bust: bust1,
      waist: waist1,
      hip,
      shoeSize,
      color: colorPreferences,
      style: stylePreferences,
    };
    mutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black"></div>
          <span className="text-2xl font-semibold">Styla</span>
        </div>

        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Let's Get You Styled!
          </h1>
          <p className="text-xl text-gray-600">First, complete your profile</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Width Fields */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="age">Your Age</Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="job">Your Job</Label>
              <Input
                id="job"
                value={job}
                onChange={(e) => setJob(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Measurements Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="height">Height</Label>
              <div className="relative">
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  cm
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight</Label>
              <div className="relative">
                <Input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  cm
                </span>
              </div>
            </div>
          </div>

          {/* Additional Measurements */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Measurement 1 */}
            <div className="space-y-2">
              <Label htmlFor="bust-1">Bust</Label>
              <div className="relative">
                <Input
                  id="bust-1"
                  type="number"
                  value={bust1}
                  onChange={(e) => setBust1(e.target.value)}
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  cm
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="waist-1">Waist</Label>
              <div className="relative">
                <Input
                  id="waist-1"
                  type="number"
                  value={waist1}
                  onChange={(e) => setWaist1(e.target.value)}
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  cm
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Measurement 2 */}
            <div className="space-y-2">
              <Label htmlFor="hip">Hip</Label>
              <div className="relative">
                <Input
                  id="hip"
                  type="number"
                  value={hip}
                  onChange={(e) => setHip(e.target.value)}
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  cm
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="shoeSize">Shoe Size</Label>
              <div className="relative">
                <Input
                  id="shoeSize"
                  type="number"
                  value={shoeSize}
                  onChange={(e) => setShoeSize(e.target.value)}
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  cm
                </span>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="space-y-2">
            <Label htmlFor="colorPreferences">Color Preferences</Label>
            <Input
              id="colorPreferences"
              value={colorPreferences}
              onChange={(e) => setColorPreferences(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stylePreferences">Style Preferences</Label>
            <Input
              id="stylePreferences"
              value={stylePreferences}
              onChange={(e) => setStylePreferences(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-lg py-6"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Submitting..." : "Continue"}
          </Button>
        </form>
      </div>
    </div>
  );
}
