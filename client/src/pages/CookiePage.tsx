import LegalPageLayout from '@/components/LegalPageLayout';
import SEO from '@/components/SEO';

export default function CookiePage() {
  return (
    <>
      <SEO 
        title="Cookie Policy - Pyrax"
        description="Understand how Pyrax uses cookies and tracking technologies. Learn about essential cookies, analytics cookies, functionality cookies, and how to manage your cookie preferences."
        keywords="cookie policy, cookies, tracking, analytics cookies, website cookies, cookie preferences"
        noindex={true}
      />
      <LegalPageLayout 
        title="Cookie Policy" 
        lastUpdated="January 2025"
        badge="Legal"
      >
      <div className="space-y-6 text-card-foreground">
        <section>
          <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How We Use Cookies</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Pyrax uses cookies and similar tracking technologies to improve your browsing experience, analyze site traffic, and understand where our visitors are coming from. We use cookies for the following purposes:
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">Essential Cookies</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Session management cookies</li>
            <li>Security cookies for authentication</li>
            <li>Load balancing cookies</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">Analytics Cookies</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We use analytics cookies to understand how visitors interact with our website. This helps us improve our services and content.
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Google Analytics for traffic analysis</li>
            <li>Page view tracking</li>
            <li>User behavior patterns</li>
            <li>Conversion tracking</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">Functionality Cookies</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            These cookies allow the website to remember choices you make and provide enhanced features.
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Language preferences</li>
            <li>Theme preferences (light/dark mode)</li>
            <li>User interface customizations</li>
            <li>Remembered login details</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">Advertising Cookies</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We may use advertising cookies to deliver relevant advertisements and measure their effectiveness.
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Targeted advertising</li>
            <li>Ad frequency capping</li>
            <li>Ad performance measurement</li>
            <li>Retargeting campaigns</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Third-Party Cookies</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            In addition to our own cookies, we may use various third-party cookies to report usage statistics and deliver advertisements:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li><strong>Google Analytics:</strong> Tracks website usage and visitor behavior</li>
            <li><strong>Google AdSense:</strong> Delivers targeted advertisements</li>
            <li><strong>Social Media Platforms:</strong> Enables social sharing features</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Managing Cookies</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            You have the right to decide whether to accept or reject cookies. You can manage your cookie preferences through:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li><strong>Browser Settings:</strong> Most browsers allow you to refuse cookies through their settings</li>
            <li><strong>Cookie Consent Tool:</strong> Use our cookie consent manager to customize your preferences</li>
            <li><strong>Opt-Out Tools:</strong> Visit tools like NAI opt-out or Google's Ad Settings</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            <strong>Note:</strong> Blocking or deleting cookies may impact your experience on our website and limit certain features.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Cookie Lifespan</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Cookies have different lifespans:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li><strong>Session Cookies:</strong> Temporary cookies that are deleted when you close your browser</li>
            <li><strong>Persistent Cookies:</strong> Remain on your device until they expire or you delete them (typically 30 days to 2 years)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Do Not Track Signals</h2>
          <p className="text-muted-foreground leading-relaxed">
            Some browsers include a "Do Not Track" (DNT) feature that signals websites that you do not want to have your online activity tracked. Currently, there is no industry standard for how to respond to DNT signals, and we do not currently respond to DNT browser signals.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Updates to This Policy</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business operations. We encourage you to review this page periodically for the latest information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have questions about our use of cookies, please contact us at:
          </p>
          <p className="text-primary mt-2">
            Email: privacy@pyrax.com<br />
            Address: 123 Crypto Street, San Francisco, CA 94102
          </p>
        </section>
      </div>
    </LegalPageLayout>
    </>
  );
}
