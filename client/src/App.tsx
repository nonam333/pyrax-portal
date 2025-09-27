import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PageTransition from "@/components/PageTransition";
import Homepage from "@/pages/Homepage";
import MarketsPage from "@/pages/MarketsPage";
import CoinPage from "@/pages/CoinPage";
import CoinDetailPage from "@/pages/CoinDetailPage";
import AboutPage from "@/pages/AboutPage";
import ArticlePage from "@/pages/ArticlePage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <PageTransition>
      <Switch>
        <Route path="/" component={Homepage} />
        <Route path="/markets" component={MarketsPage} />
        <Route path="/coin/bitcoin" component={CoinDetailPage} />
        <Route path="/coin/:id" component={CoinPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/article/:id" component={ArticlePage} />
        <Route path="/category/:category" component={Homepage} />
        <Route path="/community" component={Homepage} />
        <Route path="/contact" component={Homepage} />
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
