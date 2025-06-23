"use client";
import { useState } from "react";
import { ChevronDown, FileText, FileImage, Download, Upload, Zap, Shield, Menu, X } from "lucide-react";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPdfDropdownOpen, setIsPdfDropdownOpen] = useState(false);
  const [isConverterDropdownOpen, setIsConverterDropdownOpen] = useState(false);

  const pdfTools = [
    { name: "Merge PDF", path: "/merge-pdf", description: "Combine multiple PDF files into one" },
    { name: "Compress PDF", path: "/compress-pdf", description: "Reduce PDF file size without quality loss" },
    { name: "PDF to Word", path: "/pdf-to-word", description: "Convert PDF documents to editable Word files" },
  ];

  const conversionTools = [
    { name: "Word to PDF", path: "/word-to-pdf", description: "Convert Word documents to PDF format" },
  ];

  const allTools = [
    {
      icon: FileText,
      title: "Merge PDF",
      description: "Combine multiple PDF files into a single document effortlessly",
      path: "/merge-pdf",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: Zap,
      title: "Compress PDF",
      description: "Reduce file size while maintaining document quality",
      path: "/compress-pdf",
      color: "bg-green-50 text-green-600"
    },
    {
      icon: FileImage,
      title: "PDF to Word",
      description: "Convert PDF documents to editable Word format",
      path: "/pdf-to-word",
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: Download,
      title: "Word to PDF",
      description: "Convert Word documents to professional PDF files",
      path: "/word-to-pdf",
      color: "bg-red-50 text-red-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] sm:w-auto max-w-4xl bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-full px-3 sm:px-6 py-2 sm:py-3 shadow-lg border border-gray-200">
        <div className="flex items-center justify-between sm:justify-center sm:space-x-8">
          <a href="/" className="flex items-center font-bold text-lg sm:text-xl text-gray-900 whitespace-nowrap">
            <img
              src="/pentastudio.svg"
              alt="PDFusion Logo"
              className="h-7 w-7 sm:h-8 sm:w-8 mr-2"
            />
            PDFusion
          </a>
          <div className="hidden lg:flex items-center space-x-6">
            <div className="relative">
              <button 
                onClick={() => setIsPdfDropdownOpen(!isPdfDropdownOpen)}
                className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
              >
                PDF Tools
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {isPdfDropdownOpen && (
                <div className="absolute top-full mt-2 left-0 bg-white shadow-lg border border-gray-200 rounded-lg py-2 min-w-48">
                  {pdfTools.map((tool) => (
                    <a
                      key={tool.name}
                      href={tool.path}
                      className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                      onClick={() => setIsPdfDropdownOpen(false)}
                    >
                      {tool.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <button 
                onClick={() => setIsConverterDropdownOpen(!isConverterDropdownOpen)}
                className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
              >
                Converters
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {isConverterDropdownOpen && (
                <div className="absolute top-full mt-2 left-0 bg-white shadow-lg border border-gray-200 rounded-lg py-2 min-w-48">
                  {conversionTools.map((tool) => (
                    <a
                      key={tool.name}
                      href={tool.path}
                      className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                      onClick={() => setIsConverterDropdownOpen(false)}
                    >
                      {tool.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <a
              href="https://fire-waitress-333.notion.site/Md-Danish-Ansari-1c22d928bee580bfb078ff2fb176accb"
              className="text-gray-700 hover:text-gray-900 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              About the Creator
            </a>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-gray-900 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-gray-200">
            <div className="space-y-3">
              <div>
                <div className="font-medium text-gray-900 mb-2 text-sm">PDF Tools</div>
                <div className="space-y-1 pl-3">
                  {pdfTools.map((tool) => (
                    <a
                      key={tool.name}
                      href={tool.path}
                      className="block py-1 text-sm text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {tool.name}
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-medium text-gray-900 mb-2 text-sm">Converters</div>
                <div className="space-y-1 pl-3">
                  {conversionTools.map((tool) => (
                    <a
                      key={tool.name}
                      href={tool.path}
                      className="block py-1 text-sm text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {tool.name}
                    </a>
                  ))}
                </div>
              </div>
              <a
                href="/about"
                className="block py-1 text-sm text-gray-600 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                About the Creator
              </a>
            </div>
          </div>
        )}
      </nav>
      <section className="pt-32 sm:pt-40 lg:pt-48 pb-12 sm:pb-16 lg:pb-20 px-3 sm:px-4 lg:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Complete PDF
            <br className="sm:hidden" />
            <span className="text-blue-600"> Tool Suite</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
            Everything you need to work with PDF files. Merge, compress, convert, and optimize your PDFs 
            with our comprehensive suite of professional tools. Secure, reliable, and completely free.
          </p>
          <div className="flex justify-center px-4">
            <button 
              onClick={() => document.getElementById('tools-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 sm:px-8 py-3 sm:py-3 text-sm sm:text-base rounded-full font-medium transition-colors"
            >
              View All PDF Tools
            </button>
          </div>
        </div>
      </section>
      <section id="tools-section" className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 lg:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Professional PDF Tools for Every Need
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
              Complete PDF workflow solutions. Whether you need to merge documents, reduce file sizes, 
              or convert between formats, we have the perfect PDF tool for you.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {allTools.map((tool, index) => (
              <div
                key={tool.title}
                className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl ${tool.color} flex items-center justify-center mb-4 sm:mb-6`}>
                  <tool.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                  {tool.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed flex-grow">
                  {tool.description}
                </p>
                <div className="mt-auto">
                  <a href={tool.path} className="block w-full">
                    <button className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-lg sm:rounded-xl py-2.5 sm:py-3 text-sm sm:text-base font-medium transition-colors">
                      Try Now
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 lg:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Why Choose Our PDF Tools?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
              Built specifically for PDF workflows with enterprise-grade security and outstanding performance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Efficient PDF Processing</h3>
              <p className="text-sm sm:text-base text-gray-600">Optimized algorithms process your PDF files quickly and smoothly</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">PDF Security & Privacy</h3>
              <p className="text-sm sm:text-base text-gray-600">Your PDF files are processed securely and automatically deleted after use</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <FileImage className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Perfect PDF Quality</h3>
              <p className="text-sm sm:text-base text-gray-600">Maintain formatting, fonts, and layout integrity in every PDF operation</p>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-gray-900 text-white py-8 sm:py-12 px-3 sm:px-4 lg:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">PDF Tools</h3>
          <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">
            Professional PDF solutions for everyone
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {pdfTools.map((tool) => (
              <a
                key={tool.name}
                href={tool.path}
                className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors"
              >
                {tool.name}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
