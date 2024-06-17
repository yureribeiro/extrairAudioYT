import { NextResponse } from 'next/server';
import ytdl from 'ytdl-core';
import { Readable } from 'stream';

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const videoUrl = body.trim();

    if (!videoUrl || !ytdl.validateURL(videoUrl)) {
      return NextResponse.json({ message: 'Invalid YouTube URL' }, { status: 400 });
    }

    const audioStream: Readable = ytdl(videoUrl, { filter: 'audioonly', quality: 'highestaudio' }) as Readable;

    // Convertendo o Readable para um Buffer
    const chunks: Uint8Array[] = [];
    for await (const chunk of audioStream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Criando um Blob a partir do Buffer
    const blob = new Blob([buffer], { type: 'audio/mpeg' });

    return new Response(blob, {
      headers: {
        'Content-Disposition': 'attachment; filename="audio.mp3"',
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}