import PriceTicker from '@/components/PriceTicker';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  Search,
  Lightbulb,
  RefreshCw,
  Target,
  ChevronDown,
  Mail
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';

export default function LearnPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [email, setEmail] = useState('');

  const topics = [
    {
      icon: <Coins className="h-16 w-16" />,
      badge: "52 Articles",
      title: "Cryptocurrency Basics",
      description: "Introductory content covering what crypto is, how it works, and fundamental concepts for complete beginners.",
      link: "/learn/cryptocurrency-basics"
    },
    {
      icon: <Link2 className="h-16 w-16" />,
      badge: "38 Articles",
      title: "Blockchain Technology",
      description: "Deep dives into blockchain mechanics, consensus algorithms, smart contracts, and technical innovations.",
      link: "/learn/blockchain-technology"
    },
    {
      icon: <TrendingUp className="h-16 w-16" />,
      badge: "64 Articles",
      title: "Crypto Trading & Investment",
      description: "Everything about buying, selling, trading strategies, market analysis, portfolio management, and risk assessment.",
      link: "/learn/trading-investment"
    },
    {
      icon: <Network className="h-16 w-16" />,
      badge: "45 Articles",
      title: "Decentralized Finance (DeFi)",
      description: "Exploring DeFi protocols, lending, borrowing, yield farming, staking, and decentralized exchanges.",
      link: "/learn/defi"
    },
    {
      icon: <Shield className="h-16 w-16" />,
      badge: "41 Articles",
      title: "Crypto Security & Wallets",
      description: "Best practices for securing crypto assets, wallet types, hardware wallets, and scam prevention strategies.",
      link: "/learn/security-wallets"
    },
    {
      icon: <Image className="h-16 w-16" />,
      badge: "29 Articles",
      title: "Non-Fungible Tokens (NFTs)",
      description: "NFT basics, creation process, marketplaces, use cases beyond art, and cultural impact of digital ownership.",
      link: "/learn/nfts"
    },
    {
      icon: <Pickaxe className="h-16 w-16" />,
      badge: "33 Articles",
      title: "Crypto Mining & Staking",
      description: "Mining principles, proof of work vs proof of stake, energy considerations, rewards mechanisms, and setup guides.",
      link: "/learn/mining-staking"
    },
    {
      icon: <Gavel className="h-16 w-16" />,
      badge: "56 Articles",
      title: "Regulation & Legal Issues",
      description: "Crypto laws worldwide, US tax implications, compliance requirements, and future regulatory trends affecting investors.",
      link: "/learn/regulation-legal"
    },
    {
      icon: <Rocket className="h-16 w-16" />,
      badge: "37 Articles",
      title: "Emerging Trends & Innovations",
      description: "Latest developments, Layer 2 solutions, blockchain interoperability, Web3 applications, and upcoming groundbreaking projects.",
      link: "/learn/emerging-trends"
    }
  ];

  const popularTerms = [
    "Blockchain", "DeFi", "Smart Contract", "Gas Fees", "Staking",
    "NFT", "Cold Wallet", "Altcoin", "HODL", "Satoshi"
  ];

  const benefits = [
    {
      icon: <Lightbulb className="h-16 w-16" />,
      title: "No Jargon, Just Clarity",
      description: "We explain complex crypto concepts in plain English. If a 12-year-old can't understand it, we rewrite it. Accessible knowledge for everyone."
    },
    {
      icon: <RefreshCw className="h-16 w-16" />,
      title: "Always Current",
      description: "Crypto moves fast. Our content is updated weekly to reflect the latest developments, regulations, and best practices. Never outdated information."
    },
    {
      icon: <Target className="h-16 w-16" />,
      title: "US-Focused Guidance",
      description: "Specific advice for American investors—from IRS tax rules to SEC regulations. Learn what matters for YOUR situation, not generic global advice."
    }
  ];

  const faqs = [
    {
      question: "Is learning content on Pyrax completely free?",
      answer: "Yes. All learning content, guides, and tutorials are 100% free and always will be. Our mission is educating crypto investors, not gatekeeping knowledge."
    },
    {
      question: "Do I need prior knowledge to start learning?",
      answer: "No. Our Cryptocurrency Basics section starts from absolute zero. We explain everything from 'what is blockchain' to advanced trading strategies."
    },
    {
      question: "How often is learning content updated?",
      answer: "Educational guides are updated quarterly or whenever significant changes occur. Breaking developments get immediate coverage in our news section."
    },
    {
      question: "Can I download guides for offline reading?",
      answer: "Coming soon. We're developing PDF versions of major guides for premium subscribers. Core content remains free online."
    },
    {
      question: "Do you offer certificates?",
      answer: "Not currently. We focus on practical knowledge over credentials. However, completion tracking and learning paths are in development."
    },
    {
      question: "Is the content suitable for US investors specifically?",
      answer: "Yes. While blockchain technology is universal, we emphasize US regulations, IRS tax implications, and SEC compliance throughout our content."
    }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  const scrollToTopics = () => {
    const element = document.getElementById('topics');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-learn">
      <SEO 
        title="Learn Crypto | Free Cryptocurrency Education | Pyrax"
        description="Master cryptocurrency with Pyrax's free learning hub. Comprehensive guides on blockchain, DeFi, trading, NFTs, and more. Start from basics to advanced."
        keywords="learn cryptocurrency, crypto education, blockchain tutorial, bitcoin guide, defi explained, crypto for beginners"
      />
      <PriceTicker />
      <Navbar />
      
      {/* Section 1: Hero */}
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg"
                onClick={scrollToTopics}
                data-testid="button-start-learning"
              >
                Start Learning
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={scrollToTopics}
                data-testid="button-browse-guides"
              >
                Browse All Guides
              </Button>
            </div>
            <button 
              onClick={scrollToTopics}
              className="text-sm text-primary animate-bounce inline-flex items-center gap-2"
              data-testid="button-explore-topics"
            >
              <span>↓ Explore Topics</span>
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: Learning Topics Grid */}
      <section id="topics" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-topics-title">
              Choose Your Learning Path
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-topics-description">
              Select a topic to explore comprehensive guides, tutorials, and analysis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topics.map((topic, index) => (
              <Link key={index} href={topic.link} data-testid={`link-topic-${index}`}>
                <Card 
                  className="p-8 hover-elevate active-elevate-2 cursor-pointer h-full transition-all group"
                  data-testid={`card-topic-${index}`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-primary group-hover:scale-110 transition-transform">
                      {topic.icon}
                    </div>
                    <Badge variant="outline" className="text-xs" data-testid={`badge-articles-${index}`}>
                      {topic.badge}
                    </Badge>
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
        </div>
      </section>

      {/* Section 3: Glossary Search */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4" data-testid="text-glossary-title">
              Crypto Glossary: 500+ Terms Explained
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="text-glossary-description">
              Can't find a term? Search our comprehensive glossary for instant explanations
            </p>
          </div>
          
          <div className="relative mb-8">
            <Input 
              type="text"
              placeholder="Search any crypto term... (e.g., 'What is DeFi?')"
              className="h-14 pr-12 text-base"
              data-testid="input-glossary-search"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {popularTerms.map((term, index) => (
              <Badge 
                key={index}
                variant="outline"
                className="px-4 py-2 cursor-pointer hover-elevate"
                data-testid={`badge-term-${index}`}
              >
                {term}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Why Learn with Pyrax */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-benefits-title">
              Why Learn with Pyrax
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card 
                key={index}
                className="p-8 text-center hover-elevate"
                data-testid={`card-benefit-${index}`}
              >
                <div className="text-primary mx-auto mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-card-foreground mb-4">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-y border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-newsletter-title">
            Get Weekly Crypto Education in Your Inbox
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto" data-testid="text-newsletter-description">
            Join 50,000+ subscribers getting our Sunday Crypto Digest—curated learning 
            resources, market insights, and beginner tips delivered every week.
          </p>
          
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-4">
            <Input 
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 flex-1"
              required
              data-testid="input-newsletter-email"
            />
            <Button type="submit" size="lg" className="h-14 px-8" data-testid="button-newsletter-submit">
              Subscribe
            </Button>
          </form>
          <p className="text-sm text-muted-foreground">
            ✓ No spam. Unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </section>

      {/* Section 6: FAQ Accordion */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-faq-title">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card 
                key={index}
                className="overflow-hidden"
                data-testid={`card-faq-${index}`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover-elevate"
                  data-testid={`button-faq-${index}`}
                >
                  <span className="text-lg md:text-xl font-semibold text-card-foreground pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform ${
                      openFaq === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-muted-foreground leading-relaxed" data-testid={`text-faq-answer-${index}`}>
                    {faq.answer}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Final CTA */}
      <section className="py-20 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-card-foreground mb-4" data-testid="text-final-cta-title">
            Ready to Start Your Crypto Education?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10" data-testid="text-final-cta-description">
            Join thousands learning to navigate cryptocurrency with confidence
          </p>
          <Button 
            size="lg"
            onClick={scrollToTopics}
            className="px-12 h-14 text-lg"
            data-testid="button-explore-all-topics"
          >
            Explore All Topics
          </Button>
          <p className="mt-6 text-muted-foreground">
            <a href="#" className="text-primary hover:underline" data-testid="link-download-roadmap">
              Or download our Learning Roadmap (PDF) →
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
