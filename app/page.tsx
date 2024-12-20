import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Navbar } from "../components/nav-home"
import About from "@/app/About"
import { WhyChooseUs } from "@/app/whyChooseUs"
import Subscription from "@/app/Subscription"
import { redirect } from "next/navigation"

export default async function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section id="hero" className="relative min-h-screen">
        <Image
          src="/hero.png"
          alt="Hero background"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container px-4 text-center text-white">
            <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Styla - Where personal taste meets{" "}
              <span className="text-pink-400">professional touch</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-200">
              Say goodbye to the hassles of shopping and hello to a wardrobe that feels
              like you, created by professionals who truly get your vibe.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Button 
                size="lg"
                variant="default"
                className="text-lg py-5 px-5 rounded-full bg-white text-black transition-colors hover:bg-pink-400 hover:text-white">
                Get started now!
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-white border-2 text-lg text-white bg-transparent transition-colors hover:bg-pink-400 hover:text-white hover:border-pink-400">
                More about us
              </Button>
            </div>
          </div>
        </div>
      </section>
      <About />
      <WhyChooseUs />
      <Subscription />
    </div>
  )
}