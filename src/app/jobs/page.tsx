'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ThumbsDown, Heart, DollarSign, Clock, MapPin } from "lucide-react";
import { Footer } from "@/components/Footer";
import { useSession } from "next-auth/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import axios from "axios";
import debounce from 'lodash/debounce';
import { useToast } from "@/hooks/use-toast";
import { PostJobForm } from "../postform/page";
import { JobDetailsModal } from "./jobmodal";

interface Job {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  budget: {
    min: number;
    max: number;
  };
  postedBy: {
    name: string;
    image: string;
  };
  createdAt: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [filters, setFilters] = useState({
    minBudget: "",
    maxBudget: "",
    experienceLevel: ""
  });
  
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const fetchJobs = async (reset = false) => {
    try {
      const params = new URLSearchParams({
        page: reset ? "1" : page.toString(),
        ...(search && { search }),
        ...(filters.minBudget && { minBudget: filters.minBudget }),
        ...(filters.maxBudget && { maxBudget: filters.maxBudget })
      });

      const response = await axios.get(`/api/jobs?${params}`);
      if (reset || page === 1) {
        setJobs(response.data.jobs);
      } else {
        setJobs(prev => [...prev, ...response.data.jobs]);
      }
      setHasMore(response.data.hasMore);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch jobs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce((value: string) => {
    setSearch(value);
    setPage(1);
    fetchJobs(true);
  }, 500);

  useEffect(() => {
    fetchJobs();
  }, [page]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (page === 1) fetchJobs();
    }, 30000);

    return () => clearInterval(interval);
  }, [page, search, filters]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-10 flex gap-4">
          <Input 
            className="max-w-xl w-full" 
            placeholder="Search jobs by title, skills, or keywords" 
            type="search"
            onChange={(e) => debouncedSearch(e.target.value)}
          />
        </div>
        
        <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Jobs you might like</h1>
                <p className="text-muted-foreground mt-2">Browse jobs that match your experience</p>
              </div>
              {session && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="shadow-md hover:shadow-lg transition-shadow">Post a Job</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Post a New Job</DialogTitle>
                    </DialogHeader>
                    <PostJobForm onSuccess={() => {
                      fetchJobs(true);
                      router.refresh();
                    }} />
                  </DialogContent>
                </Dialog>
              )}
            </div>

            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((n) => (
                  <Card key={n} className="p-6 bg-white shadow-sm">
                    <div className="animate-pulse space-y-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {jobs.map((job) => (
                  <Card 
                    key={job._id} 
                    className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedJob(job)}
                  >
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            ${job.budget.min} - ${job.budget.max}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Posted {new Date(job.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="mt-4 line-clamp-2 text-gray-600">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {job.techStack.map((tech) => (
                        <Badge key={tech} variant="secondary">{tech}</Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4 mt-4">
                      <img
                        src={job.postedBy.image || "/placeholder.svg"}
                        alt={job.postedBy.name}
                        className="h-8 w-8 rounded-full"
                      />
                      <span className="text-sm text-muted-foreground">{job.postedBy.name}</span>
                    </div>
                  </Card>
                ))}
                
                {hasMore && (
                  <Button 
                    variant="outline" 
                    className="w-full mt-6" 
                    onClick={() => setPage(p => p + 1)}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Load More Jobs"}
                  </Button>
                )}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-white shadow-sm">
              <h3 className="font-semibold mb-4 text-gray-800">Filters</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Budget Range</label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Input 
                      placeholder="Min $" 
                      type="number"
                      value={filters.minBudget}
                      onChange={(e) => {
                        setFilters(prev => ({ ...prev, minBudget: e.target.value }));
                        setPage(1);
                        fetchJobs(true);
                      }}
                    />
                    <Input 
                      placeholder="Max $" 
                      type="number"
                      value={filters.maxBudget}
                      onChange={(e) => {
                        setFilters(prev => ({ ...prev, maxBudget: e.target.value }));
                        setPage(1);
                        fetchJobs(true);
                      }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      
      {selectedJob && (
        <JobDetailsModal 
          job={selectedJob} 
          open={!!selectedJob} 
          onOpenChange={() => setSelectedJob(null)} 
        />
      )}
      
      <Footer />
    </div>
  );
}