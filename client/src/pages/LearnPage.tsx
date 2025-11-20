import PriceTicker from '@/components/PriceTicker';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Coins, 
  Link2, 
  TrendingUp, 
  Network, 
  Shield, 
  Image, 
  Pickaxe, 
  Gavel, 
  Rocket,
  ArrowRight,
  Search
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';

export default function LearnPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const topics = [
    {
      icon: <Coins className="h-16 w-16" />,
      title: "Cryptocurrency Basics",
      description: "Introductory content covering what crypto is, how it works, and fundamental concepts for complete beginners.",
      link: "/learn/cryptocurrency-basics"
    },
    {
      icon: <Link2 className="h-16 w-16" />,
      title: "Blockchain Technology",
      description: "Deep dives into blockchain mechanics, consensus algorithms, smart contracts, and technical innovations.",
      link: "/learn/blockchain-technology"
    },
    {
      icon: <TrendingUp className="h-16 w-16" />,
      title: "Crypto Trading & Investment",
      description: "Everything about buying, selling, trading strategies, market analysis, portfolio management, and risk assessment.",
      link: "/learn/trading-investment"
    },
    {
      icon: <Network className="h-16 w-16" />,
      title: "Decentralized Finance (DeFi)",
      description: "Exploring DeFi protocols, lending, borrowing, yield farming, staking, and decentralized exchanges.",
      link: "/learn/defi"
    },
    {
      icon: <Shield className="h-16 w-16" />,
      title: "Crypto Security & Wallets",
      description: "Best practices for securing crypto assets, wallet types, hardware wallets, and scam prevention strategies.",
      link: "/learn/security-wallets"
    },
    {
      icon: <Image className="h-16 w-16" />,
      title: "Non-Fungible Tokens (NFTs)",
      description: "NFT basics, creation process, marketplaces, use cases beyond art, and cultural impact of digital ownership.",
      link: "/learn/nfts"
    },
    {
      icon: <Pickaxe className="h-16 w-16" />,
      title: "Crypto Mining & Staking",
      description: "Mining principles, proof of work vs proof of stake, energy considerations, rewards mechanisms, and setup guides.",
      link: "/learn/mining-staking"
    },
    {
      icon: <Gavel className="h-16 w-16" />,
      title: "Regulation & Legal Issues",
      description: "Crypto laws worldwide, tax implications, compliance requirements, and regulatory trends affecting investors.",
      link: "/learn/regulation-legal"
    },
    {
      icon: <Rocket className="h-16 w-16" />,
      title: "Emerging Trends & Innovations",
      description: "Latest developments, Layer 2 solutions, blockchain interoperability, Web3 applications, and upcoming groundbreaking projects.",
      link: "/learn/emerging-trends"
    }
  ];

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background" data-testid="page-learn">
      <SEO 
        title="Learn Crypto | Free Cryptocurrency Education | Pyrax"
        description="Master cryptocurrency with Pyrax's free learning hub. Comprehensive guides on blockchain, DeFi, trading, NFTs, and more. Start from basics to advanced."
        keywords="learn cryptocurrency, crypto education, blockchain tutorial, bitcoin guide, defi explained, crypto for beginners"
      />
      <PriceTicker />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-card to-background border-b border-border py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge 
              className="mb-6 text-xs uppercase tracking-widest"
              data-testid="badge-learn"
            >
              Crypto Education Hub
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight" data-testid="text-hero-title">
              Master Cryptocurrency<br />
              <span className="text-primary">From First Bitcoin to Advanced DeFi</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto" data-testid="text-hero-description">
              Your comprehensive learning hub for navigating the crypto revolution. 
              No jargon. No fluff. Just clear, actionable education.
            </p>
          </div>
        </div>
      </section>

      {/* Search Bar Section */}
      <section className="py-12 bg-background border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Input 
              type="text"
              placeholder="Search topics... (e.g., DeFi, Trading, Security)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 pr-12 text-base"
              data-testid="input-topic-search"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* Learning Topics Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-topics-title">
              Choose Your Learning Path
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-topics-description">
              Select a topic to explore comprehensive guides, tutorials, and analysis
            </p>
          </div>

          {filteredTopics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTopics.map((topic, index) => (
                <Link key={index} href={topic.link} data-testid={`link-topic-${index}`}>
                  <Card 
                    className="p-8 hover-elevate active-elevate-2 cursor-pointer h-full transition-all group"
                    data-testid={`card-topic-${index}`}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="text-primary group-hover:scale-110 transition-transform">
                        {topic.icon}
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-card-foreground mb-4" data-testid={`text-topic-title-${index}`}>
                      {topic.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed" data-testid={`text-topic-description-${index}`}>
                      {topic.description}
                    </p>
                    <div className="flex items-center justify-between text-primary font-semibold">
                      <span>Explore Topic</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center" data-testid="card-no-results">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-card-foreground mb-2">No Topics Found</h3>
              <p className="text-muted-foreground">
                Try a different search term or browse all available topics
              </p>
            </Card>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
