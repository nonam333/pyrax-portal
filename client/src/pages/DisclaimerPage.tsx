import LegalPageLayout from '@/components/LegalPageLayout';
import SEO from '@/components/SEO';

export default function DisclaimerPage() {
  return (
    <>
      <SEO 
        title="Investment Disclaimer - Pyrax"
        description="Important disclaimer about cryptocurrency investment risks. Pyrax provides information for educational purposes only and is not financial advice. Understand market risks before investing."
        keywords="investment disclaimer, financial disclaimer, crypto risks, market risk warning, not financial advice"
        noindex={true}
      />
      <LegalPageLayout 
        title="Disclaimer" 
        lastUpdated="January 2025"
        badge="Important"
      >
      <div className="space-y-6 text-card-foreground">
        <section className="bg-destructive/10 border border-destructive/30 p-4 rounded-md">
          <h2 className="text-2xl font-bold mb-3 text-destructive">Important Notice</h2>
          <p className="text-foreground leading-relaxed font-semibold">
            The information provided on Pyrax is for informational and educational purposes only and should not be construed as financial, investment, legal, or tax advice. Cryptocurrency investments carry significant risk.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">No Financial Advice</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Pyrax is a news and information platform. We are not financial advisors, investment advisors, or broker-dealers. Nothing on this website should be considered as:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Investment advice or recommendations to buy, sell, or hold any cryptocurrency</li>
            <li>Financial planning or wealth management guidance</li>
            <li>Legal, tax, or accounting advice</li>
            <li>An offer to sell or solicitation to buy any securities or financial instruments</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Always consult with qualified financial, legal, and tax professionals before making any investment decisions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Market Risk Warning</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong className="text-destructive">Cryptocurrency trading and investment involve substantial risk of loss.</strong> You should be aware that:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Cryptocurrency prices are extremely volatile and can fluctuate dramatically in short periods</li>
            <li>Past performance is not indicative of future results</li>
            <li>You may lose some or all of your invested capital</li>
            <li>Cryptocurrencies are not backed by any government or central authority</li>
            <li>The cryptocurrency market operates 24/7 with no circuit breakers or trading halts</li>
            <li>Regulatory changes can significantly impact cryptocurrency values</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Accuracy of Information</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            While we strive to provide accurate and up-to-date information:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Information on our website may contain inaccuracies or typographical errors</li>
            <li>Market data and prices are provided by third-party sources and may be delayed</li>
            <li>News and analysis represent our editorial opinions and may not be suitable for all investors</li>
            <li>We do not guarantee the accuracy, completeness, or timeliness of any information</li>
            <li>Information can become outdated quickly in the fast-moving cryptocurrency market</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Third-Party Content</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our website may contain links to third-party websites, services, or content. We do not endorse, control, or assume responsibility for any third-party content. Your interactions with third-party sites are governed by their own terms and privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Affiliate Relationships</h2>
          <p className="text-muted-foreground leading-relaxed">
            Pyrax may have affiliate relationships with certain cryptocurrency exchanges, wallet providers, or other services mentioned on our website. We may receive compensation for referrals or when you use these services. However, this does not influence our editorial content or recommendations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">No Warranty</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The website and all information, content, materials, and services are provided "AS IS" and "AS AVAILABLE" without any warranty of any kind, either express or implied, including but not limited to:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Warranties of merchantability or fitness for a particular purpose</li>
            <li>Warranties regarding the availability, reliability, or accuracy of information</li>
            <li>Warranties that the website will be uninterrupted or error-free</li>
            <li>Warranties that defects will be corrected</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
          <p className="text-muted-foreground leading-relaxed">
            To the maximum extent permitted by law, Pyrax and its affiliates, officers, employees, agents, and licensors shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including but not limited to damages for loss of profits, goodwill, use, data, or other intangible losses resulting from your use of the website or reliance on any information provided.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Personal Responsibility</h2>
          <p className="text-muted-foreground leading-relaxed">
            You acknowledge and agree that:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>You are solely responsible for your own investment decisions</li>
            <li>You should conduct your own research and due diligence</li>
            <li>You understand the risks associated with cryptocurrency investments</li>
            <li>You will not hold Pyrax liable for any losses incurred</li>
            <li>You will comply with all applicable laws and regulations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Jurisdictional Issues</h2>
          <p className="text-muted-foreground leading-relaxed">
            This website is controlled and operated from the United States. We make no representation that materials on the website are appropriate or available for use in other locations. Access to the website from jurisdictions where its contents are illegal or restricted is prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Changes to Disclaimer</h2>
          <p className="text-muted-foreground leading-relaxed">
            We reserve the right to modify this disclaimer at any time. Your continued use of the website following any changes constitutes acceptance of those changes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have questions about this disclaimer, please contact us at:
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
