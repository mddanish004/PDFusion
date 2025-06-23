import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';
import libre from 'libreoffice-convert';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }
    if (!file.name.match(/\.docx$/i)) {
      return NextResponse.json({ error: 'Only Word .docx files are supported.' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'word-to-pdf-'));
    const inputPath = path.join(tempDir, file.name);
    await fs.writeFile(inputPath, buffer);

    const pdfBuf = await new Promise<Buffer>((resolve, reject) => {
      libre.convert(buffer, '.pdf', undefined, (err, done) => {
        if (err) reject(err);
        else resolve(done as Buffer);
      });
    });

    await fs.unlink(inputPath);
    await fs.rmdir(tempDir);

    return new NextResponse(pdfBuf, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="converted.pdf"',
      },
    });
  } catch (error: any) {
    console.error('Word to PDF conversion error:', error?.message || error);
    return NextResponse.json({ error: error?.message || 'Internal server error.' }, { status: 500 });
  }
}
