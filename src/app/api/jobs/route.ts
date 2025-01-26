import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/connect";
import JobModel from "@/lib/db/model/job.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const page = Number(req.nextUrl.searchParams.get("page")) || 1;
    const limit = 10;
    const search = req.nextUrl.searchParams.get("search") || "";
    const minBudget = Number(req.nextUrl.searchParams.get("minBudget")) || 0;
    const maxBudget = Number(req.nextUrl.searchParams.get("maxBudget")) || Infinity;

    const query = {
      ...(search && {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { techStack: { $in: [new RegExp(search, "i")] } }
        ]
      }),
      "budget.min": { $gte: minBudget },
      ...(maxBudget < Infinity && { "budget.max": { $lte: maxBudget } })
    };

    const jobs = await JobModel.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("postedBy", "name image");

    const total = await JobModel.countDocuments(query);

    return NextResponse.json({
      jobs,
      hasMore: total > page * limit,
      total
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await req.json();
    const job = await JobModel.create({
      ...body,
      postedBy: session.user.id
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}