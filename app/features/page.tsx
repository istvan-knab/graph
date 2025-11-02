"use client";

import Link from 'next/link';
import { GraphIQCarouselDemo } from "@/components/GraphIQCarouselDemo";

export default function Features() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#86B2AB' }}>
      {/* Header with graphIQ label */}
      <header className="pt-8 pb-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            <span className="text-white">graph</span>
            <span className="text-black">IQ</span>
          </h1>
        </div>
      </header>

      {/* Navigation */}
      <nav className="flex justify-center mb-8">
        <Link 
          href="/" 
          className="px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors mr-4"
        >
          Home
        </Link>
        <Link 
          href="/features" 
          className="px-6 py-2 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-colors"
        >
          Features
        </Link>
      </nav>

      {/* Carousel Section */}
      <GraphIQCarouselDemo />
    </main>
  );
}
