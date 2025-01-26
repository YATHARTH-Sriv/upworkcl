'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from 'axios';

function ProfileCreationForm() {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    about: '',
    hourlyRate: '',
    availableHoursPerWeek: '',
    skills: '',
    portfolio: [{ title: '', imageUrl: '' }],
    languages: [{ language: '', proficiency: '' }]
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/profile', {
        ...formData,
        skills: formData.skills.split(',').map(skill => skill.trim()),
        portfolio: formData.portfolio.filter(p => p.title && p.imageUrl),
        languages: formData.languages.filter(l => l.language && l.proficiency)
      });
  
      if (response.status === 200) {
        router.push('/profile');
      }
    } catch (error) {
      console.error('Error submitting profile:', error);
    }
  };
  
  interface PortfolioItem {
    title: string;
    imageUrl: string;
  }

  interface Language {
    language: string;
    proficiency: string;
  }

  interface ProfileFormData {
    title: string;
    location: string;
    about: string;
    hourlyRate: string;
    availableHoursPerWeek: string;
    skills: string;
    portfolio: PortfolioItem[];
    languages: Language[];
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev: ProfileFormData) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Create Your Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Professional Title
            </label>
            <Input 
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Senior Software Developer"
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <Input 
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., New York, USA"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="about" className="block text-sm font-medium text-gray-700">
              About
            </label>
            <Textarea 
              id="about"
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
              className="w-full h-32"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">
                Hourly Rate ($)
              </label>
              <Input 
                id="hourlyRate"
                name="hourlyRate"
                type="number"
                value={formData.hourlyRate}
                onChange={handleChange}
                placeholder="e.g., 50"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="availableHoursPerWeek" className="block text-sm font-medium text-gray-700">
                Available Hours per Week
              </label>
              <Input 
                id="availableHoursPerWeek"
                name="availableHoursPerWeek"
                type="number"
                value={formData.availableHoursPerWeek}
                onChange={handleChange}
                placeholder="e.g., 40"
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
              Skills
            </label>
            <Input 
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g., React, TypeScript, Node.js"
              className="w-full"
            />
            <p className="text-sm text-gray-500">Separate skills with commas</p>
          </div>

          <Button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200"
          >
            Save Profile
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ProfileCreationForm;