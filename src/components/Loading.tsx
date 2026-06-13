'use client'

import { useEffect, useState } from "react";
import { Loader2, Heart, Activity, Sparkles } from "lucide-react";

type LoadingVariant = 'spinner' | 'pulse' | 'dots' | 'ripple' | 'medical';

interface LoadingProps {
  message: string;
  variant?: LoadingVariant;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

export default function Loading({
  message,
  variant = 'medical',
  size = 'md',
  fullScreen = false
}: LoadingProps) {

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const renderLoader = () => {
    switch (variant) {
      case 'spinner':
        return (
          <div className="relative">
            <div className={`${sizeClasses[size]} rounded-full border-4 border-gray-200`}></div>
            <div className={`${sizeClasses[size]} rounded-full border-4 border-blue-600 border-t-transparent animate-spin absolute top-0 left-0`}></div>
          </div>
        );

      case 'pulse':
        return (
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'} bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse`}
                style={{ animationDelay: `${i * 0.15}s` }}
              ></div>
            ))}
          </div>
        );

      case 'dots':
        return (
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'} bg-blue-600 rounded-full animate-bounce`}
                style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.6s' }}
              ></div>
            ))}
          </div>
        );

      case 'ripple':
        return (
          <div className="relative">
            <div className={`${sizeClasses[size]} rounded-full bg-blue-600 animate-ping opacity-75`}></div>
            <div className={`${sizeClasses[size]} rounded-full bg-blue-600 absolute top-0 left-0 animate-pulse`}></div>
          </div>
        );

      case 'medical':
        return (
          <div className="relative">
            {/* Heartbeat line animation */}
            <div className="flex items-center justify-center space-x-1">
              <Activity className={`${sizeClasses[size]} text-red-500 animate-pulse`} />
              <div className="relative w-16 h-8">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 30">
                  <path
                    d="M0,15 L20,15 L25,5 L35,25 L45,10 L55,20 L65,15 L100,15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-blue-600 animate-draw"
                  />
                </svg>
              </div>
              <Heart className={`${sizeClasses[size]} text-red-500 animate-pulse`} />
            </div>
          </div>
        );

      default:
        return <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-600`} />;
    }
  };

  const Container = fullScreen ? 'div' : 'div';
  const containerClasses = fullScreen
    ? 'fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center'
    : 'flex items-center justify-center py-12';

  return (
    <Container className={containerClasses}>
      <div className="flex flex-col items-center justify-center space-y-4">
        {renderLoader()}

        <div className="flex items-center space-x-2">
          <p className={`${textSizeClasses[size]} text-gray-600 font-medium`}>
            {message}
          </p>
          <div className="flex space-x-1">
            <span className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
            <span className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
            <span className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
          </div>
        </div>

        {/* Optional: Progress bar */}
        <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-progress"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes draw {
          0% {
            stroke-dasharray: 200;
            stroke-dashoffset: 200;
          }
          100% {
            stroke-dasharray: 200;
            stroke-dashoffset: 0;
          }
        }
        .animate-draw {
          animation: draw 1.5s ease-in-out infinite;
        }
        @keyframes progress {
          0% {
            width: 0%;
          }
          50% {
            width: 70%;
          }
          100% {
            width: 100%;
          }
        }
        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
      `}</style>
    </Container>
  );
}