import LegalPageLayout from '@/components/LegalPageLayout';
import SEO from '@/components/SEO';

export default function PrivacyPage() {
  return (
    <>
      <SEO 
        title="Privacy Policy - Pyrax"
        description="Learn how Pyrax collects, uses, and protects your personal information. Read our comprehensive privacy policy covering data collection, cookies, security measures, and your privacy rights."
        keywords="privacy policy, data protection, personal information, cookies, user privacy, data security"
        noindex={true}
      />
      <LegalPageLayout 
        title="Privacy Policy" 
        lastUpdated="January 2025"
        badge="Legal"
      >
      <div className="space-y-6 text-card-foreground">
        <section>
          <h2 className="text-2xl font-bold mb-4">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            At Pyrax, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
          <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We may collect personal information that you voluntarily provide to us when you:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Subscribe to our newsletter</li>
            <li>Create a user account</li>
            <li>Contact our customer support</li>
            <li>Participate in surveys or promotions</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">Automatically Collected Information</h3>
          <p className="text-muted-foreground leading-relaxed">
            When you visit our website, we automatically collect certain information about your device, including:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>IP address and browser type</li>
            <li>Operating system and device information</li>
            <li>Referring/exit pages and URLs</li>
            <li>Pages viewed and time spent on pages</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Provide, maintain, and improve our services</li>
            <li>Send you newsletters and marketing communications (with your consent)</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Monitor and analyze usage patterns and trends</li>
            <li>Detect, prevent, and address technical issues and fraudulent activity</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Information Sharing and Disclosure</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li><strong>Service Providers:</strong> With trusted third-party service providers who assist us in operating our website and conducting our business</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights, property, or safety</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            <li><strong>With Your Consent:</strong> When you explicitly consent to the sharing</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Cookies and Tracking Technologies</h2>
          <p className="text-muted-foreground leading-relaxed">
            We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Data Security</h2>
          <p className="text-muted-foreground leading-relaxed">
            We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Depending on your location, you may have the following rights regarding your personal information:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li><strong>Access:</strong> Request access to your personal information</li>
            <li><strong>Correction:</strong> Request correction of inaccurate information</li>
            <li><strong>Deletion:</strong> Request deletion of your personal information</li>
            <li><strong>Opt-Out:</strong> Opt out of marketing communications</li>
            <li><strong>Data Portability:</strong> Request a copy of your data in a structured format</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child without parental consent, we will take steps to delete that information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at:
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
