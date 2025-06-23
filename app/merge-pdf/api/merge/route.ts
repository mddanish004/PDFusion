import { NextRequest, NextResponse } from 'next/server';
import PDFMerger from 'pdf-merger-js';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];
    
    console.log(`Received ${files.length} files for merging`);
    
    if (!files || files.length < 2) {
      return NextResponse.json({ error: 'Please upload at least two PDF files.' }, { status: 400 });
    }

    if (files.length > 20) {
      return NextResponse.json({ error: 'Too many files. Maximum 20 PDFs allowed.' }, { status: 400 });
    }

    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    const maxSize = 100 * 1024 * 1024;
    
    if (totalSize > maxSize) {
      return NextResponse.json({ 
        error: `Total file size (${(totalSize / 1024 / 1024).toFixed(2)}MB) exceeds limit of 100MB` 
      }, { status: 400 });
    }

    console.log(`Total file size: ${(totalSize / 1024 / 1024).toFixed(2)}MB`);

    const fileBuffers = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(`Processing file ${i + 1}/${files.length}: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)`);
      
      try {
        const arrayBuffer = await file.arrayBuffer();
        fileBuffers.push(new Uint8Array(arrayBuffer));
      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error);
        return NextResponse.json({ 
          error: `Failed to process file: ${file.name}` 
        }, { status: 400 });
      }
    }

    console.log('Starting PDF merger...');
    const merger = new PDFMerger();
    
    for (let i = 0; i < fileBuffers.length; i++) {
      try {
        console.log(`Adding file ${i + 1}/${fileBuffers.length} to merger`);
        await merger.add(fileBuffers[i]);
      } catch (error) {
        console.error(`Error adding file ${i + 1} to merger:`, error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ 
          error: `Failed to add file ${i + 1} to merger: ${errorMessage}` 
        }, { status: 500 });
      }
    }
    
    console.log('Generating merged PDF buffer...');
    const mergedPdfBuffer = await merger.saveAsBuffer();
    console.log(`Merged PDF size: ${(mergedPdfBuffer.length / 1024 / 1024).toFixed(2)}MB`);

    return new NextResponse(mergedPdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="merged.pdf"',
      },
    });
  } catch (error) {
    console.error('PDF merge error:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    if (errorMessage.includes('memory')) {
      return NextResponse.json({ 
        error: 'Not enough memory to merge these files. Try with fewer files.' 
      }, { status: 500 });
    }
    
    if (errorMessage.includes('corrupt') || errorMessage.includes('invalid')) {
      return NextResponse.json({ 
        error: 'One or more PDF files are corrupted or invalid.' 
      }, { status: 400 });
    }
    
    return NextResponse.json({ 
      error: `Failed to merge PDFs: ${errorMessage}` 
    }, { status: 500 });
  }
}
