import { NextRequest, NextResponse } from 'next/server';
import { compress } from 'compress-pdf';
import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files are supported.' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'pdf-compress-'));
    const inputPath = path.join(tempDir, file.name);
    await fs.writeFile(inputPath, buffer);

    let compressedBuffer: Buffer;
    try {
      compressedBuffer = await compress(inputPath, {
        resolution: 'ebook',
        compatibilityLevel: 1.4
      });
    } catch (err) {
      await fs.unlink(inputPath);
      await fs.rmdir(tempDir);
      return NextResponse.json({ error: 'Failed to compress PDF.' }, { status: 500 });
    }

    await fs.unlink(inputPath);
    await fs.rmdir(tempDir);

    return new NextResponse(compressedBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="compressed.pdf"',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
