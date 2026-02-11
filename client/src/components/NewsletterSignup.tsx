import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Mail, CheckCircle } from 'lucide-react';

interface NewsletterSignupProps {
  variant?: 'default' | 'compact' | 'hero';
}

export default function NewsletterSignup({ variant = 'default' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // todo: remove mock functionality - implement actual newsletter signup
    console.log('Newsletter signup:', email);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      setEmail('');
    }, 1000);
  };

  const isCompact = variant === 'compact';
  const isHero = variant === 'hero';

  if (isSubmitted) {
    return (
      <Card className={`p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 ${
        isCompact ? 'text-center' : ''
      }`} data-testid="newsletter-success">
        <div className="flex items-center justify-center space-x-2 text-primary mb-2">
          <CheckCircle className="h-5 w-5" />
          <span className="font-semibold" data-testid="text-success-title">Subscribed!</span>
        </div>
        <p className="text-sm text-muted-foreground text-center" data-testid="text-success-message">
          Welcome to Pyrax! Check your email to confirm your subscription.
        </p>
        <Button 
          variant="ghost" 
          size="sm" 
          className="mt-3 text-primary hover:text-primary/80"
          onClick={() => setIsSubmitted(false)}
          data-testid="button-subscribe-another"
        >
          Subscribe another email
        </Button>
      </Card>
    );
  }

  if (isHero) {
    return (
      <div className="w-full max-w-md" data-testid="newsletter-hero">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-300"
            data-testid="input-email-hero"
            required
          />
          <Button 
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-black font-semibold"
            data-testid="button-subscribe-hero"
          >
            {isLoading ? 'Joining...' : 'Join'}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <Card className={`p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 ${
      isCompact ? 'p-4' : ''
    }`} data-testid="newsletter-signup">
      <div className={`${isCompact ? 'text-center' : 'mb-4'}`}>
        <div className="flex items-center space-x-2 mb-2">
          <Mail className="h-5 w-5 text-primary" />
          <h3 className={`font-semibold text-card-foreground ${
            isCompact ? 'text-base' : 'text-lg'
          }`} data-testid="text-newsletter-title">
            {isCompact ? 'Stay Updated' : 'Pyrax Newsletter'}
          </h3>
        </div>
        <p className={`text-muted-foreground ${
          isCompact ? 'text-xs mb-3' : 'text-sm'
        }`} data-testid="text-newsletter-description">
          {isCompact 
            ? 'Get crypto news delivered to your inbox'
            : 'Get the latest cryptocurrency news, market analysis, and exclusive insights delivered directly to your inbox.'
          }
        </p>
      </div>

      <form onSubmit={handleSubmit} className={`${
        isCompact ? 'flex space-x-2' : 'space-y-4'
      }`}>
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={isCompact ? 'flex-1' : 'w-full'}
          data-testid="input-email"
          required
        />
        <Button 
          type="submit"
          disabled={isLoading}
          className={`bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-black font-semibold ${
            isCompact ? '' : 'w-full'
          }`}
          data-testid="button-subscribe"
        >
          {isLoading ? (
            <span>Subscribing...</span>
          ) : (
            <span>{isCompact ? 'Join' : 'Subscribe to Newsletter'}</span>
          )}
        </Button>
      </form>

      {!isCompact && (
        <p className="text-xs text-muted-foreground mt-3 text-center" data-testid="text-privacy">
          By subscribing, you agree to our privacy policy. Unsubscribe at any time.
        </p>
      )}
    </Card>
  );
}