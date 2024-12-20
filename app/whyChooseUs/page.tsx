
export function WhyChooseUs() {
    const cards = [
      {
        image: "/personalized.png",
        title: "Personalized",
        description:
          "Every box is tailored to your unique style, size, and preferences—because no one else is quite like you.",
      },
      {
        image: "/effortless.png",
        title: "Effortless",
        description:
          "Enjoy fashion without the hassle: everything is curated and delivered straight to your door.",
      },
      {
        image: "/flexible.png",
        title: "Flexible",
        description:
          "Enjoy the freedom to choose, try, and return at your convenience—no strings attached.",
      },
    ];
  
    return (
      <section id="why-choose-us" className="py-20 bg-black">
        <div className="container mx-auto px-6 lg:px-16">
          {/* Header Section */}
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold text-white">
              Why Choose Us
            </h2>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Styla brings you personalized fashion solutions by blending your
              preferences with professional styling expertise, delivered monthly.
            </p>
          </div>
  
          {/* Cards Section */}
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3">
            {cards.map((card, index) => (
              <div
                key={index}
                className="relative flex h-[450px] flex-col justify-end rounded-2xl bg-cover bg-center text-white shadow-lg transition-transform hover:scale-105"
                style={{ backgroundImage: `url(${card.image})` }}
              >
                <div className="p-6 bg-gradient-to-t from-black/70 via-black/40 to-transparent rounded-2xl">
                  <h3 className="text-2xl font-bold">{card.title}</h3>
                  <p className="mt-2 text-sm text-gray-200">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }