"use client";

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#86B2AB' }}>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-8xl md:text-9xl font-bold tracking-tight">
            <span className="text-white">graph</span>
            <span className="text-black">IQ</span>
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Intelligent graph visualization and analysis platform
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/features"
              className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors text-center"
            >
              Get Started
            </Link>
            <button 
              onClick={() => {
                document.getElementById('about-section')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about-section" className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            About graphIQ
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Discover the power of intelligent graph visualization and analysis
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Our Mission</h3>
              <p className="text-white/90">
                To make graph analysis accessible to everyone through powerful yet intuitive visualization tools.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Our Vision</h3>
              <p className="text-white/90">
                Transform complex data relationships into clear, actionable insights for better decision making.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
