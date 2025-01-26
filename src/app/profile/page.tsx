// src/app/profile/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MapPin, Share2, MoreHorizontal } from "lucide-react";
import axios from 'axios';
import Image from 'next/image';

export default function ProfilePage() {

  interface PortfolioItem {
    title: string;
    imageUrl?: string;
  }

  interface Language {
    language: string;
    proficiency: string;
  }

  interface Profiledata{
    title: string;
    location: string;
    about: string;
    hourlyRate: string;
    availableHoursPerWeek: string;
    skills: string[];
    portfolio: PortfolioItem[];
    languages: Language[];
  }

  const [profile, setProfile] = useState<Profiledata | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not authenticated
    if (status === "unauthenticated") {
      router.push('/auth/signin');
      return;
    }

    async function fetchProfile() {
      try {
        const response = await axios.get('/api/profile');
        if (response.status === 200) {
          setProfile(response.data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    }

    if (status === "authenticated") {
      fetchProfile();
    }
  }, [status, router]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-xl mb-4">No profile found</h2>
        <Button onClick={() => router.push('/profileform')}>
          Create Profile
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
    <Navigation />
    <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid gap-8 md:grid-cols-[2fr_1fr] max-w-7xl mx-auto">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start gap-6">
              <img 
                alt="Profile" 
                className="rounded-full h-24 w-24 object-cover border-4 border-white shadow-md" 
                src={session?.user?.image || "/placeholder.svg"} 
              />
              <div className="space-y-3 flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{profile?.title}</h1>
                    <p className="text-lg text-gray-600 mt-1">{session?.user?.name}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {profile?.location && (
                  <div className="flex items-center text-gray-500 mt-2">
                    <MapPin className="mr-2 h-5 w-5" />
                    <span className="text-base">{profile.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">About</h2>
            <p className="text-gray-600 leading-relaxed">{profile?.about}</p>
          </div>

          {/* Skills Section */}
          {profile?.skills?.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill: string, i: number) => (
                  <Badge 
                    key={i} 
                    variant="secondary"
                    className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Portfolio Section */}
          {profile?.portfolio?.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">Portfolio</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {profile.portfolio.map((item: any, i: number) => (
                  <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
                    {item.imageUrl && (
                      <div className="relative h-48">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card className="p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Rate & Availability</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Hourly Rate</span>
                <span className="font-semibold text-gray-900">${profile?.hourlyRate}/hr</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Available</span>
                <span className="font-semibold text-gray-900">{profile?.availableHoursPerWeek} hrs/week</span>
              </div>
            </div>
          </Card>

          {profile?.languages?.length > 0 && (
            <Card className="p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Languages</h2>
              <div className="space-y-3">
                {profile.languages.map((lang: any, i: number) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b last:border-0">
                    <span className="text-gray-600">{lang.language}</span>
                    <span className="font-medium text-gray-900">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </main>
    <Footer />
  </div>
  );
}
