import PriceTicker from '@/components/PriceTicker';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Target, Award, Shield, Eye, Globe, Mail, Linkedin, Twitter, MessageCircle, Youtube, Send, ExternalLink } from 'lucide-react';
import NewsletterSignup from '@/components/NewsletterSignup';

export default function AboutPage() {
  const stats = [
    { label: '2.4M Readers', value: '2.4M' },
    { label: '250K Subscribers', value: '250K' },
    { label: '99.7% Accuracy', value: '99.7%' }
  ];

  const coreValues = [
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Accuracy',
      description: 'Every story requires triple-source verification. We prioritize factual reporting over speed to market.'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Independence',
      description: 'Complete editorial independence. No sponsored content. No pay-for-play. No hidden agendas.'
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: 'Transparency',
      description: 'Clear disclosure of sources, methodologies, and any potential conflicts of interest.'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Clarity',
      description: 'Complex crypto topics explained in plain English. Accessible knowledge for everyone.'
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'US-Focused',
      description: 'Specific guidance for American investors, covering IRS tax rules and SEC regulations.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Community-Driven',
      description: 'Built for the crypto community, by crypto enthusiasts. Your feedback shapes our coverage.'
    }
  ];

  const editorialStandards = [
    'Triple-source verification for all claims',
    'Transparent corrections and updates',
    'Staff disclosure policy on holdings',
    'No advertiser influence on editorial'
  ];

  const socialLinks = [
    { platform: 'Twitter', icon: <Twitter className="h-5 w-5" />, followers: '245K', link: 'https://twitter.com/pyrax' },
    { platform: 'Discord', icon: <MessageCircle className="h-5 w-5" />, followers: '89K', link: 'https://discord.gg/pyrax' },
    { platform: 'YouTube', icon: <Youtube className="h-5 w-5" />, followers: '156K', link: 'https://youtube.com/pyrax' },
    { platform: 'Telegram', icon: <Send className="h-5 w-5" />, followers: '102K', link: 'https://t.me/pyrax' },
    { platform: 'LinkedIn', icon: <Linkedin className="h-5 w-5" />, followers: '67K', link: 'https://linkedin.com/company/pyrax' }
  ];

  const contactEmails = [
    { label: 'News Tips', email: 'tips@pyrax.io' },
    { label: 'General Inquiries', email: 'hello@pyrax.io' },
    { label: 'Corrections', email: 'corrections@pyrax.io' }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-about">
      <SEO 
        title="About Pyrax - America's Independent Voice in Cryptocurrency"
        description="Pyrax delivers verified crypto intelligence for American investors. Triple-source verification. No sponsored content. Complete editorial independence."
        keywords="about pyrax, cryptocurrency news, crypto journalism, editorial team, crypto media, blockchain news source"
        schema={{
          type: 'organization',
          name: 'Pyrax',
          description: "America's independent cryptocurrency news and markets portal with verified analysis",
          sameAs: [
            'https://twitter.com/pyrax',
            'https://linkedin.com/company/pyrax'
          ]
        }}
      />
      <PriceTicker />
      <Navbar />
      
      {/* Section 1: Hero */}
      <section className="relative bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-card-foreground mb-6" data-testid="text-hero-title">
              America's Independent Voice in Cryptocurrency
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10" data-testid="text-hero-description">
              Verified news, analysis, and education. No sponsored content. No hidden agendas.
            </p>
            
            {/* Stats Row */}
            <div className="flex flex-wrap justify-center gap-8 mb-10">
              {stats.map((stat, index) => (
                <div key={index} className="text-center" data-testid={`stat-${index}`}>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => scrollToSection('mission')}
                data-testid="button-our-mission"
              >
                Our Mission
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => scrollToSection('team')}
                data-testid="button-meet-team"
              >
                Meet Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Mission */}
      <section id="mission" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6" data-testid="text-mission-title">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-mission-description">
                Pyrax delivers verified crypto intelligence for American investors. Every story requires triple-source verification. No pay-for-play. Complete editorial independence. Built on transparency, not hype.
              </p>
            </div>
            
            {/* Animated Timeline */}
            <Card className="p-8">
              <h3 className="text-xl font-semibold text-card-foreground mb-6" data-testid="text-timeline-title">
                Our Journey
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4" data-testid="milestone-2024">
                  <div className="flex-shrink-0 w-20 font-bold text-primary">2024</div>
                  <div className="text-muted-foreground">Platform launch with focus on verified crypto news</div>
                </div>
                <div className="flex gap-4" data-testid="milestone-2025">
                  <div className="flex-shrink-0 w-20 font-bold text-primary">2025</div>
                  <div className="text-muted-foreground">Reached 2.4M readers, launched education hub</div>
                </div>
                <div className="flex gap-4" data-testid="milestone-2026">
                  <div className="flex-shrink-0 w-20 font-bold text-primary">2026</div>
                  <div className="text-muted-foreground">Expanding investigative journalism team</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 3: Core Values */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-card-foreground mb-4" data-testid="text-values-title">
              Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, index) => (
              <Card key={index} className="p-6 hover-elevate" data-testid={`card-value-${index}`}>
                <div className="text-primary mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Editorial Standards */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="text-editorial-title">
              Editorial Standards
            </h2>
          </div>
          <Card className="p-8">
            <ul className="space-y-4 mb-6">
              {editorialStandards.map((standard, index) => (
                <li key={index} className="flex items-start gap-3" data-testid={`standard-${index}`}>
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <span className="text-muted-foreground">{standard}</span>
                </li>
              ))}
            </ul>
            <Button variant="outline" className="w-full sm:w-auto" data-testid="button-download-policy">
              <ExternalLink className="h-4 w-4 mr-2" />
              Download Full Policy PDF
            </Button>
          </Card>
        </div>
      </section>

      {/* Section 5: The Team */}
      <section id="team" className="py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-card-foreground mb-4" data-testid="text-team-title">
              The Team
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Founder Card */}
            <Card className="p-8 hover-elevate" data-testid="card-founder">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-accent flex-shrink-0 flex items-center justify-center text-black font-bold text-3xl">
                  SC
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-card-foreground mb-1">
                    Sarah Chen
                  </h3>
                  <Badge className="mb-3">Founder & Editor-in-Chief</Badge>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    Former Bloomberg crypto reporter with 10+ years covering financial markets. Led investigative coverage of major crypto scandals. Graduate of Columbia Journalism School.
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Holdings: BTC, ETH (disclosed quarterly)
                  </p>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" data-testid="button-founder-twitter">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" data-testid="button-founder-linkedin">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" data-testid="button-founder-email">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Join Us Card */}
            <Card className="p-8 hover-elevate flex flex-col justify-center" data-testid="card-join-us">
              <div className="text-center">
                <Users className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-card-foreground mb-4">
                  Join Our Team
                </h3>
                <p className="text-muted-foreground mb-6">
                  We're looking for talented journalists, analysts, and developers who share our commitment to editorial excellence.
                </p>
                <Button data-testid="button-careers">
                  <Mail className="h-4 w-4 mr-2" />
                  careers@pyrax.io
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 6: Social & Contact */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Social Links */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8" data-testid="text-social-title">
                Follow Us
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <Card key={index} className="p-6 hover-elevate" data-testid={`card-social-${index}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-primary">
                          {social.icon}
                        </div>
                        <div>
                          <div className="font-semibold text-card-foreground">{social.platform}</div>
                          <div className="text-sm text-muted-foreground">{social.followers} followers</div>
                        </div>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full" 
                      data-testid={`button-follow-${index}`}
                      onClick={() => window.open(social.link, '_blank', 'noopener,noreferrer')}
                    >
                      Follow
                    </Button>
                  </Card>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8" data-testid="text-contact-title">
                Contact Us
              </h2>
              <div className="space-y-4">
                {contactEmails.map((contact, index) => (
                  <Card key={index} className="p-6 hover-elevate" data-testid={`card-contact-${index}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-card-foreground mb-1">{contact.label}</div>
                        <a 
                          href={`mailto:${contact.email}`}
                          className="text-primary hover:underline"
                          data-testid={`link-email-${index}`}
                        >
                          {contact.email}
                        </a>
                      </div>
                      <Mail className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Newsletter CTA */}
      <section className="py-20 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-card-foreground mb-4" data-testid="text-newsletter-title">
              Stay Informed
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="text-newsletter-subtitle">
              Join 250K subscribers who trust Pyrax for verified crypto intelligence
            </p>
          </div>
          <NewsletterSignup />
        </div>
      </section>

      <Footer />
    </div>
  );
}
