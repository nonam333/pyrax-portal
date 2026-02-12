import PriceTicker from '@/components/PriceTicker';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  badge?: string;
  children: React.ReactNode;
}

export default function LegalPageLayout({ title, lastUpdated, badge, children }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <PriceTicker />
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8 text-center">
          {badge && (
            <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-black">
              {badge}
            </Badge>
          )}
          <h1 className="text-4xl font-bold text-foreground mb-4">{title}</h1>
          <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
        </div>
        
        <Card className="p-8">
          <div className="prose prose-invert max-w-none">
            {children}
          </div>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}
