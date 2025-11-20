import { Card } from '@/components/ui/card';
import { TrendingUp, Shield, Zap, Wallet } from 'lucide-react';

interface AdSlotProps {
  size?: 'banner' | 'square' | 'skyscraper' | 'mobile';
  position?: string;
}

export default function AdSlot({ size = 'banner', position = 'content' }: AdSlotProps) {
  // Responsive container classes based on ad size
  const containerClasses = {
    banner: 'w-full max-w-[728px] h-[50px] sm:h-[90px]',
    square: 'w-full max-w-[300px] h-[250px]',
    skyscraper: 'w-full max-w-[300px] h-[250px] lg:max-w-[160px] lg:h-[600px]',
    mobile: 'w-full max-w-[320px] h-[50px]'
  };

  // Dark-themed crypto ads based on size
  const getAdContent = () => {
    switch (size) {
      case 'banner':
        return (
          <div className="w-full h-full bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 flex items-center justify-between px-4 sm:px-6 rounded-lg overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
            <div className="flex items-center gap-2 sm:gap-3 relative z-10">
              <div className="bg-gradient-to-br from-orange-500 to-pink-600 p-1.5 sm:p-2 rounded-lg">
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-[10px] sm:text-sm">Start Trading Crypto</div>
                <div className="text-gray-300 text-[8px] sm:text-xs hidden sm:block">Join millions of traders worldwide</div>
              </div>
            </div>
            <button className="bg-gradient-to-r from-orange-500 to-pink-600 text-white text-[10px] sm:text-xs font-semibold px-3 sm:px-4 py-1 sm:py-2 rounded-lg hover:shadow-lg transition-all relative z-10">
              Sign Up Free
            </button>
          </div>
        );

      case 'square':
        return (
          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 rounded-lg flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-3 rounded-xl mb-3 inline-block">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Secure Crypto Wallet</h3>
              <p className="text-gray-300 text-sm mb-4">
                Store, send, and receive crypto with military-grade security
              </p>
              <button className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:shadow-xl transition-all w-full">
                Download Now
              </button>
              <div className="mt-3 text-gray-400 text-xs">
                ⭐ 4.8/5 • 10M+ Users
              </div>
            </div>
          </div>
        );

      case 'skyscraper':
        return (
          <div className="w-full h-full bg-gradient-to-b from-slate-900 via-emerald-900 to-slate-900 p-3 rounded-lg flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
            <div className="relative z-10 flex flex-col items-center h-full justify-between py-4">
              <div>
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-xl mb-3 inline-block">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-white font-bold text-base mb-2">Lightning Fast Trading</h3>
                <p className="text-gray-300 text-xs mb-3">
                  Execute trades in milliseconds
                </p>
                <div className="bg-black/30 rounded-lg p-2 mb-3">
                  <div className="text-emerald-400 font-bold text-lg">0.1%</div>
                  <div className="text-gray-400 text-[10px]">Trading Fee</div>
                </div>
              </div>
              <div className="w-full space-y-2">
                <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:shadow-xl transition-all w-full">
                  Start Trading
                </button>
                <div className="text-gray-400 text-[10px]">
                  No KYC Required
                </div>
              </div>
            </div>
          </div>
        );

      case 'mobile':
        return (
          <div className="w-full h-full bg-gradient-to-r from-slate-900 via-violet-900 to-slate-900 flex items-center justify-between px-3 rounded-lg overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
            <div className="flex items-center gap-2 relative z-10">
              <Wallet className="h-4 w-4 text-violet-400" />
              <span className="text-white font-semibold text-xs">Crypto Rewards</span>
            </div>
            <button className="bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded hover:shadow-lg transition-all relative z-10">
              Claim
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`${containerClasses[size]} overflow-hidden`}
      data-testid={`ad-slot-${size}`}
    >
      {getAdContent()}
    </div>
  );
}