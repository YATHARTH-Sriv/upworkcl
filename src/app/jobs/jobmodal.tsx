import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, Clock, MapPin } from "lucide-react";

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

interface JobDetailsModalProps {
  job: Job;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ job, open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{job.title}</DialogTitle>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              ${job.budget.min} - ${job.budget.max}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Posted {new Date(job.createdAt).toLocaleDateString()}
            </div>
          </div>
        </DialogHeader>
        
        <DialogDescription className="mt-4">
          <p className="text-base text-foreground">{job.description}</p>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {job.techStack.map((tech) => (
              <Badge key={tech} variant="secondary">{tech}</Badge>
            ))}
          </div>
          
          <div className="flex items-center gap-4 mt-6">
            <img
              src={job.postedBy.image || "/placeholder.svg"}
              alt={job.postedBy.name}
              className="h-10 w-10 rounded-full"
            />
              <p className="font-semibold">{job.postedBy.name}</p>
              <p className="text-sm text-muted-foreground">Job Poster</p>
          </div>
        </DialogDescription>
        
        <div className="flex justify-end mt-6 space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          <Button>Apply Now</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};