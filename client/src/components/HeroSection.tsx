import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, User } from 'lucide-react';
import { Link } from 'wouter';
import heroImage from '@assets/stock_images/cryptocurrency_bitco_dc2a9a3e.jpg';

interface HeroArticle {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
}

interface HeroSectionProps {
  article?: HeroArticle;
}

export default function HeroSection({ article }: HeroSectionProps) {
  // todo: remove mock functionality - replace with real article data
  const defaultArticle: HeroArticle = {
    id: '1',
    title: 'Bitcoin Surges Past $45,000 as Institutional Adoption Accelerates',
    excerpt: 'Major financial institutions continue to embrace cryptocurrency, driving unprecedented market growth and mainstream acceptance. This latest surge marks a significant milestone in Bitcoin\'s journey toward becoming a store of value.',
    image: heroImage,
    category: 'Bitcoin',
    author: 'Sarah Chen',
    publishedAt: '2 hours ago',
    readTime: '3 min read'
  };

  const heroArticle = article || defaultArticle;

  return (
    <section className="relative overflow-hidden bg-black" data-testid="hero-section">
      <div className="relative h-[600px] md:h-[700px]">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0">
          <img 
            src={heroArticle.image} 
            alt={heroArticle.title}
            className="w-full h-full object-cover"
            data-testid="img-hero"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            {/* Category Badge */}
            <Badge 
              className="mb-4 bg-gradient-to-r from-primary to-accent text-black font-semibold"
              data-testid="badge-category"
            >
              {heroArticle.category}
            </Badge>

            {/* Title */}
            <h1 
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
              data-testid="text-hero-title"
            >
              {heroArticle.title}
            </h1>

            {/* Excerpt */}
            <p 
              className="text-xl text-gray-300 mb-8 leading-relaxed"
              data-testid="text-hero-excerpt"
            >
              {heroArticle.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex items-center space-x-6 mb-8 text-gray-400">
              <div className="flex items-center space-x-2" data-testid="meta-author">
                <User className="h-4 w-4" />
                <span className="text-sm">{heroArticle.author}</span>
              </div>
              <div className="flex items-center space-x-2" data-testid="meta-time">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{heroArticle.publishedAt}</span>
              </div>
              <span className="text-sm" data-testid="text-read-time">{heroArticle.readTime}</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/article/${heroArticle.id}`}>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-black font-semibold"
                  data-testid="button-read-article"
                >
                  Read Full Article
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10"
                data-testid="button-subscribe"
                onClick={() => console.log('Subscribe to newsletter triggered')}
              >
                Subscribe for Updates
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}