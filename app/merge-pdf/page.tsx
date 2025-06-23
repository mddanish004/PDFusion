"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, FileText, Upload } from "lucide-react";
import FileUpload, { DropZone, FileError, FileList, FileInfo } from "@/components/ui/file-upload";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const MergePdfPage = () => {
  const [uploadFiles, setUploadFiles] = useState<FileInfo[]>([]);
  const [merging, setMerging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);

  const onFileSelectChange = (files: FileInfo[]) => {
    setUploadFiles(files);
    if (mergedPdfUrl) {
      resetMerge();
    }
  };

  const onRemove = (fileId: string) => {
    setUploadFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
  };

  const onReorder = (files: FileInfo[]) => {
    setUploadFiles(files);
  };

  const handleMerge = async () => {
    setMerging(true);
    setProgress(0);
    setMergedPdfUrl(null);

    try {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const formData = new FormData();
      uploadFiles.forEach((fileInfo) => {
        if (fileInfo.file) {
          formData.append('files', fileInfo.file, fileInfo.name);
        }
      });

      const res = await fetch('/merge-pdf/api/merge', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        let errorMessage = 'Failed to merge PDFs';
        try {
          // Try to parse as JSON
          const errorData = await res.clone().json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          try {
            // If not JSON, try as text
            const errorText = await res.clone().text();
            errorMessage = errorText || errorMessage;
          } catch {
            // If all fails, keep the default message
          }
        }
        throw new Error(errorMessage);
      }

      // Check if the response is a PDF
      const contentType = res.headers.get('Content-Type');
      if (contentType && contentType.includes('application/pdf')) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        clearInterval(progressInterval);
        setProgress(100);
        setMergedPdfUrl(url);
      } else {
        // If not PDF, treat as error
        let errorMessage = 'Failed to merge PDFs';
        try {
          const errorData = await res.clone().json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          try {
            const errorText = await res.clone().text();
            errorMessage = errorText || errorMessage;
          } catch {
            // If all fails, keep the default message
          }
        }
        throw new Error(errorMessage);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      alert(`Error: ${errorMessage}`);
      resetMerge();
    } finally {
      setMerging(false);
    }
  };

  const handleDownload = () => {
    if (mergedPdfUrl) {
      const a = document.createElement('a');
      a.href = mergedPdfUrl;
      a.download = 'merged.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  };

  const resetMerge = () => {
    setProgress(0);
    setMergedPdfUrl((prevUrl) => {
      if (prevUrl) {
        window.URL.revokeObjectURL(prevUrl);
      }
      return null;
    });
    setMerging(false);
  };

  const clearAllFiles = () => {
    setUploadFiles([]);
    resetMerge();
  };


  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="container mx-auto max-w-4xl py-8 px-4">
        <Link href="/">
          <Button variant="ghost" className="mb-8 text-gray-700 hover:bg-gray-100">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Merge PDF Files
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Combine multiple PDF files into a single document. Drag and drop your files or click to upload.
            </p>
          </div>

          <FileUpload
            files={uploadFiles}
            onFileSelectChange={onFileSelectChange}
            multiple={true}
            accept=".pdf"
            maxSize={10}
            maxCount={50}
            className="space-y-6"
            disabled={merging || progress > 0}
            appendFiles={true}
          >
              <DropZone
                className="!border-gray-300 bg-gray-50 hover:border-blue-500 hover:bg-blue-50/50 p-12"
                prompt={
                    <div className="flex flex-col items-center gap-4 text-gray-500">
                        <Upload className="h-12 w-12" />
                        <span className="text-lg">Drop your PDF files here or click to browse</span>
                    </div>
                }
              />
            
              <FileError />

              {uploadFiles.length > 0 && (
                <div className="space-y-4">
                    <FileList 
                        onClear={clearAllFiles} 
                        onRemove={onRemove}
                        onReorder={onReorder}
                        canRemove={true}
                        canReorder={true}
                    />

                    {(merging || progress > 0) && (
                        <div className="space-y-3 p-4 border rounded-lg bg-gray-50">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">
                                    {progress < 100 ? 'Merging PDFs...' : 'Merge Complete!'}
                                </span>
                                <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
                            </div>
                            <Progress value={progress} className="w-full" />
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        {!mergedPdfUrl ? (
                          <Button
                            size="lg"
                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8"
                            onClick={handleMerge}
                            disabled={merging || uploadFiles.length < 2}
                          >
                            {merging ? 'Merging...' : 'Merge PDFs'}
                          </Button>
                        ) : (
                          <Button
                            size="lg"
                            className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 font-bold shadow-lg border-0 hover:scale-105 hover:shadow-xl transition-transform duration-200"
                            onClick={handleDownload}
                          >
                            Download Merged PDF
                          </Button>
                        )}
                        
                        {mergedPdfUrl && (
                          <Button
                            variant="outline"
                            size="lg"
                            className="w-full sm:w-auto bg-white px-8"
                            onClick={clearAllFiles}
                          >
                            Merge More Files
                          </Button>
                        )}
                    </div>
                </div>
              )}
          </FileUpload>

          <div className="text-center text-sm text-gray-500 mt-10">
              Your files are processed securely and deleted after conversion
          </div>
        </div>
      </div>
    </div>
  );
};

export default MergePdfPage;

