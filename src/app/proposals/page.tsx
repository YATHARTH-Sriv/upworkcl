'use client';

import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

interface Proposal {
  _id: string;
  jobId: {
    title: string;
    budget: {
      min: number;
      max: number;
    };
  };
  proposal: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export default function ProposalsPage() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!session) {
      router.push('/login');
      return;
    }

    async function fetchProposals() {
      try {
        const response = await axios.get('/api/proposals');
        setProposals(response.data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch proposals",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchProposals();
  }, [session, router, toast]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">My Proposals</h1>
        
        <div className="space-y-6">
          {proposals.map((proposal) => (
            <Card key={proposal._id} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{proposal.jobId.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Budget: ${proposal.jobId.budget.min} - ${proposal.jobId.budget.max}
                  </p>
                </div>
                <Badge
                  variant={
                    proposal.status === 'accepted' ? 'default' :
                    proposal.status === 'rejected' ? 'destructive' :
                    'secondary'
                  }
                >
                  {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                </Badge>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Your Proposal</h4>
                <p className="text-gray-600">{proposal.proposal}</p>
              </div>
              
              <div className="mt-4 text-sm text-gray-500">
                Submitted on {new Date(proposal.createdAt).toLocaleDateString()}
              </div>
            </Card>
          ))}
          
          {proposals.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No proposals submitted yet</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}