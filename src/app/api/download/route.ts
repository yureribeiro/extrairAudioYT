import { NextResponse } from 'next/server'; // Importação do módulo NextResponse para lidar com respostas HTTP no Next.js
import ytdl from 'ytdl-core'; // Importação do módulo ytdl-core para baixar vídeos do YouTube
import { Readable } from 'stream'; // Importação da classe Readable do módulo nativo 'stream' do Node.js

export async function POST(req: Request) {
  try {
    const body = await req.text(); // Obtém o corpo da requisição como texto
    const videoUrl = body.trim(); // Remove espaços em branco do início e do fim do texto

    // Verifica se a URL do vídeo não foi fornecida ou não é válida
    if (!videoUrl || !ytdl.validateURL(videoUrl)) {
      return NextResponse.json({ message: 'Invalid YouTube URL' }, { status: 400 }); // Retorna uma resposta JSON com status 400 (Bad Request) se a URL for inválida
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
    const blob = new Blob([buffer], { type: 'audio/mpeg' });

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