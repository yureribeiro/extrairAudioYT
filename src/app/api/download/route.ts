import { NextResponse } from 'next/server';
import * as ytdl from 'ytdl-core';

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const videoUrl = body.trim();
    
    if (!videoUrl) {
      throw new Error("No video url provided");
    }

    const videoInfo = await ytdl.getInfo(videoUrl);
    const audioFormats = ytdl.filterFormats(videoInfo.formats, "audioonly");
    const audioUrls = audioFormats.map((item) => item.url);
    const firstUrl = audioUrls[0];

    return NextResponse.json({ firstUrl }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}