import PriceTicker from '@/components/PriceTicker';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Target, Award, Shield, Eye, Globe, Mail, Linkedin, MessageCircle, Youtube, Send } from 'lucide-react';
import { SiX } from 'react-icons/si';
import NewsletterSignup from '@/components/NewsletterSignup';

export default function AboutPage() {
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
      title: 'Global Perspective',
      description: 'Serving the worldwide crypto community with insights that matter across all markets and jurisdictions.'
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
    { platform: 'X', icon: <SiX className="h-5 w-5" />, link: 'https://twitter.com/pyrax' },
    { platform: 'Discord', icon: <MessageCircle className="h-5 w-5" />, link: 'https://discord.gg/pyrax' },
    { platform: 'YouTube', icon: <Youtube className="h-5 w-5" />, link: 'https://youtube.com/pyrax' },
    { platform: 'Telegram', icon: <Send className="h-5 w-5" />, link: 'https://t.me/pyrax' },
    { platform: 'LinkedIn', icon: <Linkedin className="h-5 w-5" />, link: 'https://linkedin.com/company/pyrax' }
  ];

  const contactEmails = [
    { label: 'News Tips', email: 'tips@pyrax.io' },
    { label: 'General Inquiries', email: 'contact@pyrax.io' },
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
        title="About Pyrax - The Pulse of the Decentralized Future"
        description="Pyrax is a forward-thinking crypto media platform bridging the gap between complex crypto developments and the global community. Where knowledge is power, and access is universal."
        keywords="about pyrax, cryptocurrency news, crypto journalism, editorial team, crypto media, blockchain news source"
        schema={{
          type: 'organization',
          name: 'Pyrax',
          description: "Global cryptocurrency news and markets portal illuminating the world of blockchain and digital assets",
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
              The Pulse of the Decentralized Future
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10" data-testid="text-hero-description">
              Illuminating the world of blockchain and digital assets. Where knowledge is power, and access is universal.
            </p>

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
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-8 text-center" data-testid="text-mission-title">
              Our Mission
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed" data-testid="text-mission-description">
              <p>
                At Pyrax, our mission is to shape the future of digital awareness by becoming the heartbeat of the global crypto conversation. We believe that blockchain technology and decentralization are more than innovations — they are catalysts for a new era of transparency, freedom, and financial inclusion. Yet, as the space evolves at lightning speed, access to trustworthy, well-explained, and forward-thinking information remains a critical challenge.
              </p>
              <p>
                <strong>That's where we come in.</strong>
              </p>
              <p>
                Pyrax exists to bridge the gap between complexity and clarity. We are building more than a media platform — we are building a movement. A space where curious minds, bold thinkers, and future-shapers can come together to explore, understand, and challenge the boundaries of what's possible in the crypto and Web3 universe.
              </p>
              <p>
                Through in-depth journalism, real-time news, educational content, and expert insights, we empower individuals across all experience levels to make informed decisions, spark innovation, and take part in the decentralized revolution.
              </p>
              <p>
                <strong>We are not just reporting on the future — we are helping build it.</strong>
              </p>
            </div>
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
            <ul className="space-y-4">
              {editorialStandards.map((standard, index) => (
                <li key={index} className="flex items-start gap-3" data-testid={`standard-${index}`}>
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <span className="text-muted-foreground">{standard}</span>
                </li>
              ))}
            </ul>
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
                  UP
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-card-foreground mb-1">
                    Udayan Papney
                  </h3>
                  <Badge className="mb-3">Founder & CEO</Badge>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    Udayan Papney is the visionary Founder and CEO of Pyrax, a forward-thinking crypto media platform created to illuminate the ever-evolving world of blockchain and digital assets. Driven by the belief that information fuels innovation, Udayan built Pyrax to bridge the gap between complex crypto developments and the global community. His mission is to make Pyrax the pulse of the decentralized future—where knowledge is power, and access is universal.
                  </p>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a 
                      href="mailto:udayan@pyrax.io"
                      className="text-primary hover:underline"
                      data-testid="link-founder-email"
                    >
                      udayan@pyrax.io
                    </a>
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
                  contact@pyrax.io
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
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-primary">
                        {social.icon}
                      </div>
                      <div className="font-semibold text-card-foreground">{social.platform}</div>
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
              Join our community and get the latest crypto insights delivered to your inbox
            </p>
          </div>
          <NewsletterSignup />
        </div>
      </section>

      <Footer />
    </div>
  );
}
