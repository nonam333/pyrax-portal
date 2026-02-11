import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import NewsletterSignup from './NewsletterSignup';
import { Twitter, Forward, Github, Mail, ExternalLink } from 'lucide-react';
import pyraxLogo from '@assets/PyraxLogo-Photoroom_1758930195519.png';

export default function Footer() {
  const quickLinks = [
    { label: 'News', href: '/' },
    { label: 'Markets', href: '/markets' },
    { label: 'Community', href: '/community' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Disclaimer', href: '/disclaimer' }
  ];

  const socialLinks = [
    { 
      icon: <Twitter className="h-5 w-5" />, 
      href: 'https://twitter.com/pyrax', 
      label: 'Twitter',
      testId: 'link-twitter'
    },
    { 
      icon: <Forward className="h-5 w-5" />, 
      href: 'https://t.me/pyrax', 
      label: 'Forward',
      testId: 'link-telegram'
    },
    { 
      icon: <Github className="h-5 w-5" />, 
      href: 'https://github.com/pyrax', 
      label: 'GitHub',
      testId: 'link-github'
    },
    { 
      icon: <Mail className="h-5 w-5" />, 
      href: 'mailto:contact@pyrax.com', 
      label: 'Email',
      testId: 'link-email'
    }
  ];

  return (
    <footer className="bg-black border-t border-border pt-16 pb-8" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <Link href="/" data-testid="link-footer-logo">
              <img 
                src={pyraxLogo} 
                alt="Pyrax" 
                className="h-10 w-auto mb-4 hover-elevate transition-transform duration-200"
                data-testid="img-footer-logo"
              />
            </Link>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed" data-testid="text-description">
              Pyrax is the most elegant crypto news and markets portal, providing real-time cryptocurrency prices, breaking news, and market analysis.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.testId}
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-primary hover:bg-primary/10"
                  onClick={() => {
                    console.log(`${social.label} link clicked`);
                    // todo: remove mock functionality - implement real social links
                  }}
                  data-testid={social.testId}
                >
                  {social.icon}
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-foreground mb-4" data-testid="text-quick-links-title">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} data-testid={`link-${link.label.toLowerCase().replace(' ', '-')}`}>
                    <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-foreground mb-4" data-testid="text-legal-title">
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} data-testid={`link-${link.label.toLowerCase().replace(' ', '-')}`}>
                    <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-foreground mb-4" data-testid="text-newsletter-footer-title">
              Stay Updated
            </h3>
            <NewsletterSignup variant="compact" />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-muted-foreground mb-4 md:mb-0" data-testid="text-copyright">
              © 2025 Pyrax. All rights reserved.
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <div className="text-xs text-muted-foreground" data-testid="text-disclaimer">
                Cryptocurrency prices are subject to high market risk and volatility.
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground hover:text-primary"
                  onClick={() => console.log('API status clicked')}
                  data-testid="button-api-status"
                >
                  <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                  API Status
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}