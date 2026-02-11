import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const [location] = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    if (location !== displayLocation) {
      setIsTransitioning(true);
      
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setIsTransitioning(false);
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [location, displayLocation]);

  return (
    <div className="relative">
      {/* Transition Overlay */}
      <div 
        className={`fixed inset-0 z-50 pointer-events-none transition-all duration-300 ${
          isTransitioning 
            ? 'bg-gradient-to-br from-primary/20 to-accent/20 opacity-100' 
            : 'opacity-0'
        }`}
        data-testid="page-transition-overlay"
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            {/* Loading Animation */}
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary/30 rounded-full animate-spin">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
              </div>
            </div>
            <div className="mt-4 text-white font-semibold">
              Loading...
            </div>
          </div>
        </div>
      </div>
      
      {/* Page Content */}
      <div 
        className={`transition-all duration-300 ${
          isTransitioning 
            ? 'opacity-50 transform scale-95' 
            : 'opacity-100 transform scale-100'
        }`}
        data-testid="page-content"
      >
        {children}
      </div>
    </div>
  );
}