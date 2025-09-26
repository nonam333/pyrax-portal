import PriceTicker from '@/components/PriceTicker';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import NewsGrid from '@/components/NewsGrid';
import Sidebar from '@/components/Sidebar';
import NewsletterSignup from '@/components/NewsletterSignup';
import AdSlot from '@/components/AdSlot';
import Footer from '@/components/Footer';

export default function Homepage() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-homepage">
      {/* Price Ticker */}
      <PriceTicker />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-12">
            {/* News Grid */}
            <NewsGrid />
            
            {/* Ad Slot - Banner */}
            <div className="flex justify-center">
              <AdSlot size="banner" position="content-middle" />
            </div>
            
            {/* Newsletter Signup */}
            <div className="max-w-2xl mx-auto">
              <NewsletterSignup />
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <Sidebar />
            
            {/* Ad Slot - Square */}
            <div className="flex justify-center lg:justify-start">
              <AdSlot size="square" position="sidebar" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}