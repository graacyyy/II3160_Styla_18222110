import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function Subscription() {
  const plans = [
    {
      name: "Basic Plan",
      price: "IDR 99K",
      description:
        "Ideal for newcomers, one curated box each month",
      features: [
        "1 curated box per month",
        "Free shipping",
        "Style recommendations",
      ],
      bgColor: "bg-black",
      textColor: "text-white",
    },
    {
      name: "Standard",
      price: "IDR179K",
      description:
        "Enjoy more options and flexibility tailored to your style.",
      features: [
        "2 curated boxes per month",
        "Free returns",
        "Priority support",
        "Style recommendations",
      ],
      bgColor: "bg-black",
      textColor: "text-white",
    },
    {
      name: "Premium",
      price: "IDR289K",
      description:
        "Get the ultimate experience with exclusive benefits and perks.",
      features: [
        "Unlimited curated boxes",
        "Free shipping and returns",
        "Personal stylist access",
        "Exclusive perks",
      ],
      bgColor: "bg-black",
      textColor: "text-white",
    },
  ];

  return (
    <section id="subscription" className="py-20 bg-gray-50">
      {/* Heading */}
      <div className="text-center px-6 lg:px-16">
        <h2 className="mb-6 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
          Flexible Plans for Every Style
        </h2>
      </div>

      {/* Plans Section */}
      <div className="container mx-auto mt-12 grid gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3 lg:px-16">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative flex flex-col rounded-xl shadow-lg transition-transform hover:scale-105 ${plan.bgColor}`}
          >
            <div className="p-6">
              <h3 className={`text-2xl font-bold ${plan.textColor}`}>
                {plan.name}
              </h3>
              <p className="mt-4 text-white">{plan.description}</p>
              <p className={`mt-6 text-3xl font-bold ${plan.textColor}`}>
                {plan.price}
                <span className="text-lg font-medium">/mo</span>
              </p>
              <button
                className={`mt-8 w-full rounded-lg bg-white px-4 py-3 text-black font-medium transition-colors hover:bg-transparent hover:border-3 hover:text-white`}
              >
                Get Started
              </button>
              <ul className="mt-6 space-y-4 text-white">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <CheckCircleIcon className="mr-3 h-6 w-6 text-purple-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}