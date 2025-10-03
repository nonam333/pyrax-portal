import { useState } from 'react';
import PriceTicker from '@/components/PriceTicker';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  GraduationCap, TrendingUp, Code, BookOpen, Shield, RefreshCw, 
  MapPin, Search, Play, ChevronRight, Check, Star
} from 'lucide-react';
import { Link } from 'wouter';

export default function ComprehensiveLearnPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const learningPaths = [
    {
      id: 'beginner',
      icon: <GraduationCap className="h-12 w-12" />,
      title: 'Crypto Fundamentals',
      description: "Never touched crypto before? Start here. Learn the basics of blockchain, Bitcoin, and how to make your first purchase safely.",
      modules: '12 Lessons | 6 Hours | Certificate',
      color: 'from-green-500 to-emerald-600',
      topics: [
        'What is Cryptocurrency & Blockchain',
        'How Bitcoin Works',
        'Setting Up Your First Wallet',
        'Making Your First Purchase',
        'Security Best Practices',
        'Understanding Market Basics'
      ],
      cta: 'Begin Fundamentals',
      level: 'Beginner'
    },
    {
      id: 'intermediate',
      icon: <TrendingUp className="h-12 w-12" />,
      title: 'Trading & Investment',
      description: "Ready to go deeper? Master trading fundamentals, portfolio management, and advanced investment strategies.",
      modules: '18 Lessons | 10 Hours | Certificate',
      color: 'from-blue-500 to-cyan-600',
      topics: [
        'Technical Analysis Basics',
        'Reading Crypto Charts',
        'Risk Management Strategies',
        'DeFi Platforms & Protocols',
        'Staking & Yield Farming',
        'Tax Implications (US Focus)'
      ],
      cta: 'Level Up Your Skills',
      level: 'Intermediate'
    },
    {
      id: 'advanced',
      icon: <Code className="h-12 w-12" />,
      title: 'Blockchain Technology',
      description: "Become an expert. Dive into smart contracts, on-chain analysis, and building on blockchain.",
      modules: '24 Lessons | 15 Hours | Certificate',
      color: 'from-purple-500 to-pink-600',
      topics: [
        'Smart Contract Development',
        'On-Chain Data Analysis',
        'Protocol Design Principles',
        'Web3 Development',
        'Advanced Trading Strategies',
        'Building Crypto Projects'
      ],
      cta: 'Master the Technology',
      level: 'Advanced'
    }
  ];

  const featuredGuides = [
    { title: 'Complete Bitcoin Guide 2026', level: 'Beginner', time: '15 min read', category: 'Bitcoin' },
    { title: 'DeFi Explained: Ultimate Guide', level: 'Intermediate', time: '20 min read', category: 'DeFi' },
    { title: 'Crypto Security: Protect Your Assets', level: 'Beginner', time: '10 min read', category: 'Security' },
    { title: 'Technical Analysis Masterclass', level: 'Advanced', time: '25 min read', category: 'Trading' },
    { title: 'US Crypto Tax Guide 2026', level: 'Intermediate', time: '18 min read', category: 'Tax' },
    { title: 'NFTs & Web3: The Future', level: 'Intermediate', time: '12 min read', category: 'Web3' }
  ];

  const glossaryTerms = ['Blockchain', 'DeFi', 'Smart Contract', 'Gas Fees', 'Staking', 'NFT', 'Cold Wallet', 'Altcoin', 'Mining', 'DAO'];

  const videoTutorials = [
    { title: 'How to Buy Your First Bitcoin', duration: '8:32', level: 'Beginner', views: '125K' },
    { title: 'Setting Up MetaMask Wallet', duration: '5:45', level: 'Beginner', views: '98K' },
    { title: 'Understanding DeFi Protocols', duration: '12:15', level: 'Intermediate', views: '76K' },
    { title: 'Reading Crypto Charts', duration: '10:20', level: 'Intermediate', views: '112K' },
    { title: 'Crypto Security Essentials', duration: '6:50', level: 'Beginner', views: '89K' }
  ];

  const stats = [
    { value: '250,000+', label: 'Students Educated' },
    { value: '1,500+', label: 'Comprehensive Guides' },
    { value: '50,000+', label: 'Questions Answered' },
    { value: '4.9/5', label: 'Average Rating' }
  ];

  const topicsGrid = [
    { title: 'Bitcoin & Basics', icon: <BookOpen className="h-6 w-6" />, articles: 47 },
    { title: 'Ethereum & Smart Contracts', icon: <Code className="h-6 w-6" />, articles: 38 },
    { title: 'DeFi & Yield Farming', icon: <TrendingUp className="h-6 w-6" />, articles: 52 },
    { title: 'NFTs & Digital Assets', icon: <Star className="h-6 w-6" />, articles: 29 },
    { title: 'Trading & Investment', icon: <TrendingUp className="h-6 w-6" />, articles: 64 },
    { title: 'Security & Wallets', icon: <Shield className="h-6 w-6" />, articles: 31 },
    { title: 'Regulations & Tax (US)', icon: <MapPin className="h-6 w-6" />, articles: 42 },
    { title: 'Blockchain Technology', icon: <Code className="h-6 w-6" />, articles: 56 },
    { title: 'Market Analysis', icon: <TrendingUp className="h-6 w-6" />, articles: 48 },
    { title: 'Altcoins & Projects', icon: <Star className="h-6 w-6" />, articles: 73 },
    { title: 'Web3 & Future Tech', icon: <Code className="h-6 w-6" />, articles: 35 },
    { title: 'Mining & Staking', icon: <BookOpen className="h-6 w-6" />, articles: 26 }
  ];

  const faqs = [
    { q: 'Is Pyrax Learn completely free?', a: 'Yes! All our educational content is 100% free. No hidden fees, no paywalls.' },
    { q: 'Do I need prior knowledge to start?', a: 'Not at all. Our Beginner path starts from absolute zero. We explain everything in plain English.' },
    { q: 'How long does it take to learn crypto basics?', a: 'Most students complete our Fundamentals path in 2-3 weeks with casual study.' },
    { q: 'Do you offer certificates?', a: 'Yes, you receive a certificate of completion for each learning path you finish.' },
    { q: 'Is the content suitable for US investors?', a: 'Absolutely. We include specific US tax, regulatory, and legal guidance throughout.' },
    { q: 'How often is content updated?', a: 'We review and update all content weekly to reflect the latest crypto developments.' }
  ];

  return (
    <div className="min-h-screen bg-background" data-testid="page-comprehensive-learn">
      <PriceTicker />
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/20 via-background to-accent/20 border-b border-border py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-card-foreground mb-6" data-testid="text-hero-title">
            Master Cryptocurrency - From First Bitcoin to Advanced DeFi
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto" data-testid="text-hero-subtitle">
            Your comprehensive learning hub for navigating the crypto revolution. No jargon. No fluff. Just clear, actionable education.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-primary to-accent text-black font-semibold text-lg px-8 py-6"
              data-testid="button-start-journey"
            >
              Start Your Crypto Journey
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6"
              data-testid="button-browse-guides"
            >
              Browse All Guides
            </Button>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-card-foreground mb-4" data-testid="text-paths-title">
              Choose Your Learning Path
            </h2>
            <p className="text-lg text-muted-foreground">Start where you are, grow at your own pace</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {learningPaths.map((path, index) => (
              <Card key={path.id} className="p-8 hover-elevate active-elevate-2 transition-all" data-testid={`card-path-${index}`}>
                <div className={`bg-gradient-to-br ${path.color} p-4 rounded-lg inline-block mb-6 text-white`}>
                  {path.icon}
                </div>
                <Badge className="mb-4" data-testid={`badge-level-${index}`}>{path.level}</Badge>
                <h3 className="text-2xl font-bold text-card-foreground mb-3" data-testid={`text-path-title-${index}`}>
                  {path.title}
                </h3>
                <p className="text-muted-foreground mb-4" data-testid={`text-path-desc-${index}`}>
                  {path.description}
                </p>
                <p className="text-sm text-muted-foreground mb-6">{path.modules}</p>
                <ul className="space-y-2 mb-6">
                  {path.topics.map((topic, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" data-testid={`button-cta-${index}`}>
                  {path.cta}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-card-foreground mb-8" data-testid="text-guides-title">
            Featured Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGuides.map((guide, index) => (
              <Card key={index} className="p-6 hover-elevate active-elevate-2 transition-all cursor-pointer" data-testid={`card-guide-${index}`}>
                <Badge className="mb-3" data-testid={`badge-category-${index}`}>{guide.category}</Badge>
                <h3 className="text-xl font-bold text-card-foreground mb-3" data-testid={`text-guide-title-${index}`}>
                  {guide.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <Badge variant="outline" data-testid={`badge-guide-level-${index}`}>{guide.level}</Badge>
                  <span data-testid={`text-read-time-${index}`}>{guide.time}</span>
                </div>
                <Button variant="outline" className="w-full" data-testid={`button-read-guide-${index}`}>
                  Read Guide
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Glossary Teaser */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-card-foreground mb-4" data-testid="text-glossary-title">
            Crypto Glossary: 500+ Terms Explained
          </h2>
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search any crypto term... (e.g., 'What is DeFi?')"
              className="pl-12 h-14 text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              data-testid="input-glossary-search"
            />
          </div>
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {glossaryTerms.map((term, index) => (
              <Badge 
                key={term} 
                variant="outline" 
                className="cursor-pointer hover-elevate px-4 py-2 text-sm"
                data-testid={`badge-term-${index}`}
              >
                {term}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Can't find something? Our glossary has clear explanations for every crypto term.
          </p>
        </div>
      </section>

      {/* Video Tutorials */}
      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-card-foreground mb-8" data-testid="text-videos-title">
            Video Learning Library
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoTutorials.map((video, index) => (
              <Card key={index} className="p-6 hover-elevate active-elevate-2 transition-all cursor-pointer group" data-testid={`card-video-${index}`}>
                <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg aspect-video mb-4 flex items-center justify-center">
                  <Play className="h-12 w-12 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-bold text-card-foreground mb-2" data-testid={`text-video-title-${index}`}>
                  {video.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span data-testid={`text-duration-${index}`}>{video.duration}</span>
                  <Badge variant="outline" data-testid={`badge-video-level-${index}`}>{video.level}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2" data-testid={`text-views-${index}`}>{video.views} views</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Stats */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} data-testid={`stat-${index}`}>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2" data-testid={`text-stat-value-${index}`}>
                  {stat.value}
                </div>
                <div className="text-muted-foreground" data-testid={`text-stat-label-${index}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-card-foreground mb-8" data-testid="text-topics-title">
            Explore by Topic
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {topicsGrid.map((topic, index) => (
              <Card key={index} className="p-6 hover-elevate active-elevate-2 transition-all cursor-pointer text-center" data-testid={`card-topic-${index}`}>
                <div className="text-primary mb-3 flex justify-center">{topic.icon}</div>
                <h3 className="font-semibold text-card-foreground mb-2" data-testid={`text-topic-title-${index}`}>{topic.title}</h3>
                <p className="text-sm text-muted-foreground" data-testid={`text-articles-${index}`}>{topic.articles} Articles</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Learn With Pyrax */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-card-foreground mb-12 text-center" data-testid="text-why-title">
            Why Learn With Pyrax
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-card-foreground mb-3">No Jargon, Just Clarity</h3>
              <p className="text-muted-foreground">
                We explain complex crypto concepts in plain English. If a 12-year-old can't understand it, we rewrite it.
              </p>
            </Card>
            <Card className="p-8 text-center">
              <RefreshCw className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-card-foreground mb-3">Always Current</h3>
              <p className="text-muted-foreground">
                Crypto moves fast. Our content is updated weekly to reflect the latest developments, regulations, and best practices.
              </p>
            </Card>
            <Card className="p-8 text-center">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-card-foreground mb-3">US-Focused Guidance</h3>
              <p className="text-muted-foreground">
                Specific advice for American investors - from IRS tax rules to SEC regulations. Learn what matters for YOUR situation.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-card-foreground mb-4" data-testid="text-newsletter-title">
            Get Weekly Crypto Education in Your Inbox
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join 50,000+ subscribers getting our Sunday Crypto Digest - curated learning resources, market insights, and beginner tips.
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1"
              data-testid="input-newsletter"
            />
            <Button 
              className="bg-gradient-to-r from-primary to-accent text-black font-semibold"
              data-testid="button-subscribe"
            >
              Start Learning Free
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-card-foreground mb-8 text-center" data-testid="text-faq-title">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6" data-testid={`card-faq-${index}`}>
                <h3 className="font-bold text-card-foreground mb-2" data-testid={`text-faq-q-${index}`}>{faq.q}</h3>
                <p className="text-muted-foreground" data-testid={`text-faq-a-${index}`}>{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/20 via-background to-accent/20 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-card-foreground mb-4" data-testid="text-cta-title">
            Ready to Start Your Crypto Education?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of Americans learning to navigate cryptocurrency with confidence.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-primary to-accent text-black font-semibold text-lg px-8 py-6"
              data-testid="button-begin-learning"
            >
              Begin Learning Now
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6"
              data-testid="button-download-roadmap"
            >
              Download Learning Roadmap (PDF)
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
