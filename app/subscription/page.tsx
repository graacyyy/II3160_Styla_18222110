'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type PlanType = 'trial' | 'basic' | 'premium' | 'ultimate'
interface Plan {
  id: PlanType
  name: string
  price: string
  description: string
}

const plans: Plan[] = [
  {
    id: 'trial',
    name: 'Try 1 for free first',
    price: 'Free',
    description: 'Try our service with one free styling session'
  },
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 'IDR 99K',
    description: 'Ideal for newcomers, one curated box each month'
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: 'IDR 179K',
    description: 'Ideal for newcomers, one curated box each month'
  },
  {
    id: 'ultimate',
    name: 'Ultimate Plan',
    price: 'IDR 269K',
    description: 'Ideal for newcomers, one curated box each month'
  }
]

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('basic')
  const router = useRouter()
  const handleContinue = () => {
    router.push(`/home`)
  }
  return (
    <div className="min-h-screen p-8 md:p-12 flex">
      <div className="flex-1 pr-8">
        <div className="mb-8">
          <div className="flex items-center mb-8">
            <Image
              src="/logo-dark.png"
              alt="Logo"
              width={40}
              height={40}
            />
            <h1 className="ml-3 mr-10 text-2xl font-semibold">Styla</h1>
          </div>
          <h1 className="text-4xl font-bold mb-2">Let's Get You Styled!</h1>
          <p className="text-xl text-gray-600">Complete your subscription to continue</p>
        </div>
      </div>

      <div className="flex-1 max-w-xl">
        <div className="space-y-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                selectedPlan === plan.id
                ? 'border-pink-500 bg-pink-50'
                : 'border-gray-200 hover:border-pink-200'
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <p className="text-gray-600 mt-1">{plan.description}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-xl font-bold">{plan.price}</span>
                  <div className={`w-6 h-6 rounded-full border-2 ${
                    selectedPlan === plan.id
                    ? 'border-pink-500 bg-pink-500'
                    : 'border-gray-300'
                  }`}>
                    {selectedPlan === plan.id && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleContinue}
          className="w-full mt-8 bg-pink-500 text-white py-4 rounded-xl font-semibold hover:bg-pink-600 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
 )
}