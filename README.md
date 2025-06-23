# 📄 PDFlex - Complete PDF Tool Suite

<div align="center">


**Professional PDF workflow solutions for everyone**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)


</div>

---

## 🚀 Overview

PDFlex is a modern, comprehensive PDF tool suite built with Next.js 14 and TypeScript. It provides secure and user-friendly solutions for all your PDF workflow needs, from merging and compressing to format conversion.

### ✨ Key Features

- **🔄 PDF Merge** - Combine multiple PDF files into a single document
- **📦 PDF Compression** - Reduce file size while maintaining quality
- **📝 PDF to Word** - Convert PDF documents to editable Word files
- **📄 Word to PDF** - Transform Word documents to professional PDFs
- **🔒 Secure Processing** - Client-side processing with automatic file deletion
- **📱 Fully Responsive** - Works seamlessly across all devices

## 🛠️ Tech Stack

**Frontend:**
- [Next.js 14](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide React](https://lucide.dev/) - Beautiful & consistent icons
- [Shadcn/ui](https://ui.shadcn.com/) - High-quality UI components


## 📦 Installation

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pdflex.git
   cd pdflex
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Run type checking
npm run type-check
```

### Project Structure

```
pdflex/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Homepage
│   ├── merge-pdf/        # PDF merge tool
│   ├── compress-pdf/     # PDF compression tool
│   ├── pdf-to-word/      # PDF to Word converter
│   └── word-to-pdf/      # Word to PDF converter
├── components/            # Reusable components
│   ├── ui/               # UI components (shadcn/ui)
│   └── ...
├── lib/                  # Utility functions
├── public/               # Static assets
├── types/                # TypeScript type definitions
└── ...
```

## 🌟 Features Deep Dive

### PDF Merge
- Combine multiple PDF files seamlessly
- Drag & drop interface

### PDF Compression
- Advanced compression algorithms
- Quality preservation options
- Size reduction up to 90%
- Lossless compression available

### Format Conversion
- **PDF to Word**: Maintains formatting and layout
- **Word to PDF**: Professional output quality
- **Batch conversion**: Process multiple files
- **Format preservation**: Fonts, images, and styling intact

### Security & Privacy
- **Client-side processing**: Files never leave your device
- **Automatic cleanup**: Temporary files deleted immediately
- **No data collection**: Zero tracking or analytics
- **GDPR compliant**: Privacy-first approach

## 📱 Responsive Design

PDFlex is built with a mobile-first approach, ensuring optimal experience across:

- **Mobile phones** (320px and up)
- **Tablets** (768px and up)
- **Laptops** (1024px and up)
- **Desktops** (1440px and up)
- **Ultra-wide displays** (1920px and up)

## 🎨 Customization

### Theming

The application uses Tailwind CSS with custom design tokens:

```css
/* Custom color palette */
:root {
  --primary: #2563eb;
  --secondary: #64748b;
  --accent: #8b5cf6;
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
}
```

### Adding New Tools

1. Create a new route in the `app` directory
2. Add the tool configuration to `lib/tools.ts`
3. Update navigation components
4. Implement the tool's UI and logic

