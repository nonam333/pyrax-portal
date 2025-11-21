import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRoute, Link } from 'wouter';
import { motion, useScroll, useSpring } from 'framer-motion';
import PriceTicker from '@/components/PriceTicker';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { RichArticleContent } from '@/components/RichArticleContent';
import AdSlot from '@/components/AdSlot';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Clock, User, Share2, Bookmark, ChevronLeft, Facebook, Linkedin, Loader2, ArrowUp } from 'lucide-react';

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

export default function ArticlePage() {
  const [, params] = useRoute('/article/:id');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { data: article, isLoading, error } = useQuery<BlogPost>({
    queryKey: ['/api/blog-posts', params?.id],
    queryFn: async () => {
      const res = await fetch(`/api/blog-posts/${params?.id}`);
      if (!res.ok) throw new Error('Article not found');
      return res.json();
    },
    enabled: !!params?.id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background" data-testid="page-article">
        <PriceTicker />
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading article...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-background" data-testid="page-article">
        <PriceTicker />
        <Navbar />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Card className="p-12 text-center">
            <h1 className="text-3xl font-bold text-card-foreground mb-4">
              Article Not Found
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              This article is not available or may have been removed.
            </p>
            <Link href="/">
              <Button>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Homepage
              </Button>
            </Link>
          </Card>
        </div>
        
        <Footer />
      </div>
    );
  }

  const shareUrl = `${window.location.origin}/article/${article.id}`;

  const handleShare = (platform: string) => {
    const text = `${article.title} - ${article.excerpt}`;
    const url = shareUrl;
    
    const urls = {
      twitter: `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };
    
    window.open(urls[platform as keyof typeof urls], '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-article">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent origin-left z-50"
        style={{ scaleX }}
      />

      <PriceTicker />
      <Navbar />

      {/* Article Header */}
      <motion.div
        className="bg-card border-b border-border"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary" data-testid="button-back">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to News
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Badge 
                className="mb-4 bg-gradient-to-r from-primary to-accent text-black font-semibold"
                data-testid="badge-category"
              >
                {article.category}
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold text-card-foreground mb-6 leading-tight" data-testid="text-article-title">
                {article.title}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed" data-testid="text-article-excerpt">
                {article.excerpt}
              </p>
              
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-6 text-muted-foreground">
                  <div className="flex items-center space-x-2" data-testid="meta-author">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">{article.author}</span>
                  </div>
                  <div className="flex items-center space-x-2" data-testid="meta-time">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{article.publishedAt}</span>
                  </div>
                  <span className="text-sm" data-testid="text-read-time">{article.readTime}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={isBookmarked ? 'bg-primary text-black' : ''}
                    data-testid="button-bookmark"
                  >
                    <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  </Button>
                  <Button variant="outline" size="sm" data-testid="button-share">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {article.coverImage && (
              <div className="lg:col-span-1">
                <img 
                  src={article.coverImage} 
                  alt={article.title}
                  className="w-full h-64 lg:h-80 object-cover rounded-lg"
                  data-testid="img-article-hero"
                />
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Article Content */}
          <div className="lg:col-span-8">
            {/* Top Banner Ad - Above the fold */}
            <div className="mb-8">
              <div className="text-xs text-gray-500 mb-2 text-center">Advertisement</div>
              <div className="flex justify-center">
                <AdSlot size="banner" position="article-top" />
              </div>
            </div>

            {/* Article Body */}
            <div data-testid="article-content">
              <RichArticleContent content={article.content || ''} />
            </div>

            {/* Bottom Banner Ad - Before social sharing */}
            <div className="my-12">
              <div className="text-xs text-gray-500 mb-2 text-center">Advertisement</div>
              <div className="flex justify-center">
                <AdSlot size="banner" position="article-bottom" />
              </div>
            </div>

            {/* Social Sharing */}
            <Card className="p-6 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2" data-testid="text-share-title">
                Share this article
              </h3>
              <p className="text-sm text-muted-foreground" data-testid="text-share-subtitle">
                Help spread important crypto news
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('twitter')}
                data-testid="button-share-x"
              >
                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                X
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleShare('facebook')}
                data-testid="button-share-facebook"
              >
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleShare('linkedin')}
                data-testid="button-share-linkedin"
              >
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </Button>
            </div>
          </div>
        </Card>
          </div>

          {/* Sidebar with sticky ad - Desktop only */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <div>
                <div className="text-xs text-gray-500 mb-2">Advertisement</div>
                <AdSlot size="square" position="article-sidebar" />
              </div>

              {/* Additional sidebar ad space */}
              <div className="mt-8">
                <div className="text-xs text-gray-500 mb-2">Advertisement</div>
                <AdSlot size="square" position="article-sidebar-2" />
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed bottom-8 right-8 z-40"
        >
          <Button
            size="icon"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="h-12 w-12 rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg"
          >
            <ArrowUp className="h-6 w-6 text-black" />
          </Button>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}