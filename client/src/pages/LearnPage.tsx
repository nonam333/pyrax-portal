import PriceTicker from '@/components/PriceTicker';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, GraduationCap, Lightbulb, TrendingUp, ArrowRight } from 'lucide-react';

export default function LearnPage() {
  const categories = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: 'Blockchain Basics',
      description: 'Understand the fundamentals of blockchain technology and how it powers cryptocurrencies.',
      articles: 12,
      difficulty: 'Beginner'
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: 'Trading & Investing',
      description: 'Learn strategies for trading cryptocurrencies and building a diversified portfolio.',
      articles: 18,
      difficulty: 'Intermediate'
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: 'DeFi & Web3',
      description: 'Explore decentralized finance protocols and the future of the internet.',
      articles: 15,
      difficulty: 'Advanced'
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Market Analysis',
      description: 'Master technical and fundamental analysis for cryptocurrency markets.',
      articles: 20,
      difficulty: 'Intermediate'
    }
  ];

  const featuredGuides = [
    {
      title: 'Complete Guide to Bitcoin',
      description: 'Everything you need to know about Bitcoin, from basics to advanced concepts.',
      duration: '45 min read',
      level: 'All Levels'
    },
    {
      title: 'Understanding Smart Contracts',
      description: 'Learn how smart contracts work and their role in the blockchain ecosystem.',
      duration: '30 min read',
      level: 'Intermediate'
    },
    {
      title: 'Crypto Security Best Practices',
      description: 'Protect your digital assets with essential security measures and strategies.',
      duration: '25 min read',
      level: 'Beginner'
    }
  ];

  return (
    <div className="min-h-screen bg-background" data-testid="page-learn">
      <PriceTicker />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <Badge 
              className="mb-6 bg-gradient-to-r from-primary to-accent text-black font-semibold text-lg px-6 py-2"
              data-testid="badge-learn"
            >
              Education Center
            </Badge>
            <h1 className="text-5xl font-bold text-card-foreground mb-6" data-testid="text-hero-title">
              Master Cryptocurrency
            </h1>
            <p className="text-xl text-muted-foreground mb-8" data-testid="text-hero-description">
              From beginner guides to advanced trading strategies, expand your crypto knowledge with our comprehensive educational resources.
            </p>
          </div>
        </div>
      </section>

      {/* Learning Categories */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-card-foreground mb-4" data-testid="text-categories-title">
              Learning Paths
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="text-categories-description">
              Choose your path and start learning at your own pace
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category, index) => (
              <Card 
                key={index} 
                className="p-8 hover-elevate active-elevate-2 transition-all cursor-pointer border-border"
                data-testid={`card-category-${index}`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-primary">
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-card-foreground" data-testid={`text-category-title-${index}`}>
                        {category.title}
                      </h3>
                      <Badge 
                        variant="outline" 
                        className="text-xs"
                        data-testid={`badge-difficulty-${index}`}
                      >
                        {category.difficulty}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4" data-testid={`text-category-description-${index}`}>
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground" data-testid={`text-articles-count-${index}`}>
                        {category.articles} articles
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-primary hover:text-primary"
                        data-testid={`button-explore-${index}`}
                      >
                        Explore <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-card-foreground mb-4" data-testid="text-guides-title">
              Featured Guides
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="text-guides-description">
              In-depth guides curated by our expert team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredGuides.map((guide, index) => (
              <Card 
                key={index} 
                className="p-6 hover-elevate active-elevate-2 transition-all cursor-pointer border-border"
                data-testid={`card-guide-${index}`}
              >
                <h3 className="text-xl font-bold text-card-foreground mb-3" data-testid={`text-guide-title-${index}`}>
                  {guide.title}
                </h3>
                <p className="text-muted-foreground mb-4" data-testid={`text-guide-description-${index}`}>
                  {guide.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <Badge variant="outline" data-testid={`badge-level-${index}`}>
                    {guide.level}
                  </Badge>
                  <span className="text-muted-foreground" data-testid={`text-duration-${index}`}>
                    {guide.duration}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-card-foreground mb-4" data-testid="text-cta-title">
            Ready to Start Learning?
          </h2>
          <p className="text-lg text-muted-foreground mb-8" data-testid="text-cta-description">
            Join thousands of crypto enthusiasts expanding their knowledge every day
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-accent text-black font-semibold hover:from-primary/90 hover:to-accent/90"
            data-testid="button-get-started"
          >
            Get Started
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
