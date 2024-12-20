'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PreferencesForm {
  age: string
  job: string
  height: string
  weight: string
  colorPreferences: string
  stylePreferences: string
  shoulderWidth: string
  chestWidth: string
    waistWidth: string
  }

export default function PreferencesPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<PreferencesForm>({
    age: '',
    job: '',
    height: '',
    weight: '',
    colorPreferences: '',
    stylePreferences: '',
    shoulderWidth: '',
    chestWidth: '',
    waistWidth: ''
  })
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/subscription')
  }
  
  return (
    <div className="min-h-screen p-8 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center mb-8">
              <Image
                src="/logo-dark.png"
                alt="Logo"
                width={40}
                height={40}
              />
            <h1 className="ml-3 mr-10 text-2xl font-semibold">Styla</h1>
          </div>
          <h1 className="text-4xl font-bold mb-4">Let's Get You Styled!</h1>
          <p className="text-xl text-gray-600">First, complete your profile</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label htmlFor="age">Your Age</Label>
              <Input
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="job">Your Job</Label>
              <Input
                id="job"
                name="job"
                value={formData.job}
                onChange={handleChange}
                className="rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label htmlFor="height">Height</Label>
              <div className="relative">
                <Input
                  id="height"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="rounded-lg pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  cm
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight</Label>
              <div className="relative">
                <Input
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="rounded-lg pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  kg
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label htmlFor="shoulderWidth">Shoulder Width</Label>
              <div className="relative">
                <Input
                  id="shoulderWidth"
                  name="shoulderWidth"
                  value={formData.shoulderWidth}
                  onChange={handleChange}
                  className="rounded-lg pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  cm
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="chestWidth">Chest Width</Label>
              <div className="relative">
                <Input
                  id="chestWidth"
                  name="chestWidth"
                  value={formData.chestWidth}
                  onChange={handleChange}
                  className="rounded-lg pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  cm
                </span>
              </div>
            </div>
          </div>

         <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="colorPreferences">Color Preferences</Label>
              <Input
                id="colorPreferences"
                name="colorPreferences"
                value={formData.colorPreferences}
                onChange={handleChange}
                className="rounded-lg"
                placeholder="e.g., Blue, Black, Earth tones"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stylePreferences">Style Preferences</Label>
              <Input
                id="stylePreferences"
                name="stylePreferences"
                value={formData.stylePreferences}
                onChange={handleChange}
                className="rounded-lg"
                placeholder="e.g., Casual, Formal, Streetwear"
              />
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <button
              type="submit"
              className="w-full max-w-md bg-pink-500 text-white py-4 rounded-xl font-semibold hover:bg-pink-600 transition-colors"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}