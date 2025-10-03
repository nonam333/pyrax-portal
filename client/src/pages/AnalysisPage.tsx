import PriceTicker from '@/components/PriceTicker';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, FileText, Users, BarChart3, Calendar } from 'lucide-react';
import { Link } from 'wouter';

export default function AnalysisPage() {
  const marketAnalysis = [
    { title: 'Weekly Market Wrap: Bitcoin Consolidates Above $44K', category: 'Market Analysis', author: 'Sarah Chen', time: '2 hours ago', readTime: '8 min' },
    { title: 'Technical Analysis: Ethereum Eyes $2,500 Breakout', category: 'Technical', author: 'Alex Rodriguez', time: '4 hours ago', readTime: '6 min' },
    { title: 'On-Chain Insights: Whales Accumulating During Dip', category: 'On-Chain', author: 'Emma Wilson', time: '6 hours ago', readTime: '10 min' },
    { title: 'Sentiment Analysis: Fear & Greed Index Hits Neutral', category: 'Sentiment', author: 'David Kim', time: '8 hours ago', readTime: '5 min' }
  ];

  const research = [
    { title: 'Q1 2026 Crypto Market Outlook', type: 'Research Report', author: 'Pyrax Research Team', date: '15 min ago' },
    { title: 'DeFi Protocol Revenue Analysis', type: 'Industry Study', author: 'Lisa Zhang', date: '1 day ago' },
    { title: 'Institutional Adoption Survey Results', type: 'Survey', author: 'James Parker', date: '2 days ago' }
  ];

  const expertOpinion = [
    { title: 'Why Bitcoin Will Hit $100K in 2026', author: 'Michael Stevens', role: 'Chief Analyst', image: '' },
    { title: 'The Case for Ethereum in a Multi-Chain World', author: 'Rachel Moore', role: 'DeFi Expert', image: '' },
    { title: 'Regulatory Clarity Will Unlock Growth', author: 'Thomas Lee', role: 'Policy Analyst', image: '' }
  ];

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

      {/* Market Analysis */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-card-foreground" data-testid="text-market-analysis">
              <BarChart3 className="inline-block h-8 w-8 mr-3 text-primary" />
              Market Analysis
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {marketAnalysis.map((item, index) => (
              <Card key={index} className="p-6 hover-elevate active-elevate-2 transition-all cursor-pointer" data-testid={`card-analysis-${index}`}>
                <Badge className="mb-3" data-testid={`badge-category-${index}`}>{item.category}</Badge>
                <h3 className="text-xl font-bold text-card-foreground mb-3" data-testid={`text-analysis-title-${index}`}>{item.title}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{item.author}</span>
                  <span>•</span>
                  <span>{item.time}</span>
                  <span>•</span>
                  <span>{item.readTime} read</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Research Reports */}
      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-card-foreground" data-testid="text-research">
              <FileText className="inline-block h-8 w-8 mr-3 text-primary" />
              Research Reports
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {research.map((item, index) => (
              <Card key={index} className="p-6 hover-elevate active-elevate-2 transition-all cursor-pointer" data-testid={`card-research-${index}`}>
                <Badge variant="outline" className="mb-3" data-testid={`badge-type-${index}`}>{item.type}</Badge>
                <h3 className="text-lg font-bold text-card-foreground mb-3" data-testid={`text-research-title-${index}`}>{item.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{item.date}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">By {item.author}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Opinion */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-card-foreground" data-testid="text-expert-opinion">
              <Users className="inline-block h-8 w-8 mr-3 text-primary" />
              Expert Opinion
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {expertOpinion.map((item, index) => (
              <Card key={index} className="p-6 hover-elevate active-elevate-2 transition-all cursor-pointer" data-testid={`card-opinion-${index}`}>
                <h3 className="text-xl font-bold text-card-foreground mb-4" data-testid={`text-opinion-title-${index}`}>{item.title}</h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent" />
                  <div>
                    <p className="font-semibold text-card-foreground">{item.author}</p>
                    <p className="text-sm text-muted-foreground">{item.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
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
