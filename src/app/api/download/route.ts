import { NextResponse } from 'next/server'; 
import ytdl from 'ytdl-core'; // ytdl-core para baixar vídeos do YouTube
import { Readable } from 'stream'; //  módulo nativo 'stream' do Node.js

export async function POST(req: Request) {
  try {
    const body = await req.text(); 
    const videoUrl = body.trim(); 

    // Verifica se a URL do vídeo não foi fornecida ou não é válida
    if (!videoUrl || !ytdl.validateURL(videoUrl)) {
      return NextResponse.json({ message: 'Invalid YouTube URL' }, { status: 400 }); 
    }

    // Obtém um fluxo de áudio do vídeo do YouTube usando ytdl-core
    const audioStream: Readable = ytdl(videoUrl, { filter: 'audioonly', quality: 'highestaudio' }) as Readable;

    // Convertendo o Readable para um Buffer
    const chunks: Uint8Array[] = [];
    for await (const chunk of audioStream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Criando um Blob a partir do Buffer, que será a resposta do download
    // windows type: audio/mpeg 
    // pendrive: audio/mp3
    // mac: audio/m4a
    const blob = new Blob([buffer], { type: 'audio/mp4' });

    // Retorna uma nova resposta HTTP com o Blob como corpo
    return new Response(blob, {
      headers: {
        'Content-Disposition': 'attachment; filename="audio.mp3"', // Define o nome do arquivo para download
      },
    });
  } catch (error) {
    console.error(error); 
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 }); 
  }
}