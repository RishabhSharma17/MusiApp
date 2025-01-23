import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { z } from 'zod';
import { getServerSession } from "next-auth";
import { next_Options } from "../../auth/[...nextauth]/option";


const upvoteSchema = z.object({
    streamId: z.string(),
});

export async function POST(request: NextRequest) {
    const session = await getServerSession(next_Options);
    
    if (!session) {
        return NextResponse.json({
            message: "Unauthorized"
        }, {
            status: 401
        });
    }

    const olduser = await prisma.user.findFirst({
        where: {
            email: session?.user?.email ?? "",
        }
    });

    if(!olduser){
        return NextResponse.json({
            message: "User not found!",
        });
    }
    try {

        const body = upvoteSchema.parse(await request.json());

        await prisma.upvote.create({
            data:{
                userId: olduser.id ?? "1",
                streamId: body.streamId,
            }
        });

        return NextResponse.json({
            message: "Upvoted!"
        },{
            status:200,
        });

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Error while upvoting!"
        });
    }
}