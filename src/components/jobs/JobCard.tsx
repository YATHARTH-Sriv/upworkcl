import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, DollarSign, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ProposalForm } from "@/components/proposals/ProposalForm";

interface JobCardProps {
  job: {
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
  };
  onApplySuccess?: () => void;
}

export function JobCard({ job, onApplySuccess }: JobCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-all border-l-4 border-l-transparent hover:border-l-blue-500">
      <div className="flex justify-between">
        <div>
          <h3 className="text-xl font-semibold hover:text-blue-600 transition-colors">
            {job.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              <span className="font-medium">${job.budget.min} - ${job.budget.max}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{new Date(job.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      
      <p className="mt-4 text-gray-600 line-clamp-2">{job.description}</p>
      
      <div className="flex flex-wrap gap-2 mt-4">
        {job.techStack.map((tech) => (
          <Badge 
            key={tech} 
            variant="secondary"
            className="bg-blue-50 text-blue-700 hover:bg-blue-100"
          >
            {tech}
          </Badge>
        ))}
      </div>
      
      <div className="flex items-center justify-between mt-6 pt-4 border-t">
        <div className="flex items-center gap-2">
          <img
            src={job.postedBy.image || "/placeholder.svg"}
            alt={job.postedBy.name}
            className="h-8 w-8 rounded-full"
          />
          <span className="text-sm font-medium">{job.postedBy.name}</span>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Apply Now</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Proposal</DialogTitle>
            </DialogHeader>
            <ProposalForm jobId={job._id} onSuccess={onApplySuccess} />
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
}