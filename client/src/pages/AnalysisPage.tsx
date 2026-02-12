import { getBlogPostsByContentType } from "@/lib/blog-api";
import { useQuery } from '@tanstack/react-query';
import PriceTicker from '@/components/PriceTicker';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, FileText, Users, BarChart3, Calendar } from 'lucide-react';
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

export default function AnalysisPage() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ['blog-posts', 'Analysis'],
    queryFn: () => getBlogPostsByContentType('Analysis'),
  });

  return (
    <div className="min-h-screen bg-background" data-testid="page-analysis">
      <PriceTicker />
      <Navbar />

      {/* Hero */}
      <section className="bg-card border-b border-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-black">Analysis & Research</Badge>
          <h1 className="text-5xl font-bold text-card-foreground mb-4" data-testid="text-page-title">
            Deep Market Analysis
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl" data-testid="text-page-description">
            Professional-grade market analysis, research reports, and expert insights to inform your crypto decisions.
          </p>
        </div>
      </section>

      {/* Latest Analysis */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-card-foreground mb-8" data-testid="text-latest-analysis-title">
            <BarChart3 className="inline-block h-8 w-8 mr-3 text-primary" />
            Latest Analysis
          </h2>

          {isLoadingPosts ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading latest analysis...</p>
            </div>
          ) : !analysisPosts || analysisPosts.length === 0 ? (
            <Card className="p-12 text-center" data-testid="card-empty-state">
              <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-card-foreground mb-2">No Analysis Available Yet</h3>
              <p className="text-muted-foreground">
                Check back soon for the latest market analysis and research reports.
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {analysisPosts.slice(0, 6).map((post) => (
                <Card
                  key={post.id}
                  className="p-6 hover-elevate active-elevate-2 transition-all cursor-pointer"
                  data-testid={`card-analysis-post-${post.id}`}
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
          <h2 className="text-3xl font-bold text-card-foreground mb-4">Get Professional Analysis Delivered</h2>
          <p className="text-lg text-muted-foreground mb-8">Subscribe to receive our daily market analysis and research reports</p>
          <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-black font-semibold" data-testid="button-subscribe-analysis">
            Subscribe to Analysis
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
