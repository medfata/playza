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
        background: 'linear-gradient(45deg, #ecc64b, #f4d76e)',
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
          background: 'linear-gradient(45deg, #ecc64b, #f4d76e)',
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
          background: 'linear-gradient(45deg, #d4a82f, #ecc64b)',
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
          delay: Math.random() * 10,
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/5965021228781652892.jpg"
                  alt="PLAYZA Logo"
                  fill
                  className="object-cover rounded-full border-2 border-black"
                />
              </div>
              <div className="text-2xl font-black text-white font-inter tracking-wider">
                PLAYZA
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('features')}
                className="text-white/80 hover:text-white font-inter font-medium transition-all duration-300 hover:scale-105"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('vision')}
                className="text-white/80 hover:text-white font-inter font-medium transition-all duration-300 hover:scale-105"
              >
                Vision
              </button>
              <button
                onClick={() => scrollToSection('links')}
                className="text-white/80 hover:text-white font-inter font-medium transition-all duration-300 hover:scale-105"
              >
                Links
              </button>

              {/* Social Icons */}
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/20">
                <a
                  href="https://x.com/PLAYZZZZZA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
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
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Image
                    src="/social/telegram-svgrepo-com.svg"
                    alt="Telegram"
                    width={18}
                    height={18}
                    className="filter brightness-0 invert"
                  />
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/10">
              <div className="flex flex-col gap-4 pt-4">
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-white/80 hover:text-white font-inter font-medium transition-all duration-300 text-left"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection('vision')}
                  className="text-white/80 hover:text-white font-inter font-medium transition-all duration-300 text-left"
                >
                  Vision
                </button>
                <button
                  onClick={() => scrollToSection('links')}
                  className="text-white/80 hover:text-white font-inter font-medium transition-all duration-300 text-left"
                >
                  Links
                </button>

                {/* Mobile Social Icons */}
                <div className="flex items-center gap-4 pt-4 mt-4 border-t border-white/10">
                  <a
                    href="https://x.com/PLAYZZZZZA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300"
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
                    className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300"
                  >
                    <Image
                      src="/social/telegram-svgrepo-com.svg"
                      alt="Telegram"
                      width={20}
                      height={20}
                      className="filter brightness-0 invert"
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
        style={{ backgroundColor: '#286254' }}
      >
        {/* Background Images */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/5965021228781652892.jpg"
            alt="Background"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="absolute bottom-10 right-10 w-36 h-36 opacity-30 z-0">
          <Image
            src="/images/5965021228781652894.jpg"
            alt="Wojak 2"
            fill
            className="object-cover rounded-full"
          />
        </div>

        <div className="absolute bottom-32 right-32 w-28 h-28 opacity-25 z-0">
          <Image
            src="/images/5965021228781652892.jpg"
            alt="Wojak 3"
            fill
            className="object-cover rounded-full"
          />
        </div>

        <div className="absolute top-1/2 right-16 w-24 h-24 opacity-25 z-0">
          <Image
            src="/images/5965021228781652895.jpg"
            alt="Wojak 4"
            fill
            className="object-cover rounded-full"
          />
        </div>

        {/* Matching images on the left bottom side */}
        <div className="absolute bottom-10 left-10 w-36 h-36 opacity-30 z-0">
          <Image
            src="/images/5965021228781652893.jpg"
            alt="Wojak 4"
            fill
            className="object-cover rounded-full"
          />
        </div>

        <div className="absolute bottom-32 left-32 w-28 h-28 opacity-25 z-0">
          <Image
            src="/images/5965021228781652895.jpg"
            alt="Wojak 5"
            fill
            className="object-cover rounded-full"
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
            className="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] xl:text-[12rem] font-black text-white mb-6 sm:mb-8 tracking-wider sm:tracking-widest drop-shadow-2xl font-inter"
            style={{
              textShadow: '0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(236, 198, 75, 0.2)',
              letterSpacing: '0.05em'
            }}
          >
            PLAYZA
          </h1>

          {/* Welcome Text */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white mb-6 sm:mb-8 max-w-4xl leading-relaxed drop-shadow-lg font-inter font-medium px-2">
            Welcome to PLAYZA – The Meme Revolution on Plasma
          </p>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-8 sm:mb-12 max-w-3xl leading-relaxed drop-shadow-lg font-inter opacity-90 px-2">
            PLAYZA isn't just another token — it's the meme-powered fuel for the next wave of fun and community vibes on the Plasma blockchain.
          </p>

          {/* Get Started Button */}
          <button
            className="text-lg sm:text-xl font-semibold px-8 sm:px-12 md:px-16 py-4 sm:py-5 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl mb-6 sm:mb-8 font-inter w-full sm:w-auto max-w-xs"
            style={{
              backgroundColor: '#ecc64b',
              color: '#286254',
              boxShadow: '0 15px 40px rgba(236, 198, 75, 0.4)'
            }}
          >
            GET STARTED
          </button>

          {/* Contract Address Copy Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 w-full max-w-2xl">
            <p className="text-white text-sm mb-3 opacity-80 font-inter text-center">Contract Address:</p>
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
              <code className="text-white font-mono text-xs sm:text-sm md:text-base bg-black/30 px-3 sm:px-4 py-2 rounded-lg min-h-[40px] flex items-center w-full sm:min-w-[280px] md:min-w-[435px] break-all text-center">
                {contractAddress}
              </code>
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 font-inter w-full sm:w-auto"
                style={{
                  backgroundColor: copySuccess ? '#10B981' : '#ecc64b',
                  color: '#286254'
                }}
              >
                {copySuccess ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
        {/* Modern gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#286254] via-[#1e4a3f] to-[#0f2419]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ecc64b]/5 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Why PLAYZA Section */}
          <div id="features" className="mb-16 sm:mb-24 md:mb-32">
            <div className="relative group">
              {/* Background glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#ecc64b]/20 via-[#ecc64b]/10 to-[#ecc64b]/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>

              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-16 border border-white/20 shadow-2xl">
                <div className="text-center mb-8 sm:mb-12">
                  <div className="inline-block px-4 sm:px-6 py-2 bg-gradient-to-r from-[#ecc64b] to-[#f4d76e] rounded-full mb-4 sm:mb-6">
                    <span className="text-[#286254] font-bold text-xs sm:text-sm tracking-wider uppercase">Features</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 font-inter bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    Why PLAYZA?
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
                  <div className="space-y-4 sm:space-y-6 md:space-y-8">
                    <div className="group/item flex items-start gap-3 sm:gap-4 md:gap-6 p-4 sm:p-5 md:p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-[#ecc64b] to-[#f4d76e] mt-2 sm:mt-3 group-hover/item:scale-125 transition-transform duration-300 flex-shrink-0"></div>
                      <p className="text-white font-inter text-base sm:text-lg md:text-xl leading-relaxed">
                        Built on Plasma, the fastest-growing chain for meme culture
                      </p>
                    </div>
                    <div className="group/item flex items-start gap-3 sm:gap-4 md:gap-6 p-4 sm:p-5 md:p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-[#ecc64b] to-[#f4d76e] mt-2 sm:mt-3 group-hover/item:scale-125 transition-transform duration-300 flex-shrink-0"></div>
                      <p className="text-white font-inter text-base sm:text-lg md:text-xl leading-relaxed">
                        100% community-driven — no boring suits, just pure memes
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4 sm:space-y-6 md:space-y-8">
                    <div className="group/item flex items-start gap-3 sm:gap-4 md:gap-6 p-4 sm:p-5 md:p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-[#ecc64b] to-[#f4d76e] mt-2 sm:mt-3 group-hover/item:scale-125 transition-transform duration-300 flex-shrink-0"></div>
                      <p className="text-white font-inter text-base sm:text-lg md:text-xl leading-relaxed">
                        A token where fun meets utility — memes, games, raffles, and more
                      </p>
                    </div>
                    <div className="group/item flex items-start gap-3 sm:gap-4 md:gap-6 p-4 sm:p-5 md:p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-[#ecc64b] to-[#f4d76e] mt-2 sm:mt-3 group-hover/item:scale-125 transition-transform duration-300 flex-shrink-0"></div>
                      <p className="text-white font-inter text-base sm:text-lg md:text-xl leading-relaxed">
                        Strong, united, and playful community we call the PLAYZERS
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vision & Mission Section */}
          <div id="vision" className="mb-16 sm:mb-24 md:mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
              {/* Vision */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#ecc64b]/20 to-transparent rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-white/20 shadow-2xl h-full">
                  <div className="text-center mb-6 sm:mb-8">
                    <div className="inline-block px-4 sm:px-6 py-2 bg-gradient-to-r from-[#ecc64b] to-[#f4d76e] rounded-full mb-4 sm:mb-6">
                      <span className="text-[#286254] font-bold text-xs sm:text-sm tracking-wider uppercase">Vision</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6 font-inter bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                      Our Vision
                    </h2>
                  </div>
                  <p className="text-white/90 font-inter text-base sm:text-lg md:text-xl leading-relaxed text-center">
                    PLAYZA is here to show that meme coins aren't just a joke — they're the heartbeat of crypto culture. We're building a space where laughter, creativity, and community drive value.
                  </p>
                </div>
              </div>

              {/* Mission */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-l from-[#ecc64b]/20 to-transparent rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-white/20 shadow-2xl h-full">
                  <div className="text-center mb-6 sm:mb-8">
                    <div className="inline-block px-4 sm:px-6 py-2 bg-gradient-to-r from-[#ecc64b] to-[#f4d76e] rounded-full mb-4 sm:mb-6">
                      <span className="text-[#286254] font-bold text-xs sm:text-sm tracking-wider uppercase">Mission</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6 font-inter bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                      Join the Movement
                    </h2>
                  </div>
                  <div className="text-center space-y-3 sm:space-y-4">
                    <p className="text-white/90 font-inter text-base sm:text-lg md:text-xl leading-relaxed">
                      Buy, trade, meme, and play with PLAYZA. Together we'll take Plasma meme culture to the moon.
                    </p>
                    <p className="text-white/90 font-inter text-base sm:text-lg md:text-xl leading-relaxed">
                      Follow us, join our Telegram, and become a true PLAYZER today!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div id="links" className="text-center">
            <div className="mb-8 sm:mb-12">
              <div className="inline-block px-4 sm:px-6 py-2 bg-gradient-to-r from-[#ecc64b] to-[#f4d76e] rounded-full mb-4 sm:mb-6">
                <span className="text-[#286254] font-bold text-xs sm:text-sm tracking-wider uppercase">Connect</span>
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white font-inter bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Connect with PLAYZA
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-12 justify-center items-center">
              <a
                href="https://x.com/PLAYZZZZZA"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full sm:w-auto max-w-xs"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-[#1DA1F2]/30 to-[#1DA1F2]/10 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-white/20 shadow-2xl group-hover:scale-105 transition-all duration-300 w-full sm:min-w-[250px]">
                  <div className="flex flex-col items-center gap-4 sm:gap-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-white flex items-center justify-center shadow-2xl p-2 sm:p-3">
                      <Image
                        src="/social/X_icon.svg"
                        alt="X"
                        width={36}
                        height={36}
                        className="sm:w-[42px] sm:h-[42px]"
                      />
                    </div>
                    <div className="text-center">
                      <h4 className="text-xl sm:text-2xl font-bold text-white font-inter mb-1 sm:mb-2">X</h4>
                      <p className="text-white/70 font-inter text-sm sm:text-base">Follow us for updates</p>
                    </div>
                  </div>
                </div>
              </a>

              <a
                href="https://t.me/playzzzza"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full sm:w-auto max-w-xs"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-[#0088cc]/30 to-[#0088cc]/10 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-white/20 shadow-2xl group-hover:scale-105 transition-all duration-300 w-full sm:min-w-[250px]">
                  <div className="flex flex-col items-center gap-4 sm:gap-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#0088cc] to-[#006699] flex items-center justify-center shadow-2xl p-2 sm:p-3">
                      <Image
                        src="/social/telegram-svgrepo-com.svg"
                        alt="Telegram"
                        width={36}
                        height={36}
                        className="filter brightness-0 invert sm:w-[42px] sm:h-[42px]"
                      />
                    </div>
                    <div className="text-center">
                      <h4 className="text-xl sm:text-2xl font-bold text-white font-inter mb-1 sm:mb-2">Telegram</h4>
                      <p className="text-white/70 font-inter text-sm sm:text-base">Join our community</p>
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