'use client';

import Image from "next/image";
import { useState, useEffect } from "react";

// Rose component with CSS-in-JS styling
const Rose = ({ delay, duration, left }: { delay: number; duration: number; left: string }) => (
  <div
    className="absolute pointer-events-none"
    style={{
      left,
      top: '-60px',
      animation: `rosefall ${duration}s linear ${delay}s infinite`,
      zIndex: 5,
    }}
  >
    <div
      style={{
        width: '32px',
        height: '32px',
        background: 'linear-gradient(45deg, #f5bf02, #ffd700)',
        borderRadius: '50% 0 50% 50%',
        border: '3px solid #000',
        transform: 'rotate(-45deg)',
        position: 'relative',
        filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
      }}
    >
      {/* Rose petals */}
      <div
        style={{
          position: 'absolute',
          top: '-6px',
          left: '-6px',
          width: '20px',
          height: '20px',
          background: 'linear-gradient(45deg, #f5bf02, #ffd700)',
          borderRadius: '50% 0 50% 50%',
          border: '2px solid #000',
          transform: 'rotate(90deg)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '6px',
          left: '6px',
          width: '16px',
          height: '16px',
          background: 'linear-gradient(45deg, #d4a82f, #f5bf02)',
          borderRadius: '50% 0 50% 50%',
          border: '2px solid #000',
          transform: 'rotate(180deg)',
        }}
      />
    </div>
  </div>
);

export default function Home() {
  const [copySuccess, setCopySuccess] = useState(false);
  const [roses, setRoses] = useState<Array<{ id: number; delay: number; duration: number; left: string }>>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contractAddress, setContractAddress] = useState("");

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    // Generate random roses
    const generateRoses = () => {
      const newRoses = [];
      for (let i = 0; i < 15; i++) {
        newRoses.push({
          id: i,
          delay: 0, // Start immediately
          duration: 8 + Math.random() * 4, // 8-12 seconds
          left: Math.random() * 100 + '%',
        });
      }
      setRoses(newRoses);
    };

    generateRoses();
  }, []);

  // Fetch contract address on component mount
  useEffect(() => {
    const fetchContractAddress = async () => {
      try {
        const response = await fetch('/api/contract');
        if (response.ok) {
          const data = await response.json();
          setContractAddress(data.contractAddress || '');
        }
      } catch (error) {
        console.error('Failed to fetch contract address:', error);
      }
    };

    fetchContractAddress();
  }, []);

  return (
    <>
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/5965021228781652892.jpg"
                  alt="PLAYZA Logo"
                  fill
                  className="object-cover rounded-full border-2 border-[#f5bf02]"
                />
              </div>
              <div className="text-2xl font-black text-black font-inter tracking-wider">
                PLAYZA
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('features')}
                className="text-gray-700 hover:text-black font-inter font-medium transition-all duration-300"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('vision')}
                className="text-gray-700 hover:text-black font-inter font-medium transition-all duration-300"
              >
                Vision
              </button>
              <button
                onClick={() => scrollToSection('links')}
                className="text-gray-700 hover:text-black font-inter font-medium transition-all duration-300"
              >
                Links
              </button>

              {/* Social Icons */}
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-300">
                <a
                  href="https://x.com/PLAYZZZZZA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-[#f5bf02] flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Image
                    src="/social/X_icon.svg"
                    alt="X"
                    width={18}
                    height={18}
                    className=""
                  />
                </a>
                <a
                  href="https://t.me/playzzzza"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-[#f5bf02] flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Image
                    src="/social/telegram-svgrepo-com.svg"
                    alt="Telegram"
                    width={18}
                    height={18}
                    className="filter brightness-0"
                  />
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-black p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <div className="flex flex-col gap-4 pt-4">
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-gray-700 hover:text-black font-inter font-medium transition-all duration-300 text-left"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection('vision')}
                  className="text-gray-700 hover:text-black font-inter font-medium transition-all duration-300 text-left"
                >
                  Vision
                </button>
                <button
                  onClick={() => scrollToSection('links')}
                  className="text-gray-700 hover:text-black font-inter font-medium transition-all duration-300 text-left"
                >
                  Links
                </button>

                {/* Mobile Social Icons */}
                <div className="flex items-center gap-4 pt-4 mt-4 border-t border-gray-200">
                  <a
                    href="https://x.com/PLAYZZZZZA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-[#f5bf02] flex items-center justify-center transition-all duration-300"
                  >
                    <Image
                      src="/social/X_icon.svg"
                      alt="X"
                      width={20}
                      height={20}
                      className=""
                    />
                  </a>
                  <a
                    href="https://t.me/playzzzza"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-[#f5bf02] flex items-center justify-center transition-all duration-300"
                  >
                    <Image
                      src="/social/telegram-svgrepo-com.svg"
                      alt="Telegram"
                      width={20}
                      height={20}
                      className="filter brightness-0"
                    />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 pt-20 sm:pt-24 bg-white"
      >
        {/* Background Images */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/5965021228781652892.jpg"
            alt="Background"
            fill
            className="object-cover opacity-5"
            priority
          />
        </div>

        {/* Falling Roses Animation */}
        {roses.map((rose) => (
          <Rose
            key={rose.id}
            delay={rose.delay}
            duration={rose.duration}
            left={rose.left}
          />
        ))}

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-4">
          {/* Large Heading */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-black mb-6 sm:mb-8 tracking-tight font-inter">
            PLAYZA
          </h1>

          {/* Welcome Text */}
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-800 mb-6 sm:mb-8 max-w-3xl leading-relaxed font-inter font-bold px-2 text-center">
            The Meme Revolution on BNB
          </p>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-12 max-w-2xl leading-relaxed font-inter px-2 text-center">
            PLAYZA isn't just another token — it's the meme-powered fuel for the next wave of fun and community vibes on the BNB blockchain.
          </p>

          {/* Get Started Button */}
          <button
            className="text-lg sm:text-xl font-bold px-10 sm:px-14 md:px-16 py-4 sm:py-5 rounded-2xl transition-all duration-300 transform hover:scale-105 mb-8 sm:mb-10 font-inter shadow-lg hover:shadow-xl"
            style={{
              backgroundColor: '#f5bf02',
              color: '#000000'
            }}
          >
            GET STARTED
          </button>

          {/* Contract Address Copy Section */}
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border-2 border-gray-200 w-full max-w-2xl shadow-sm">
            <p className="text-gray-700 text-sm font-semibold mb-4 font-inter text-center">Contract Address</p>
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
              <code className="text-gray-800 font-mono text-xs sm:text-sm md:text-base bg-white px-4 py-3 rounded-xl border border-gray-300 min-h-[48px] flex items-center w-full sm:min-w-[280px] md:min-w-[435px] break-all text-center font-medium">
                {contractAddress || 'No address set'}
              </code>
              <button
                onClick={copyToClipboard}
                className="px-6 py-3 rounded-xl font-bold transition-all duration-200 hover:scale-105 font-inter w-full sm:w-auto shadow-sm border-2"
                style={{
                  backgroundColor: copySuccess ? '#10B981' : '#f5bf02',
                  color: '#000000',
                  borderColor: copySuccess ? '#10B981' : '#000000'
                }}
              >
                {copySuccess ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden bg-gray-50">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Why PLAYZA Section */}
          <div id="features" className="mb-16 sm:mb-24 md:mb-32">
            <div className="bg-white rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl border-2 border-gray-200">
              <div className="text-center mb-8 sm:mb-12">
                <div className="inline-block px-6 py-2 bg-[#f5bf02] rounded-full mb-6">
                  <span className="text-black font-bold text-sm tracking-wider uppercase">Features</span>
                </div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-black mb-4 font-inter">
                  Why PLAYZA?
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-gray-50 border-2 border-gray-200 hover:border-[#f5bf02] transition-all duration-300">
                    <div className="w-3 h-3 rounded-full bg-[#f5bf02] mt-2 flex-shrink-0"></div>
                    <p className="text-gray-800 font-inter text-lg leading-relaxed font-medium">
                      Built on BNB, the fastest-growing chain for meme culture
                    </p>
                  </div>
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-gray-50 border-2 border-gray-200 hover:border-[#f5bf02] transition-all duration-300">
                    <div className="w-3 h-3 rounded-full bg-[#f5bf02] mt-2 flex-shrink-0"></div>
                    <p className="text-gray-800 font-inter text-lg leading-relaxed font-medium">
                      100% community-driven — no boring suits, just pure memes
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-gray-50 border-2 border-gray-200 hover:border-[#f5bf02] transition-all duration-300">
                    <div className="w-3 h-3 rounded-full bg-[#f5bf02] mt-2 flex-shrink-0"></div>
                    <p className="text-gray-800 font-inter text-lg leading-relaxed font-medium">
                      A token where fun meets utility — memes, games, raffles, and more
                    </p>
                  </div>
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-gray-50 border-2 border-gray-200 hover:border-[#f5bf02] transition-all duration-300">
                    <div className="w-3 h-3 rounded-full bg-[#f5bf02] mt-2 flex-shrink-0"></div>
                    <p className="text-gray-800 font-inter text-lg leading-relaxed font-medium">
                      Strong, united, and playful community we call the PLAYZERS
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vision & Mission Section */}
          <div id="vision" className="mb-16 sm:mb-24 md:mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Vision */}
              <div className="bg-white rounded-3xl p-8 sm:p-10 md:p-12 shadow-xl border-2 border-gray-200">
                <div className="text-center mb-8">
                  <div className="inline-block px-6 py-2 bg-[#f5bf02] rounded-full mb-6">
                    <span className="text-black font-bold text-sm tracking-wider uppercase">Vision</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black mb-6 font-inter">
                    Our Vision
                  </h2>
                </div>
                <p className="text-gray-700 font-inter text-lg md:text-xl leading-relaxed text-center">
                  PLAYZA is here to show that meme coins aren't just a joke — they're the heartbeat of crypto culture. We're building a space where laughter, creativity, and community drive value.
                </p>
              </div>

              {/* Mission */}
              <div className="bg-white rounded-3xl p-8 sm:p-10 md:p-12 shadow-xl border-2 border-gray-200">
                <div className="text-center mb-8">
                  <div className="inline-block px-6 py-2 bg-[#f5bf02] rounded-full mb-6">
                    <span className="text-black font-bold text-sm tracking-wider uppercase">Mission</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black mb-6 font-inter">
                    Join the Movement
                  </h2>
                </div>
                <div className="text-center space-y-4">
                  <p className="text-gray-700 font-inter text-lg md:text-xl leading-relaxed">
                    Buy, trade, meme, and play with PLAYZA. Together we'll take BNB meme culture to the moon.
                  </p>
                  <p className="text-gray-700 font-inter text-lg md:text-xl leading-relaxed">
                    Follow us, join our Telegram, and become a true PLAYZER today!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div id="links" className="text-center">
            <div className="mb-12">
              <div className="inline-block px-6 py-2 bg-[#f5bf02] rounded-full mb-6">
                <span className="text-black font-bold text-sm tracking-wider uppercase">Connect</span>
              </div>
              <h3 className="text-4xl sm:text-5xl md:text-6xl font-black text-black font-inter">
                Connect with PLAYZA
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <a
                href="https://x.com/PLAYZZZZZA"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto max-w-sm"
              >
                <div className="bg-white rounded-3xl p-10 border-2 border-gray-200 shadow-xl hover:border-[#f5bf02] hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                  <div className="flex flex-col items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center">
                      <Image
                        src="/social/X_icon.svg"
                        alt="X"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="text-center">
                      <h4 className="text-2xl font-bold text-black font-inter mb-2">X (Twitter)</h4>
                      <p className="text-gray-600 font-inter">Follow us for updates</p>
                    </div>
                  </div>
                </div>
              </a>

              <a
                href="https://t.me/playzzzza"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto max-w-sm"
              >
                <div className="bg-white rounded-3xl p-10 border-2 border-gray-200 shadow-xl hover:border-[#f5bf02] hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                  <div className="flex flex-col items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-[#0088cc] flex items-center justify-center">
                      <Image
                        src="/social/telegram-svgrepo-com.svg"
                        alt="Telegram"
                        width={40}
                        height={40}
                        className="filter brightness-0 invert"
                      />
                    </div>
                    <div className="text-center">
                      <h4 className="text-2xl font-bold text-black font-inter mb-2">Telegram</h4>
                      <p className="text-gray-600 font-inter">Join our community</p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}