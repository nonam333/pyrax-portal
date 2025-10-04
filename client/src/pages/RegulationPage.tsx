import { useQuery } from '@tanstack/react-query';
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
    queryKey: ['/api/blog-posts', { contentType: 'Regulation' }],
    queryFn: async () => {
      const res = await fetch('/api/blog-posts?contentType=Regulation');
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
  });
  const usRegulatory = [
    { title: 'SEC Approves Spot Bitcoin ETF Applications', category: 'SEC', date: '2 hours ago', impact: 'high' },
    { title: 'Congress Proposes New Stablecoin Framework', category: 'Legislative', date: '5 hours ago', impact: 'high' },
    { title: 'IRS Updates Crypto Tax Reporting Requirements', category: 'Tax', date: '1 day ago', impact: 'medium' },
    { title: 'State of Wyoming Launches Blockchain Initiative', category: 'State', date: '2 days ago', impact: 'low' }
  ];

  const compliance = [
    { title: '2026 US Crypto Tax Guide', type: 'Tax Guide', icon: <FileCheck className="h-6 w-6" /> },
    { title: 'KYC/AML Best Practices for Exchanges', type: 'Compliance', icon: <CheckCircle className="h-6 w-6" /> },
    { title: 'Legal Framework for DeFi Protocols', type: 'Legal', icon: <Scale className="h-6 w-6" /> },
    { title: 'Crypto Reporting Obligations Checklist', type: 'Checklist', icon: <FileCheck className="h-6 w-6" /> }
  ];

  const globalNews = [
    { title: 'EU Finalizes MiCA Regulation Implementation', region: 'Europe', date: '3 hours ago' },
    { title: 'Singapore Updates Digital Asset Framework', region: 'Asia', date: '6 hours ago' },
    { title: 'UK Proposes Crypto Advertising Rules', region: 'UK', date: '1 day ago' }
  ];

  const stateGuide = [
    { state: 'California', status: 'Crypto-Friendly', details: 'Clear licensing framework' },
    { state: 'New York', status: 'Regulated', details: 'BitLicense required' },
    { state: 'Wyoming', status: 'Highly Supportive', details: 'Leading crypto legislation' },
    { state: 'Texas', status: 'Friendly', details: 'Mining-friendly policies' }
  ];

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

      {/* US Regulatory */}
      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-card-foreground" data-testid="text-us-regulatory">
              <Scale className="inline-block h-8 w-8 mr-3 text-primary" />
              US Regulatory Updates
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {usRegulatory.map((item, index) => (
              <Card key={index} className="p-6 hover-elevate active-elevate-2 transition-all cursor-pointer" data-testid={`card-regulatory-${index}`}>
                <div className="flex items-start justify-between mb-3">
                  <Badge data-testid={`badge-category-${index}`}>{item.category}</Badge>
                  <Badge 
                    variant={item.impact === 'high' ? 'destructive' : item.impact === 'medium' ? 'default' : 'outline'}
                    data-testid={`badge-impact-${index}`}
                  >
                    {item.impact} impact
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-3" data-testid={`text-regulatory-title-${index}`}>
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.date}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Resources */}
      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-card-foreground" data-testid="text-compliance">
              <FileCheck className="inline-block h-8 w-8 mr-3 text-primary" />
              Compliance Resources
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {compliance.map((item, index) => (
              <Card key={index} className="p-6 hover-elevate active-elevate-2 transition-all cursor-pointer text-center" data-testid={`card-compliance-${index}`}>
                <div className="text-primary mb-4 flex justify-center">{item.icon}</div>
                <h3 className="font-bold text-card-foreground mb-2" data-testid={`text-compliance-title-${index}`}>{item.title}</h3>
                <Badge variant="outline" className="text-xs" data-testid={`badge-type-${index}`}>{item.type}</Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Global Regulations */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-card-foreground" data-testid="text-global">
              <Globe className="inline-block h-8 w-8 mr-3 text-primary" />
              Global Regulations
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {globalNews.map((item, index) => (
              <Card key={index} className="p-6 hover-elevate active-elevate-2 transition-all cursor-pointer" data-testid={`card-global-${index}`}>
                <Badge className="mb-3" data-testid={`badge-region-${index}`}>{item.region}</Badge>
                <h3 className="text-lg font-bold text-card-foreground mb-3" data-testid={`text-global-title-${index}`}>{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.date}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* State-by-State Guide */}
      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-card-foreground" data-testid="text-state-guide">
              <MapPin className="inline-block h-8 w-8 mr-3 text-primary" />
              State-by-State Guide
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stateGuide.map((item, index) => (
              <Card key={index} className="p-6 hover-elevate active-elevate-2 transition-all cursor-pointer" data-testid={`card-state-${index}`}>
                <h3 className="text-lg font-bold text-card-foreground mb-2" data-testid={`text-state-name-${index}`}>{item.state}</h3>
                <Badge 
                  className={`mb-3 ${
                    item.status.includes('Highly') ? 'bg-green-500' :
                    item.status.includes('Friendly') ? 'bg-blue-500' :
                    'bg-yellow-500'
                  } text-black`}
                  data-testid={`badge-status-${index}`}
                >
                  {item.status}
                </Badge>
                <p className="text-sm text-muted-foreground">{item.details}</p>
              </Card>
            ))}
          </div>
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
