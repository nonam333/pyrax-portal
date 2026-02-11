import { useState } from 'react';
import { getBlogPosts } from "@/lib/blog-api";
import PriceTicker from '@/components/PriceTicker';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { topicConfigs } from "@/lib/learn-config";
import {
  BookOpen, Search, ArrowLeft, TrendingUp, Clock, User,
  Code, Shield, Coins, Globe, Briefcase, Lock, LineChart
} from 'lucide-react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  category?: string;
  contentType: string;
  coverImage?: string;
  author: string;
  readTime: string;
  status: string;
  publishedAt: string;
  updatedAt: string;
}

interface TopicConfig {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  keywords: string[];
  relatedTopics: string[];
  difficulty: string;
}

const topicConfigs: Record<string, TopicConfig> = {
  bitcoin: {
    id: 'bitcoin',
    title: 'Bitcoin & Cryptocurrency Basics',
    description: 'Master the fundamentals of Bitcoin and cryptocurrency. Learn how Bitcoin works, blockchain technology, wallets, and how to get started safely.',
    icon: <Coins className="h-16 w-16" />,
    gradient: 'from-orange-500 via-primary to-yellow-600',
    keywords: ['bitcoin', 'btc', 'cryptocurrency', 'blockchain', 'wallet', 'satoshi'],
    relatedTopics: ['Security', 'Blockchain', 'Trading'],
    difficulty: 'Beginner'
  },
  ethereum: {
    id: 'ethereum',
    title: 'Ethereum & Smart Contracts',
    description: 'Explore Ethereum, the world\'s programmable blockchain. Understand smart contracts, dApps, and the Ethereum ecosystem.',
    icon: <Code className="h-16 w-16" />,
    gradient: 'from-purple-500 via-indigo-600 to-blue-500',
    keywords: ['ethereum', 'eth', 'smart contracts', 'solidity', 'dapps', 'evm'],
    relatedTopics: ['DeFi', 'NFTs', 'Blockchain'],
    difficulty: 'Intermediate'
  },
  defi: {
    id: 'defi',
    title: 'DeFi & Yield Farming',
    description: 'Dive into Decentralized Finance (DeFi). Learn about lending protocols, yield farming, liquidity pools, and how to maximize returns safely.',
    icon: <TrendingUp className="h-16 w-16" />,
    gradient: 'from-green-500 via-emerald-600 to-teal-500',
    keywords: ['defi', 'decentralized finance', 'yield farming', 'liquidity', 'lending', 'uniswap'],
    relatedTopics: ['Ethereum', 'Trading', 'Security'],
    difficulty: 'Intermediate'
  },
  nfts: {
    id: 'nfts',
    title: 'NFTs & Digital Assets',
    description: 'Understand Non-Fungible Tokens (NFTs). Learn about digital ownership, NFT marketplaces, creating and trading NFTs, and the future of digital art.',
    icon: <Globe className="h-16 w-16" />,
    gradient: 'from-pink-500 via-rose-600 to-red-500',
    keywords: ['nft', 'non-fungible token', 'digital art', 'opensea', 'collectibles', 'metadata'],
    relatedTopics: ['Ethereum', 'Blockchain', 'Trading'],
    difficulty: 'Beginner'
  },
  trading: {
    id: 'trading',
    title: 'Trading & Investment Strategies',
    description: 'Master cryptocurrency trading and investment. Learn technical analysis, chart reading, risk management, and proven trading strategies.',
    icon: <LineChart className="h-16 w-16" />,
    gradient: 'from-blue-500 via-cyan-600 to-teal-500',
    keywords: ['trading', 'investment', 'technical analysis', 'charts', 'risk management', 'portfolio'],
    relatedTopics: ['Bitcoin', 'DeFi', 'Altcoins'],
    difficulty: 'Intermediate'
  },
  security: {
    id: 'security',
    title: 'Security & Wallet Protection',
    description: 'Learn essential security practices for crypto. Understand wallet types, private key management, avoiding scams, and protecting your digital assets.',
    icon: <Shield className="h-16 w-16" />,
    gradient: 'from-red-500 via-orange-600 to-yellow-500',
    keywords: ['security', 'wallet', 'private key', 'cold storage', 'scams', '2fa', 'hardware wallet'],
    relatedTopics: ['Bitcoin', 'Ethereum', 'DeFi'],
    difficulty: 'Beginner'
  },
  blockchain: {
    id: 'blockchain',
    title: 'Blockchain Technology',
    description: 'Deep dive into blockchain technology. Learn how blockchains work, consensus mechanisms, cryptography, and the technical foundations of crypto.',
    icon: <Code className="h-16 w-16" />,
    gradient: 'from-indigo-500 via-purple-600 to-pink-500',
    keywords: ['blockchain', 'consensus', 'proof of work', 'proof of stake', 'cryptography', 'nodes'],
    relatedTopics: ['Bitcoin', 'Ethereum', 'Altcoins'],
    difficulty: 'Advanced'
  },
  altcoins: {
    id: 'altcoins',
    title: 'Altcoins & Projects',
    description: 'Explore alternative cryptocurrencies beyond Bitcoin. Learn about promising projects, tokenomics, project evaluation, and the diverse crypto ecosystem.',
    icon: <Coins className="h-16 w-16" />,
    gradient: 'from-violet-500 via-fuchsia-600 to-pink-500',
    keywords: ['altcoins', 'cryptocurrency projects', 'tokenomics', 'ico', 'token', 'cardano', 'solana'],
    relatedTopics: ['Bitcoin', 'Ethereum', 'Trading'],
    difficulty: 'Intermediate'
  },
  regulation: {
    id: 'regulation',
    title: 'Crypto Regulation & Compliance',
    description: 'Navigate crypto regulations and compliance. Understand US crypto laws, tax implications, regulatory frameworks, and staying compliant.',
    icon: <Briefcase className="h-16 w-16" />,
    gradient: 'from-slate-500 via-gray-600 to-zinc-500',
    keywords: ['regulation', 'compliance', 'tax', 'legal', 'sec', 'irs', 'kyc', 'aml'],
    relatedTopics: ['Trading', 'DeFi', 'Security'],
    difficulty: 'Intermediate'
  }
};

interface LearnTopicPageProps {
  topic: string;
}

export default function LearnTopicPage({ topic }: LearnTopicPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const config = topicConfigs[topic];

  const { data: allLearnPosts, isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: getBlogPosts,
  });

  if (!config) {
    return (
      <div className="min-h-screen bg-background">
        <PriceTicker />
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-bold text-card-foreground mb-4">Topic Not Found</h1>
          <Link href="/learn">
            <Button data-testid="button-back-to-learn">Back to Learn</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Filter posts by topic keywords first
  const topicPosts = allLearnPosts?.filter(post =>
    config.keywords.some(keyword =>
      (post.title || '').toLowerCase().includes(keyword.toLowerCase()) ||
      (post.excerpt || '').toLowerCase().includes(keyword.toLowerCase()) ||
      (post.category || '').toLowerCase().includes(keyword.toLowerCase())
    )
  );

  const filteredArticles = topicPosts?.filter(article =>
    searchTerm === '' ||
    (article.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (article.excerpt || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background" data-testid={`page-learn-${topic}`}>
      <SEO
        title={`${config.title} - Crypto Education`}
        description={config.description}
        keywords={config.keywords.join(', ')}
      />
      <PriceTicker />
      <Navbar />

      {/* Hero Section */}
      <section className={`relative bg-gradient-to-br ${config.gradient} py-20 border-b border-border`}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/learn">
            <Button
              variant="outline"
              className="mb-6 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              data-testid="button-back"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Learn Hub
            </Button>
          </Link>

          <div className="flex items-center gap-6 mb-6">
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
              {config.icon}
            </div>
            <div>
              <Badge className="mb-3 bg-white/20 text-white border-white/30" data-testid="badge-difficulty">
                {config.difficulty}
              </Badge>
              <h1 className="text-5xl font-bold text-white mb-4" data-testid="text-page-title">
                {config.title}
              </h1>
            </div>
          </div>

          <p className="text-xl text-white/90 max-w-3xl" data-testid="text-page-description">
            {config.description}
          </p>

          {config.relatedTopics.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="text-white/70 text-sm">Related Topics:</span>
              {config.relatedTopics.map((relatedTopic) => (
                <Link key={relatedTopic} href={`/learn/${relatedTopic.toLowerCase()}`}>
                  <Badge
                    variant="outline"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20 cursor-pointer"
                    data-testid={`badge-related-${relatedTopic.toLowerCase()}`}
                  >
                    {relatedTopic}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-card/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-2xl w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder={`Search ${config.title} articles...`}
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  data-testid="input-search"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground" data-testid="text-article-count">
                {filteredArticles?.length || 0} Articles Available
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading articles...</p>
            </div>
          ) : !filteredArticles || filteredArticles.length === 0 ? (
            <Card className="p-12 text-center" data-testid="card-empty-state">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-card-foreground mb-2">No Articles Available Yet</h3>
              <p className="text-muted-foreground mb-6">
                We're working on creating comprehensive {config.title.toLowerCase()} content. Check back soon!
              </p>
              <Link href="/learn">
                <Button variant="outline" data-testid="button-browse-all">
                  Browse All Topics
                </Button>
              </Link>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Link key={article.id} href={`/article/${article.id}`}>
                  <Card
                    className="h-full hover-elevate active-elevate-2 cursor-pointer transition-all duration-300"
                    data-testid={`card-article-${article.id}`}
                  >
                    {article.coverImage && (
                      <div className="relative h-48 overflow-hidden rounded-t-lg">
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      {article.category && (
                        <Badge className="mb-3" data-testid={`badge-category-${article.id}`}>
                          {article.category}
                        </Badge>
                      )}
                      <h3 className="text-xl font-bold text-card-foreground mb-3 line-clamp-2" data-testid={`text-title-${article.id}`}>
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="text-muted-foreground mb-4 line-clamp-3" data-testid={`text-excerpt-${article.id}`}>
                          {article.excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span data-testid={`text-author-${article.id}`}>{article.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span data-testid={`text-readtime-${article.id}`}>{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
