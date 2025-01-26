// src/app/api/profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbconnect from '@/lib/db/connect';
import { authOptions } from '../auth/[...nextauth]/option';
import UserModel from '@/lib/db/model/user.model';

export async function POST(req: NextRequest) {
  try {
    await dbconnect();
    
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const body = await req.json();
    
    const user = await UserModel.findOneAndUpdate(
      { email: session.user.email },
      { 
        $set: { 
          profile: {
            title: body.title,
            location: body.location,
            about: body.about,
            hourlyRate: body.hourlyRate,
            availableHoursPerWeek: body.availableHoursPerWeek,
            skills: body.skills,
            portfolio: body.portfolio,
            languages: body.languages
          }
        }
      },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user.profile, { status: 200 });
  } catch (error) {
    console.error('Profile creation error:', error);
    return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbconnect();
    
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const user = await UserModel.findOne({ email: session.user.email });
    if (!user || !user.profile) {
      return NextResponse.json(null, { status: 404 });
    }

    return NextResponse.json(user.profile, { status: 200 });
  } catch (error) {
    console.error('Profile retrieval error:', error);
    return NextResponse.json({ error: 'Failed to retrieve profile' }, { status: 500 });
  }
}