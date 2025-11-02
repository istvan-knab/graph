"use client";

import Link from 'next/link';

export default function BoxPlot() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: '#86B2AB' }}>
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8">
          <span className="text-white">Box Plot</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8">
          Understand data distribution with statistical analysis
        </p>
        <Link 
          href="/features"
          className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
        >
          Back to Features
        </Link>
      </div>
    </main>
  );
}
