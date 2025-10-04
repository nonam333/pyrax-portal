import PriceTicker from '@/components/PriceTicker';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Target, Award, TrendingUp, Mail, Linkedin, Twitter } from 'lucide-react';
import NewsletterSignup from '@/components/NewsletterSignup';
import teamImage from '@assets/stock_images/modern_financial_das_e2b2a0f5.jpg';

export default function AboutPage() {
  const stats = [
    { icon: <Users className="h-8 w-8" />, label: 'Daily Readers', value: '250K+' },
    { icon: <TrendingUp className="h-8 w-8" />, label: 'Articles Published', value: '5K+' },
    { icon: <Award className="h-8 w-8" />, label: 'Years of Experience', value: '8+' },
    { icon: <Target className="h-8 w-8" />, label: 'Market Coverage', value: '100%' }
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'Editor-in-Chief',
      bio: 'Former Bloomberg crypto reporter with 10+ years covering financial markets.',
      social: { twitter: '@sarah_crypto', linkedin: 'sarahchen' }
    },
    {
      name: 'Alex Rodriguez', 
      role: 'Lead Analyst',
      bio: 'Expert in DeFi protocols and institutional crypto adoption trends.',
      social: { twitter: '@alex_defi', linkedin: 'alexrodriguez' }
    },
    {
      name: 'Emma Wilson',
      role: 'Technology Writer',
      bio: 'Specialist in blockchain technology and emerging crypto innovations.',
      social: { twitter: '@emma_tech', linkedin: 'emmawilson' }
    }
  ];

  const values = [
    {
      title: 'Accuracy First',
      description: 'We prioritize factual reporting and thorough fact-checking over speed to market.'
    },
    {
      title: 'Unbiased Coverage',
      description: 'Our editorial independence ensures balanced reporting on all crypto developments.'
    },
    {
      title: 'Community Focus',
      description: 'We serve the crypto community by making complex topics accessible to everyone.'
    },
    {
      title: 'Innovation Leadership',
      description: 'We stay ahead of trends to provide insights on the future of digital assets.'
    },
    {
      title: 'Transparency',
      description: 'We clearly disclose our sources, methodologies, and any potential conflicts of interest.'
    },
    {
      title: 'Education-Driven',
      description: 'Beyond news, we empower readers with educational resources to understand crypto fundamentals.'
    }
  ];

  return (
    <div className="min-h-screen bg-background" data-testid="page-about">
      <PriceTicker />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <Badge 
              className="mb-6 bg-gradient-to-r from-primary to-accent text-black font-semibold text-lg px-6 py-2"
              data-testid="badge-about"
            >
              About Pyrax
            </Badge>
            <h1 className="text-5xl font-bold text-card-foreground mb-6" data-testid="text-hero-title">
              The Future of Crypto News
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8" data-testid="text-hero-description">
              Pyrax delivers the most elegant and comprehensive cryptocurrency news experience, 
              combining real-time market data with in-depth analysis to keep you ahead of the curve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-black font-semibold"
                data-testid="button-get-started"
                onClick={() => console.log('Get started clicked')}
              >
                Start Reading
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                data-testid="button-contact"
                onClick={() => console.log('Contact clicked')}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={stat.label} className="p-6 text-center hover-elevate">
                <div className="text-primary mb-4 flex justify-center" data-testid={`icon-stat-${index}`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-card-foreground mb-2" data-testid={`text-value-${index}`}>
                  {stat.value}
                </div>
                <div className="text-muted-foreground" data-testid={`text-label-${index}`}>
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-card-foreground mb-6" data-testid="text-mission-title">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6" data-testid="text-mission-description">
                At Pyrax, we believe that everyone deserves access to accurate, timely, and insightful 
                cryptocurrency news. Our mission is to democratize crypto knowledge by providing 
                institutional-quality analysis in an accessible, elegant format.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-mission-description-2">
                We bridge the gap between complex blockchain technology and everyday understanding, 
                empowering our readers to make informed decisions in the rapidly evolving digital asset landscape.
              </p>
            </div>
            <div className="relative">
              <img 
                src={teamImage} 
                alt="Modern Financial Technology"
                className="rounded-lg w-full h-80 object-cover"
                data-testid="img-mission"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-values-title">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-values-subtitle">
              The principles that guide everything we do at Pyrax
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={value.title} className="p-6 hover-elevate">
                <h3 className="text-xl font-semibold text-card-foreground mb-3" data-testid={`text-value-title-${index}`}>
                  {value.title}
                </h3>
                <p className="text-muted-foreground" data-testid={`text-value-description-${index}`}>
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-card-foreground mb-4" data-testid="text-team-title">
              Meet Our Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-team-subtitle">
              Experienced journalists and analysts dedicated to crypto excellence
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={member.name} className="p-6 text-center hover-elevate">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-accent mx-auto mb-4 flex items-center justify-center text-black font-bold text-2xl">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2" data-testid={`text-member-name-${index}`}>
                  {member.name}
                </h3>
                <Badge variant="secondary" className="mb-3" data-testid={`badge-member-role-${index}`}>
                  {member.role}
                </Badge>
                <p className="text-sm text-muted-foreground mb-4" data-testid={`text-member-bio-${index}`}>
                  {member.bio}
                </p>
                <div className="flex justify-center space-x-3">
                  <Button variant="ghost" size="icon" data-testid={`button-twitter-${index}`}>
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" data-testid={`button-linkedin-${index}`}>
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" data-testid={`button-email-${index}`}>
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Standards Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-editorial-title">
              Editorial Standards
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-editorial-subtitle">
              Our commitment to journalistic integrity and quality
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-3" data-testid="text-standard-1-title">
                Multi-Source Verification
              </h3>
              <p className="text-muted-foreground" data-testid="text-standard-1-description">
                Every claim is verified against multiple credible sources. We never publish single-source stories without clear disclosure.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-3" data-testid="text-standard-2-title">
                Independence
              </h3>
              <p className="text-muted-foreground" data-testid="text-standard-2-description">
                Our editorial team maintains complete independence from advertisers, projects, and external influences.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-3" data-testid="text-standard-3-title">
                Correction Policy
              </h3>
              <p className="text-muted-foreground" data-testid="text-standard-3-description">
                We promptly correct any errors and clearly mark all corrections and updates to published articles.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-3" data-testid="text-standard-4-title">
                Expert Review
              </h3>
              <p className="text-muted-foreground" data-testid="text-standard-4-description">
                Technical articles undergo peer review by blockchain experts before publication to ensure accuracy.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-3" data-testid="text-standard-5-title">
                Conflict Disclosure
              </h3>
              <p className="text-muted-foreground" data-testid="text-standard-5-description">
                We fully disclose any financial interests, partnerships, or potential conflicts related to our coverage.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-3" data-testid="text-standard-6-title">
                Clear Attribution
              </h3>
              <p className="text-muted-foreground" data-testid="text-standard-6-description">
                All sources, data providers, and third-party content are clearly attributed and properly cited.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-card-foreground mb-4" data-testid="text-newsletter-title">
              Stay Connected
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="text-newsletter-subtitle">
              Join thousands of crypto enthusiasts who trust Pyrax for their daily market insights
            </p>
          </div>
          <NewsletterSignup />
        </div>
      </section>

      <Footer />
    </div>
  );
}