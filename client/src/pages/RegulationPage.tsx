import { useQuery } from '@tanstack/react-query';
import { getBlogPostsByContentType } from "@/lib/blog-api";
import PriceTicker from '@/components/PriceTicker';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scale, MapPin, FileCheck, Globe, AlertTriangle, CheckCircle } from 'lucide-react';
import { Link } from 'wouter';

interface BlogPost {
  id: string;
  notionPageId?: string;
  title: string;
  excerpt?: string;
  content?: string;
  category?: string;
  contentType?: string;
  coverImage?: string;
  author: string;
  readTime: string;
  publishedAt: string;
}

export default function RegulationPage() {
  const { data: regulationPosts, isLoading: isLoadingPosts } = useQuery<BlogPost[]>({
    queryKey: ['blog-posts', 'Regulation'],
    queryFn: () => getBlogPostsByContentType('Regulation'),
  });

  return (
    <div className="min-h-screen bg-background" data-testid="page-regulation">
      <PriceTicker />
      <Navbar />

      {/* Hero */}
      <section className="bg-card border-b border-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-black">Regulation & Compliance</Badge>
          <h1 className="text-5xl font-bold text-card-foreground mb-4" data-testid="text-page-title">
            Crypto Regulatory Updates
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl" data-testid="text-page-description">
            Stay informed on US and global cryptocurrency regulations, compliance requirements, and policy changes.
          </p>
        </div>
      </section>

      {/* Regulatory Alert */}
      <section className="py-4 bg-destructive/10 border-b border-destructive/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3" data-testid="alert-regulatory">
            <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0" />
            <p className="text-sm font-medium">
              <span className="text-destructive">Breaking:</span> SEC Issues New Guidance on Crypto Custody Rules
            </p>
          </div>
        </div>
      </section>

      {/* Latest Updates */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-card-foreground mb-8" data-testid="text-latest-updates-title">
            <Scale className="inline-block h-8 w-8 mr-3 text-primary" />
            Latest Updates
          </h2>

          {isLoadingPosts ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading latest updates...</p>
            </div>
          ) : !regulationPosts || regulationPosts.length === 0 ? (
            <Card className="p-12 text-center" data-testid="card-empty-state">
              <Scale className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-card-foreground mb-2">No Updates Available Yet</h3>
              <p className="text-muted-foreground">
                Check back soon for the latest regulatory updates and compliance news.
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regulationPosts.slice(0, 6).map((post) => (
                <Card
                  key={post.id}
                  className="p-6 hover-elevate active-elevate-2 transition-all cursor-pointer"
                  data-testid={`card-regulation-post-${post.id}`}
                >
                  {post.category && (
                    <Badge className="mb-3" data-testid={`badge-category-${post.id}`}>
                      {post.category}
                    </Badge>
                  )}
                  <h3 className="text-xl font-bold text-card-foreground mb-3" data-testid={`text-post-title-${post.id}`}>
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-muted-foreground mb-4 line-clamp-2" data-testid={`text-post-excerpt-${post.id}`}>
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span data-testid={`text-author-${post.id}`}>{post.author}</span>
                    <span>•</span>
                    <span data-testid={`text-read-time-${post.id}`}>{post.readTime}</span>
                    <span>•</span>
                    <span data-testid={`text-published-${post.id}`}>
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-primary/20 via-background to-accent/20 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-card-foreground mb-4">Stay Compliant with Regulatory Updates</h2>
          <p className="text-lg text-muted-foreground mb-8">Get instant alerts on regulatory changes that affect your crypto portfolio</p>
          <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-black font-semibold" data-testid="button-subscribe-regulatory">
            Subscribe to Regulatory Alerts
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
