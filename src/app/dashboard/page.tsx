'use client';

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Card } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import { DollarSign, Briefcase, Clock, Star, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  const [stats] = useState({
    earnings: 1250,
    activeJobs: 3,
    proposals: 8,
    connects: 45
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto py-12 px-4">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button asChild>
            <Link href="/jobs">Find Work</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 hover:shadow-lg transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Earnings</p>
                <h3 className="text-2xl font-bold">${stats.earnings}</h3>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Briefcase className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Jobs</p>
                <h3 className="text-2xl font-bold">{stats.activeJobs}</h3>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Submitted Proposals</p>
                <h3 className="text-2xl font-bold">{stats.proposals}</h3>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Available Connects</p>
                <h3 className="text-2xl font-bold">{stats.connects}</h3>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Recent Proposals</h2>
              <Button variant="ghost" size="sm">
                View All <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {/* Add proposal list here */}
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Active Jobs</h2>
              <Button variant="ghost" size="sm">
                View All <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {/* Add active jobs list here */}
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}