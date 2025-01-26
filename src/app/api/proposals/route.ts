import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/connect";
import ProposalModel from "@/lib/db/model/proposal.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const proposals = await ProposalModel.find({ userId: session.user.id })
      .populate('jobId')
      .sort({ createdAt: -1 });

    return NextResponse.json(proposals);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch proposals" }, { status: 500 });
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
    const proposal = await ProposalModel.create({
      ...body,
      userId: session.user.id
    });

    return NextResponse.json(proposal, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create proposal" }, { status: 500 });
  }
}