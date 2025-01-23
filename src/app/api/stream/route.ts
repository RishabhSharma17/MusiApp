import prisma from "@/lib/db";
import { z } from 'zod';
import { NextRequest, NextResponse } from "next/server";
import  youtubesearchapi from 'youtube-search-api';
export const YT_REGEX = /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com\/(?:watch\?(?!.*\blist=)(?:.*&)?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[?&]\S+)?$/;

const createStreamSchema = z.object({
    userId : z.string(),
    url : z.string(),
});


export async function POST(req:NextRequest){
    try {
        const body = createStreamSchema.parse(await req.json());

        const isYt = body.url.match(YT_REGEX);

        if(!isYt){
            return NextResponse.json({
                message: "Invalid URL!"
            },{
                status:411
            });
        }
        
        const extractedId = body.url.split("?v=")[1];
        const res = await youtubesearchapi.GetVideoDetails(extractedId);
        const thumbnails = res.thumbnail.thumbnails;
        thumbnails.sort((a: {width: number},b: {width:number}) => a.width < b.width ? -1 : 1); 
        const stream = await prisma.stream.create({
            data:{
                userId: body.userId,
                url: body.url,
                extractedId,
                type:"YOUTUBE",
                title:res.title ?? "Can't find video",
                smallImg: (thumbnails.length > 1 ? thumbnails[thumbnails.length -2].url : 
                    thumbnails[thumbnails.length -1].url) ?? "https://imgs.search.brave.com/wK4hyfn015D7LkZMNbCMWjwApWcAQsnnA3SlucKQL_g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cmQuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIxLzA0L0dl/dHR5SW1hZ2VzLTkz/NjE3NjU0Ni5qcGc",
                bigImg: thumbnails[thumbnails.length -1].url ?? "https://imgs.search.brave.com/wK4hyfn015D7LkZMNbCMWjwApWcAQsnnA3SlucKQL_g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cmQuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIxLzA0L0dl/dHR5SW1hZ2VzLTkz/NjE3NjU0Ni5qcGc"
            }
            
        })

        return NextResponse.json({
            message:"Added new stream",
            id: stream.id
        })

    } catch (error) {
        console.log(" Error states : ",error);
        return NextResponse.json({
            message: "Error while adding a Stream!"
        },{
            status:411
        });
    }
}

export async function GET(request: NextRequest){
    try {
        const userID = request.nextUrl.searchParams.get("userId");
        const stream = await prisma.stream.findMany({
            where:{
                userId: userID || "",
            }
        });
        return NextResponse.json({
            message:"Fetched all streams",
            data: stream
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Error while fetching a Stream!"
        },{
            status:411
        });
    }
}