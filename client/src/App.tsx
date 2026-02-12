import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PageTransition from "@/components/PageTransition";
import Homepage from "@/pages/Homepage";
import MarketsPage from "@/pages/MarketsPage";
import CoinDetailPage from "@/pages/CoinDetailPage";
import AboutPage from "@/pages/AboutPage";
import ComprehensiveLearnPage from "@/pages/ComprehensiveLearnPage";
import AnalysisPage from "@/pages/AnalysisPage";
import RegulationPage from "@/pages/RegulationPage";
import ArticlePage from "@/pages/ArticlePage";

import PrivacyPage from "@/pages/PrivacyPage";
import TermsPage from "@/pages/TermsPage";
import CookiePage from "@/pages/CookiePage";
import DisclaimerPage from "@/pages/DisclaimerPage";
import ContactPage from "@/pages/ContactPage";
import LearnTopicPage from "@/pages/LearnTopicPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <PageTransition>
      <Switch>
        <Route path="/" component={Homepage} />
        <Route path="/learn" component={ComprehensiveLearnPage} />
        {/* Learn Topic Pages */}
        <Route path="/learn/bitcoin">{() => <LearnTopicPage topic="bitcoin" />}</Route>
        <Route path="/learn/ethereum">{() => <LearnTopicPage topic="ethereum" />}</Route>
        <Route path="/learn/defi">{() => <LearnTopicPage topic="defi" />}</Route>
        <Route path="/learn/nfts">{() => <LearnTopicPage topic="nfts" />}</Route>
        <Route path="/learn/trading">{() => <LearnTopicPage topic="trading" />}</Route>
        <Route path="/learn/security">{() => <LearnTopicPage topic="security" />}</Route>
        <Route path="/learn/blockchain">{() => <LearnTopicPage topic="blockchain" />}</Route>
        <Route path="/learn/altcoins">{() => <LearnTopicPage topic="altcoins" />}</Route>
        <Route path="/learn/regulation">{() => <LearnTopicPage topic="regulation" />}</Route>
        <Route path="/markets" component={MarketsPage} />
        <Route path="/analysis" component={AnalysisPage} />
        <Route path="/regulation" component={RegulationPage} />

        <Route path="/coin/:id" component={CoinDetailPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/article/:id" component={ArticlePage} />
        <Route path="/category/:category" component={Homepage} />
        {/* Footer Pages */}
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/terms" component={TermsPage} />
        <Route path="/cookies" component={CookiePage} />
        <Route path="/disclaimer" component={DisclaimerPage} />
        <Route path="/contact" component={ContactPage} />
        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
    </PageTransition>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="min-h-screen bg-background text-foreground">
            <Router />
          </div>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
