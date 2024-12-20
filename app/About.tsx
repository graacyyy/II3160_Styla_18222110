import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      {/* Heading */}
      <div className="px-6 lg:px-16">
        <h2 className="mb-12 text-3xl font-bold leading-tight text-center text-gray-900 sm:text-4xl lg:text-5xl">
          About <span className="text-purple-500">Styla</span>: Your Personalized Fashion Partner
        </h2>
      </div>

      {/* Content */}
      <div className="container mx-auto flex flex-col items-center px-6 gap-10 lg:flex-row lg:gap-16 lg:px-16">
        {/* Image Section */}
        <div className="relative w-full lg:w-1/2">
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-3xl shadow-lg lg:aspect-auto">
            <Image
              src="/about.png"
              alt="About Styla"
              width={500}
              height={500}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="lg:w-1/2">
          <p className="text-lg text-justify text-gray-700 sm:text-xl lg:text-2xl">
            At Styla, we believe that fashion is more than just clothing—{" "}
            <span className="text-orange-500 italic font-semibold">it’s a reflection of who you are</span>. That's why
            we're here to simplify your style journey with personalized fashion curation tailored
            just for you.
          </p>
          <p className="mt-6 text-lg text-justify text-gray-700 sm:text-xl lg:text-2xl">
            Our expert stylists handpick every item to match your unique preferences, so you can
            look and feel your best effortlessly. With Styla, shopping becomes personal, convenient,
            and truly rewarding.
          </p>
        </div>
      </div>
    </section>
  );
}