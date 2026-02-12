import NewsletterSignup from '../NewsletterSignup';

export default function NewsletterSignupExample() {
  return (
    <div className="space-y-6 p-6 bg-background">
      <h3 className="text-white text-lg font-semibold">Default Newsletter Signup</h3>
      <NewsletterSignup />
      
      <h3 className="text-white text-lg font-semibold">Compact Newsletter Signup</h3>
      <NewsletterSignup variant="compact" />
      
      <h3 className="text-white text-lg font-semibold">Hero Newsletter Signup</h3>
      <div className="bg-black p-6 rounded-lg">
        <NewsletterSignup variant="hero" />
      </div>
    </div>
  );
}