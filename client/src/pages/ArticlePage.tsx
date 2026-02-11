import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBlogPost } from "@/lib/blog-api";
import { useRoute, Link } from 'wouter';
import PriceTicker from '@/components/PriceTicker';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Clock, User, Share2, Bookmark, ChevronLeft, Twitter, Facebook, Linkedin, Loader2 } from 'lucide-react';

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

  const { data: article, isLoading, error } = useQuery<BlogPost>({
    queryKey: ['blog-post', params?.id],
    queryFn: () => getBlogPost(params?.id || ''),
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

  const shareUrl = `${window.location.origin} /article/${article.id} `;

  const handleShare = (platform: string) => {
    const text = `${article.title} - ${article.excerpt} `;
    const url = shareUrl;

    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };

    window.open(urls[platform as keyof typeof urls], '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-article">
      <PriceTicker />
      <Navbar />

      {/* Article Header */}
      <div className="bg-card border-b border-border">
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
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Body */}
        <div
          className="prose prose-lg prose-invert max-w-none mb-12"
          style={{
            color: 'hsl(var(--card-foreground))',
          }}
          data-testid="article-content"
          dangerouslySetInnerHTML={{ __html: article.content || '' }}
        />

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
                data-testid="button-share-twitter"
              >
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
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

      <Footer />
    </div>
  );
}