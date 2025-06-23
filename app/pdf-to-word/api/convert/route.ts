import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';
import AsposePdf from 'asposepdfnodejs';

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
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'pdf-to-word-'));
    const inputPath = path.join(tempDir, file.name);
    await fs.writeFile(inputPath, buffer);

    const outputName = file.name.replace(/\.pdf$/i, '') + '-' + Date.now() + '.docx';
    const outputPath = path.join(tempDir, outputName);

    const AsposePdfModule = await AsposePdf();
    const result = AsposePdfModule.AsposePdfToDocX(inputPath, outputPath);

    if (result.errorCode !== 0) {
      await fs.unlink(inputPath);
      await fs.rmdir(tempDir);
      return NextResponse.json({ error: result.errorText || 'Failed to convert PDF to DOCX.' }, { status: 500 });
    }

    const docxBuffer = await fs.readFile(outputPath);

    await fs.unlink(inputPath);
    await fs.unlink(outputPath);
    await fs.rmdir(tempDir);

    return new NextResponse(docxBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename="converted.docx"',
      },
    });
  } catch (error: any) {
    console.error('PDF to Word conversion error:', error?.message || error);
    return NextResponse.json({ error: error?.message || 'Internal server error.' }, { status: 500 });
  }
} 
