import React, { useEffect, useState } from 'react';
import { Shield, Activity, Zap, Wifi, Bluetooth, ChevronRight } from 'lucide-react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    const phases = [
      { delay: 0, phase: 0 },      // Initial load
      { delay: 1000, phase: 1 },   // Chip appears
      { delay: 2500, phase: 2 },   // Circuit animation
      { delay: 4000, phase: 3 },   // Data streams
      { delay: 5500, phase: 4 },   // Text overlay
      { delay: 7000, phase: 5 },   // Final state
    ];

    phases.forEach(({ delay, phase }) => {
      setTimeout(() => setAnimationPhase(phase), delay);
    });

    // Show skip button after 2 seconds
    setTimeout(() => setShowSkip(true), 2000);

    // Auto-complete after 8 seconds
    const autoComplete = setTimeout(() => onComplete(), 8000);

    return () => clearTimeout(autoComplete);
  }, [onComplete]);

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative h-full flex items-center justify-center">
        
        {/* 3D CGM Chip Container */}
        <div className="relative">
          
          {/* Main Chip Body */}
          <div className={`relative transition-all duration-2000 ${
            animationPhase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}>
            
            {/* Chip Base */}
            <div className="relative w-80 h-80 mx-auto">
              
              {/* Chip Substrate */}
              <div className={`absolute inset-4 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl shadow-2xl border border-slate-600 transition-all duration-1000 ${
                animationPhase >= 1 ? 'animate-float' : ''
              }`}>
                
                {/* Circuit Patterns */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  {/* Horizontal Traces */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={`h-${i}`}
                      className={`absolute h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent transition-all duration-1000 ${
                        animationPhase >= 2 ? 'opacity-80 animate-pulse-slow' : 'opacity-0'
                      }`}
                      style={{
                        top: `${15 + i * 10}%`,
                        left: '10%',
                        right: '10%',
                        animationDelay: `${i * 200}ms`
                      }}
                    />
                  ))}
                  
                  {/* Vertical Traces */}
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={`v-${i}`}
                      className={`absolute w-0.5 bg-gradient-to-b from-transparent via-blue-400 to-transparent transition-all duration-1000 ${
                        animationPhase >= 2 ? 'opacity-80 animate-pulse-slow' : 'opacity-0'
                      }`}
                      style={{
                        left: `${20 + i * 12}%`,
                        top: '15%',
                        bottom: '15%',
                        animationDelay: `${i * 300}ms`
                      }}
                    />
                  ))}
                </div>

                {/* Sensor Array */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className={`w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg transition-all duration-1000 ${
                    animationPhase >= 2 ? 'animate-glow' : ''
                  }`}>
                    <div className="absolute inset-2 bg-gradient-to-br from-cyan-400 to-blue-500 rounded opacity-80 animate-pulse" />
                    <div className="absolute inset-4 bg-white rounded opacity-60" />
                  </div>
                </div>

                {/* Connection Pads */}
                {[...Array(12)].map((_, i) => (
                  <div
                    key={`pad-${i}`}
                    className={`absolute w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full transition-all duration-500 ${
                      animationPhase >= 2 ? 'opacity-100 animate-pulse' : 'opacity-0'
                    }`}
                    style={{
                      top: i < 6 ? '5%' : '90%',
                      left: `${15 + (i % 6) * 12}%`,
                      transform: 'translate(-50%, -50%)',
                      animationDelay: `${i * 100}ms`
                    }}
                  />
                ))}
              </div>

              {/* Chip Package */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-600/20 to-slate-800/40 rounded-3xl border-2 border-slate-500/30 backdrop-blur-sm" />
              
              {/* Chip Label */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-mono text-slate-300 opacity-80">
                CGM-BIOMEMS-2024
              </div>
            </div>
          </div>

          {/* Data Stream Animations */}
          {animationPhase >= 3 && (
            <div className="absolute inset-0 pointer-events-none">
              {/* Outgoing Data Streams */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={`stream-${i}`}
                  className="absolute w-px h-20 bg-gradient-to-t from-blue-400 to-transparent animate-data-flow"
                  style={{
                    left: `${30 + i * 15}%`,
                    top: '-20px',
                    animationDelay: `${i * 300}ms`
                  }}
                />
              ))}
              
              {/* Circular Data Rings */}
              {[...Array(3)].map((_, i) => (
                <div
                  key={`ring-${i}`}
                  className="absolute border border-blue-400/30 rounded-full animate-ping"
                  style={{
                    width: `${200 + i * 100}px`,
                    height: `${200 + i * 100}px`,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    animationDelay: `${i * 500}ms`,
                    animationDuration: '3s'
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Floating Icons */}
        {animationPhase >= 3 && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Insulin Pump Icon */}
            <div className="absolute top-1/4 left-1/4 animate-float-delayed">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 border border-white/20">
                <Activity className="w-8 h-8 text-green-400" />
              </div>
            </div>
            
            {/* Security Shield */}
            <div className="absolute top-1/3 right-1/4 animate-float-delayed-2">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 border border-white/20">
                <Shield className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            
            {/* Network Connectivity */}
            <div className="absolute bottom-1/3 left-1/3 animate-float-delayed-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 border border-white/20">
                <Wifi className="w-8 h-8 text-purple-400" />
              </div>
            </div>
            
            {/* Bluetooth */}
            <div className="absolute bottom-1/4 right-1/3 animate-float-delayed-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 border border-white/20">
                <Bluetooth className="w-8 h-8 text-cyan-400" />
              </div>
            </div>
          </div>
        )}

        {/* Text Overlay */}
        {animationPhase >= 4 && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              SecureGluco
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-2">
              Secure Glucose Monitoring & Threat Detection
            </p>
            <p className="text-lg text-slate-400 mb-8">
              Protecting Your Health with Advanced BioMEMS Technology
            </p>
            
            {animationPhase >= 5 && (
              <button
                onClick={onComplete}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl animate-bounce-subtle"
              >
                Enter Dashboard
                <ChevronRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        )}

        {/* Skip Button */}
        {showSkip && (
          <button
            onClick={handleSkip}
            className="absolute top-8 right-8 text-slate-400 hover:text-white transition-colors duration-300 text-sm font-medium animate-fade-in"
          >
            Skip Animation
          </button>
        )}
      </div>
    </div>
  );
};