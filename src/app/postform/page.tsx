'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

interface PostJobFormProps {
  onSuccess?: () => void;
}

export function PostJobForm({ onSuccess }: PostJobFormProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      techStack: formData.get("techStack")?.toString().split(",").map(t => t.trim()),
      budget: {
        min: Number(formData.get("minBudget")),
        max: Number(formData.get("maxBudget"))
      }
    };

    try {
      await axios.post("/api/jobs", data);
      toast({
        title: "Success",
        description: "Job posted successfully",
      });
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post job",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Job Title</label>
        <Input name="title" required />
      </div>
      
      <div>
        <label className="text-sm font-medium">Description</label>
        <Textarea name="description" required />
      </div>
      
      <div>
        <label className="text-sm font-medium">Required Skills (comma-separated)</label>
        <Input name="techStack" required />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Min Budget ($)</label>
          <Input name="minBudget" type="number" required />
        </div>
        <div>
          <label className="text-sm font-medium">Max Budget ($)</label>
          <Input name="maxBudget" type="number" required />
        </div>
      </div>
      
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Posting..." : "Post Job"}
      </Button>
    </form>
  );
}