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
        background: 'linear-gradient(45deg, #8c45d3, #30e1ad)',
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
          background: 'linear-gradient(45deg, #8c45d3, #30e1ad)',
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
          background: 'linear-gradient(45deg, #6f32b0, #8c45d3)',
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-300 shadow-lg">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/5974076634749323973.jpg"
                  alt="PLAYZA Logo"
                  fill
                  className="object-cover rounded-full border-2 border-[#8c45d3]"
                />
              </div>
              <div
                className="text-2xl font-black font-inter tracking-wider"
                style={{
                  color: '#8c45d3',
                  textShadow: '2px 2px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000',
                  WebkitTextStroke: '1.5px #000',
                  letterSpacing: '0.02em'
                }}
              >
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
                  className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-[#8c45d3] flex items-center justify-center transition-all duration-300 hover:scale-110"
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
                  className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-[#30e1ad] flex items-center justify-center transition-all duration-300 hover:scale-110"
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
                    className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-[#8c45d3] flex items-center justify-center transition-all duration-300"
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
                    className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-[#30e1ad] flex items-center justify-center transition-all duration-300"
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
        className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 pt-20 sm:pt-24"
        style={{ background: 'linear-gradient(135deg, #f4f4f4 0%, #ffffff 100%)' }}
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
          <h1
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black mb-6 sm:mb-8 tracking-tight font-inter"
            style={{
              color: '#8c45d3',
              textShadow: '4px 4px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000',
              WebkitTextStroke: '3px #000',
              letterSpacing: '0.02em'
            }}
          >
            PLAYZA
          </h1>

          {/* Welcome Text */}
          <p
            className="text-xl sm:text-2xl md:text-3xl mb-6 sm:mb-8 max-w-3xl leading-relaxed font-inter font-black px-2 text-center"
            style={{
              color: '#000',
              textShadow: '2px 2px 0px rgba(140, 69, 211, 0.3)',
              letterSpacing: '0.03em'
            }}
          >
            The Meme Revolution on <span
              className="inline-block px-4 py-1 rounded-lg font-black"
              style={{
                background: 'linear-gradient(135deg, #8c45d3 0%, #30e1ad 100%)',
                color: '#fff',
                border: '3px solid #000',
                boxShadow: '4px 4px 0px #000',
                textShadow: 'none',
                letterSpacing: '0.05em'
              }}
            >SOLANA</span>
          </p>

          {/* Description */}
          <p
            className="text-base sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-2xl leading-relaxed font-inter px-2 text-center font-semibold"
            style={{
              color: '#1a1a1a',
              letterSpacing: '0.02em'
            }}
          >
            PLAYZA isn't just another token — it's the <span style={{ color: '#8c45d3', fontWeight: 900 }}>meme-powered fuel</span> for the next wave of fun and community vibes on the <span style={{ color: '#8c45d3', fontWeight: 900 }}>SOLANA</span> blockchain.
          </p>

          {/* Get Started Button */}
          <button
            className="text-lg sm:text-xl font-black px-10 sm:px-14 md:px-16 py-4 sm:py-5 rounded-xl transition-all duration-300 transform hover:scale-105 mb-8 sm:mb-10 font-inter relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #8c45d3 0%, #30e1ad 100%)',
              color: '#ffffff',
              border: '4px solid #000',
              boxShadow: '6px 6px 0px #000',
              letterSpacing: '0.1em',
              textShadow: '1px 1px 0px rgba(0,0,0,0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '8px 8px 0px #000';
              e.currentTarget.style.transform = 'translate(-2px, -2px) scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '6px 6px 0px #000';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            GET STARTED
          </button>

          {/* Contract Address Copy Section */}
          <div
            className="rounded-2xl p-6 sm:p-8 w-full max-w-2xl relative"
            style={{
              background: 'linear-gradient(135deg, rgba(140, 69, 211, 0.15) 0%, rgba(48, 225, 173, 0.15) 100%)',
              border: '3px solid #000',
              boxShadow: '8px 8px 0px #000'
            }}
          >
            <p
              className="text-sm font-black mb-4 font-inter text-center uppercase tracking-wider"
              style={{
                color: '#000',
                letterSpacing: '0.15em'
              }}
            >
              Contract Address
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
              <code
                className="font-mono text-xs sm:text-sm md:text-base px-4 py-3 rounded-lg min-h-[48px] flex items-center w-full sm:min-w-[280px] md:min-w-[435px] break-all text-center font-bold"
                style={{
                  background: '#fff',
                  color: '#000',
                  border: '3px solid #000',
                  boxShadow: '4px 4px 0px #000',
                  letterSpacing: '0.05em'
                }}
              >
                {contractAddress || 'No address set'}
              </code>
              <button
                onClick={copyToClipboard}
                className="px-6 py-3 rounded-lg font-black transition-all duration-200 font-inter w-full sm:w-auto uppercase tracking-wider"
                style={{
                  background: copySuccess ? 'linear-gradient(135deg, #30e1ad 0%, #10B981 100%)' : 'linear-gradient(135deg, #8c45d3 0%, #30e1ad 100%)',
                  color: '#ffffff',
                  border: '3px solid #000',
                  boxShadow: '4px 4px 0px #000',
                  letterSpacing: '0.1em'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translate(-2px, -2px)';
                  e.currentTarget.style.boxShadow = '6px 6px 0px #000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translate(0, 0)';
                  e.currentTarget.style.boxShadow = '4px 4px 0px #000';
                }}
              >
                {copySuccess ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden" style={{ background: '#f4f4f4' }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Why PLAYZA Section */}
          <div id="features" className="mb-16 sm:mb-24 md:mb-32">
            <div className="bg-white rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl border-2 border-gray-200">
              <div className="text-center mb-8 sm:mb-12">
                <div className="inline-block px-6 py-2 rounded-full mb-6" style={{ background: 'linear-gradient(135deg, #8c45d3 0%, #30e1ad 100%)' }}>
                  <span className="text-white font-bold text-sm tracking-wider uppercase">Features</span>
                </div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-black mb-4 font-inter">
                  Why PLAYZA?
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-6">
                  <div
                    className="flex items-start gap-4 p-6 rounded-xl transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, rgba(140, 69, 211, 0.08) 0%, rgba(48, 225, 173, 0.08) 100%)',
                      border: '3px solid #000',
                      boxShadow: '4px 4px 0px #000'
                    }}
                  >
                    <div
                      className="w-4 h-4 rounded-sm mt-1 flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, #8c45d3 0%, #30e1ad 100%)',
                        border: '2px solid #000',
                        boxShadow: '2px 2px 0px #000'
                      }}
                    ></div>
                    <p className="font-inter text-lg leading-relaxed font-bold" style={{ color: '#000', letterSpacing: '0.02em' }}>
                      Built on <span
                        className="inline-block px-2 py-0.5 rounded font-black"
                        style={{
                          background: 'linear-gradient(135deg, #8c45d3 0%, #30e1ad 100%)',
                          color: '#fff',
                          border: '2px solid #000',
                          boxShadow: '2px 2px 0px #000',
                          letterSpacing: '0.05em',
                          fontSize: '0.95em'
                        }}
                      >SOLANA</span>, the fastest-growing chain for meme culture
                    </p>
                  </div>
                  <div
                    className="flex items-start gap-4 p-6 rounded-xl transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, rgba(140, 69, 211, 0.08) 0%, rgba(48, 225, 173, 0.08) 100%)',
                      border: '3px solid #000',
                      boxShadow: '4px 4px 0px #000'
                    }}
                  >
                    <div
                      className="w-4 h-4 rounded-sm mt-1 flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, #8c45d3 0%, #30e1ad 100%)',
                        border: '2px solid #000',
                        boxShadow: '2px 2px 0px #000'
                      }}
                    ></div>
                    <p className="font-inter text-lg leading-relaxed font-bold" style={{ color: '#000', letterSpacing: '0.02em' }}>
                      100% community-driven — no boring suits, just pure memes
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div
                    className="flex items-start gap-4 p-6 rounded-xl transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, rgba(140, 69, 211, 0.08) 0%, rgba(48, 225, 173, 0.08) 100%)',
                      border: '3px solid #000',
                      boxShadow: '4px 4px 0px #000'
                    }}
                  >
                    <div
                      className="w-4 h-4 rounded-sm mt-1 flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, #8c45d3 0%, #30e1ad 100%)',
                        border: '2px solid #000',
                        boxShadow: '2px 2px 0px #000'
                      }}
                    ></div>
                    <p className="font-inter text-lg leading-relaxed font-bold" style={{ color: '#000', letterSpacing: '0.02em' }}>
                      A token where fun meets utility — memes, games, raffles, and more
                    </p>
                  </div>
                  <div
                    className="flex items-start gap-4 p-6 rounded-xl transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, rgba(140, 69, 211, 0.08) 0%, rgba(48, 225, 173, 0.08) 100%)',
                      border: '3px solid #000',
                      boxShadow: '4px 4px 0px #000'
                    }}
                  >
                    <div
                      className="w-4 h-4 rounded-sm mt-1 flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, #8c45d3 0%, #30e1ad 100%)',
                        border: '2px solid #000',
                        boxShadow: '2px 2px 0px #000'
                      }}
                    ></div>
                    <p className="font-inter text-lg leading-relaxed font-bold" style={{ color: '#000', letterSpacing: '0.02em' }}>
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
                  <div className="inline-block px-6 py-2 rounded-full mb-6" style={{ background: 'linear-gradient(135deg, #8c45d3 0%, #30e1ad 100%)' }}>
                    <span className="text-white font-bold text-sm tracking-wider uppercase">Vision</span>
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
                  <div className="inline-block px-6 py-2 rounded-full mb-6" style={{ background: 'linear-gradient(135deg, #8c45d3 0%, #30e1ad 100%)' }}>
                    <span className="text-white font-bold text-sm tracking-wider uppercase">Mission</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black mb-6 font-inter">
                    Join the Movement
                  </h2>
                </div>
                <div className="text-center space-y-4">
                  <p className="font-inter text-lg md:text-xl leading-relaxed font-bold" style={{ color: '#000', letterSpacing: '0.02em' }}>
                    Buy, trade, meme, and play with <span style={{ color: '#8c45d3', fontWeight: 900 }}>PLAYZA</span>. Together we'll take <span
                      className="inline-block px-2 py-0.5 rounded font-black"
                      style={{
                        background: 'linear-gradient(135deg, #8c45d3 0%, #30e1ad 100%)',
                        color: '#fff',
                        border: '2px solid #000',
                        boxShadow: '2px 2px 0px #000',
                        letterSpacing: '0.05em',
                        fontSize: '0.95em'
                      }}
                    >SOLANA</span> meme culture to the moon.
                  </p>
                  <p className="font-inter text-lg md:text-xl leading-relaxed font-bold" style={{ color: '#000', letterSpacing: '0.02em' }}>
                    Follow us, join our Telegram, and become a true <span style={{ color: '#8c45d3', fontWeight: 900 }}>PLAYZER</span> today!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div id="links" className="text-center">
            <div className="mb-12">
              <div className="inline-block px-6 py-2 rounded-full mb-6" style={{ background: 'linear-gradient(135deg, #8c45d3 0%, #30e1ad 100%)' }}>
                <span className="text-white font-bold text-sm tracking-wider uppercase">Connect</span>
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
                <div className="bg-white rounded-3xl p-10 border-2 border-gray-200 shadow-xl hover:border-[#8c45d3] hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
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
                <div className="bg-white rounded-3xl p-10 border-2 border-gray-200 shadow-xl hover:border-[#30e1ad] hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                  <div className="flex flex-col items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-[#30e1ad] flex items-center justify-center">
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