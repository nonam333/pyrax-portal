import LegalPageLayout from '@/components/LegalPageLayout';
import SEO from '@/components/SEO';

export default function TermsPage() {
  return (
    <>
      <SEO 
        title="Terms of Service - Pyrax"
        description="Review Pyrax's terms of service including user agreement, permitted use, intellectual property rights, disclaimers, and limitations of liability for our cryptocurrency news platform."
        keywords="terms of service, user agreement, terms and conditions, legal terms, service agreement"
        noindex={true}
      />
      <LegalPageLayout 
        title="Terms of Service" 
        lastUpdated="January 2025"
        badge="Legal"
      >
      <div className="space-y-6 text-card-foreground">
        <section>
          <h2 className="text-2xl font-bold mb-4">Agreement to Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            By accessing and using Pyrax, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these Terms of Service, please do not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Use of Services</h2>
          <h3 className="text-xl font-semibold mb-2">Permitted Use</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            You may use our services for lawful purposes only. You agree not to:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Use the service in any way that violates applicable laws or regulations</li>
            <li>Impersonate or attempt to impersonate Pyrax, a Pyrax employee, or another user</li>
            <li>Engage in any activity that interferes with or disrupts the service</li>
            <li>Attempt to gain unauthorized access to any portion of the service</li>
            <li>Use automated systems to access the service without our express written permission</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Intellectual Property Rights</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The content on Pyrax, including but not limited to text, graphics, logos, images, and software, is the property of Pyrax or its content suppliers and is protected by copyright, trademark, and other intellectual property laws.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            You may not reproduce, distribute, modify, create derivative works, publicly display, or exploit any content from our services without our express written permission.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">User Content</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            If you submit, post, or otherwise make available any content on our services (comments, reviews, etc.), you grant Pyrax a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display such content in connection with our services.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            You represent and warrant that you own or have the necessary rights to any content you submit and that your content does not violate any third-party rights or applicable laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Disclaimer of Warranties</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>IMPORTANT:</strong> The information provided on Pyrax is for general informational purposes only. We make no representations or warranties of any kind, express or implied, about:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>The accuracy, reliability, or completeness of any information</li>
            <li>The suitability of the information for any particular purpose</li>
            <li>The cryptocurrency market or specific digital assets</li>
            <li>Investment, financial, legal, or tax advice</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            The service is provided "AS IS" and "AS AVAILABLE" without any warranties of any kind.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Investment Risk Disclaimer</h2>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-destructive">CRYPTOCURRENCY INVESTMENTS CARRY SIGNIFICANT RISK.</strong> The cryptocurrency market is highly volatile and unpredictable. You should never invest more than you can afford to lose. Past performance is not indicative of future results. Pyrax is not a financial advisor and does not provide investment advice.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
          <p className="text-muted-foreground leading-relaxed">
            To the maximum extent permitted by law, Pyrax shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Indemnification</h2>
          <p className="text-muted-foreground leading-relaxed">
            You agree to indemnify and hold harmless Pyrax and its affiliates, officers, agents, and employees from any claim or demand, including reasonable attorneys' fees, made by any third party due to or arising out of your use of the service, violation of these Terms, or infringement of any intellectual property or other right of any person or entity.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Modifications to Service</h2>
          <p className="text-muted-foreground leading-relaxed">
            We reserve the right to modify or discontinue, temporarily or permanently, the service (or any part thereof) with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
          <p className="text-muted-foreground leading-relaxed">
            These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            We reserve the right to update or modify these Terms at any time. Your continued use of the service after any such changes constitutes your acceptance of the new Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <p className="text-primary mt-2">
            Email: legal@pyrax.com<br />
            Address: 123 Crypto Street, San Francisco, CA 94102
          </p>
        </section>
      </div>
    </LegalPageLayout>
    </>
  );
}
