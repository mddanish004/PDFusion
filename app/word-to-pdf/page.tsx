"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import FileUpload, { DropZone, FileError, FileList, FileInfo } from "@/components/ui/file-upload";
import { Progress } from "@/components/ui/progress";

const WordToPdf = () => {
  const [uploadFiles, setUploadFiles] = useState<FileInfo[]>([]);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const onFileSelectChange = (files: FileInfo[]) => {
    setUploadFiles(files);
    if (pdfUrl) {
      resetConvert();
    }
  };

  const onRemove = (fileId: string) => {
    setUploadFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
  };

  const handleConvert = async () => {
    setConverting(true);
    setProgress(0);
    setPdfUrl(null);

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
      if (uploadFiles[0]?.file) {
        formData.append("file", uploadFiles[0].file, uploadFiles[0].name);
      }

      const res = await fetch("/word-to-pdf/api/convert", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to convert Word to PDF");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      clearInterval(progressInterval);
      setProgress(100);
      setPdfUrl(url);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      alert(`Error: ${errorMessage}`);
      resetConvert();
    } finally {
      setConverting(false);
    }
  };

  const handleDownload = () => {
    if (pdfUrl) {
      const a = document.createElement("a");
      a.href = pdfUrl;
      a.download = "converted.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  };

  const resetConvert = () => {
    setProgress(0);
    setPdfUrl((prevUrl) => {
      if (prevUrl) {
        window.URL.revokeObjectURL(prevUrl);
      }
      return null;
    });
    setConverting(false);
  };

  const clearAllFiles = () => {
    setUploadFiles([]);
    resetConvert();
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
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Word to PDF Converter
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Convert Word documents to professional PDF files. Perfect for sharing and printing.
            </p>
          </div>

          <FileUpload
            files={uploadFiles}
            onFileSelectChange={onFileSelectChange}
            multiple={false}
            accept=".docx"
            maxSize={20}
            maxCount={1}
            className="space-y-6"
            disabled={converting || progress > 0}
            appendFiles={false}
          >
            <DropZone
              className="!border-gray-300 bg-gray-50 hover:border-red-500 hover:bg-red-50/50 p-12"
              prompt={
                <div className="flex flex-col items-center gap-4 text-gray-500">
                  <Upload className="h-12 w-12" />
                  <span className="text-lg">Drop your Word file here or click to browse</span>
                </div>
              }
            />
            <FileError />
            {uploadFiles.length > 0 && (
              <div className="space-y-4">
                <FileList 
                  onClear={clearAllFiles} 
                  onRemove={onRemove}
                  canRemove={true}
                  canReorder={false}
                />
                {(converting || progress > 0) && (
                  <div className="space-y-3 p-4 border rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {progress < 100 ? 'Converting Word...' : 'Conversion Complete!'}
                      </span>
                      <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="w-full" />
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  {!pdfUrl ? (
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-8"
                      onClick={handleConvert}
                      disabled={converting || uploadFiles.length < 1}
                    >
                      {converting ? 'Converting...' : 'Convert to PDF'}
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-700 text-white px-8 font-bold shadow-lg border-0 hover:scale-105 hover:shadow-xl transition-transform duration-200"
                      onClick={handleDownload}
                    >
                      Download PDF File
                    </Button>
                  )}
                  {pdfUrl && (
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto bg-white px-8"
                      onClick={clearAllFiles}
                    >
                      Convert Another File
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

export default WordToPdf; 