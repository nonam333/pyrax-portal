import { useState } from 'react';
import PriceTicker from '@/components/PriceTicker';
import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Wallet, TrendingUp, Code, BookOpen, Shield, RefreshCw, 
  MapPin, Search, ChevronRight, Coins, Image, FileText, Newspaper, Gavel
} from 'lucide-react';

export default function ComprehensiveLearnPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const popularTopics = ['#DeFi', '#Wallets', '#Security', '#NFTs'];

  const topicWidgets = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: 'Crypto Basics',
      description: 'Start your journey with fundamental crypto concepts and blockchain technology',
    },
    {
      icon: <Wallet className="h-8 w-8" />,
      title: 'Wallets',
      description: 'Learn to secure and manage your digital assets with confidence',
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Trading',
      description: 'Master trading strategies and technical analysis fundamentals',
    },
    {
      icon: <Coins className="h-8 w-8" />,
      title: 'DeFi & Staking',
      description: 'Explore decentralized finance protocols and earn passive income',
    },
    {
      icon: <Image className="h-8 w-8" />,
      title: 'NFTs & Collectibles',
      description: 'Discover the world of digital art and non-fungible tokens',
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Security',
      description: 'Protect your investments with best security practices',
    },
    {
      icon: <Gavel className="h-8 w-8" />,
      title: 'Taxes & Regulation',
      description: 'Navigate crypto tax laws and regulatory requirements',
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: 'Developers',
      description: 'Build on blockchain with smart contracts and Web3 tools',
    },
    {
      icon: <Newspaper className="h-8 w-8" />,
      title: 'News Explained',
      description: 'Understand the latest crypto news and market developments',
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      console.log('Search input:', value);
    }
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-comprehensive-learn">
      <SEO 
        title="Learn Crypto — Safely and Simply"
        description="Search guides, tutorials, and topics to master crypto from scratch. Comprehensive crypto education covering basics, wallets, trading, DeFi, NFTs, security, and more."
        keywords="learn cryptocurrency, crypto education, bitcoin guide, ethereum tutorial, defi learning, blockchain basics, crypto security, nft guide"
      />
      <PriceTicker />
      <Navbar />

      {/* Hero Section */}
      <header className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 border-b border-border py-20">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-card-foreground mb-6" data-testid="text-hero-title">
            Learn Crypto — Safely and Simply
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto" data-testid="text-hero-subtitle">
            Search guides, tutorials, and topics to master crypto from scratch.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-3xl mx-auto mb-8">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search crypto topics, guides, or tools…"
              className="pl-14 h-16 text-lg rounded-xl shadow-sm"
              value={searchTerm}
              onChange={handleSearch}
              data-testid="input-search"
            />
          </div>

          {/* Popular Topic Chips */}
          <div className="flex flex-wrap gap-3 justify-center">
            {popularTopics.map((topic, index) => (
              <Badge 
                key={index}
                variant="outline" 
                className="cursor-pointer hover-elevate px-4 py-2 text-sm"
                data-testid={`badge-topic-${index}`}
              >
                {topic}
              </Badge>
            ))}
          </div>
        </div>
      </header>

      {/* Topic Widgets Grid */}
      <main className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topicWidgets.map((widget, index) => (
              <Card 
                key={index}
                className="p-8 hover-elevate active-elevate-2 transition-all cursor-pointer"
                data-testid={`card-topic-${index}`}
              >
                <div className="text-primary mb-4">
                  {widget.icon}
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-3" data-testid={`text-topic-title-${index}`}>
                  {widget.title}
                </h3>
                <p className="text-muted-foreground mb-6 line-clamp-2" data-testid={`text-topic-desc-${index}`}>
                  {widget.description}
                </p>
                <Button 
                  variant="outline" 
                  className="w-full group"
                  data-testid={`button-view-guides-${index}`}
                >
                  View Guides
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Why Learn With Pyrax */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-16 text-center" data-testid="text-why-title">
            Why Learn With Pyrax
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-4">No Jargon, Just Clarity</h3>
              <p className="text-muted-foreground leading-relaxed">
                We explain complex crypto concepts in plain English. If a 12-year-old can't understand it, we rewrite it.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <RefreshCw className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-4">Always Current</h3>
              <p className="text-muted-foreground leading-relaxed">
                Crypto moves fast. Our content is updated weekly to reflect the latest developments, regulations, and best practices.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-4">US-Focused Guidance</h3>
              <p className="text-muted-foreground leading-relaxed">
                Specific advice for American investors — from IRS tax rules to SEC regulations. Learn what matters for YOUR situation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <p className="text-sm text-muted-foreground" data-testid="text-footer-copyright">
            © 2025 Pyrax — Learn crypto the smart way.
          </p>
        </div>
      </footer>
    </div>
  );
}
