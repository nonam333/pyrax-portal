import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
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
import BlogCMSPage from "@/pages/BlogCMSPage";
import PrivacyPage from "@/pages/PrivacyPage";
import TermsPage from "@/pages/TermsPage";
import CookiePage from "@/pages/CookiePage";
import DisclaimerPage from "@/pages/DisclaimerPage";
import ContactPage from "@/pages/ContactPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <PageTransition>
      <Switch>
        <Route path="/" component={Homepage} />
        <Route path="/learn" component={ComprehensiveLearnPage} />
        <Route path="/markets" component={MarketsPage} />
        <Route path="/analysis" component={AnalysisPage} />
        <Route path="/regulation" component={RegulationPage} />
        <Route path="/cms" component={BlogCMSPage} />
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
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Router />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
