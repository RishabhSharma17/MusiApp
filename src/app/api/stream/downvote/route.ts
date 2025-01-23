import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { z } from 'zod';
import { getServerSession } from "next-auth";
import { next_Options } from "../../auth/[...nextauth]/option";

const downvoteSchema = z.object({
    streamId: z.string(),
});

export async function POST(request:NextRequest) {
    const session = await getServerSession(next_Options);
    const user = await prisma.user.findFirst({
        where: {
            email: session?.user?.email ?? "",
        }
    });
    if (!user) {
        return NextResponse.json({ message: "Unauthenticated" },{status:411});
    }
    try {
        const body = downvoteSchema.parse(await request.json());
        const downvote = await prisma.upvote.delete({
            where:{
                userId_streamId:{
                    userId: user.id,
                    streamId: body.streamId,
                }
            }
        });

        return NextResponse.json({
            message: "Downvoted successfully",
        },{
            status:200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Error while downvoting the stream",
        },{
            status:500
        })
    }
}