import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Homepage from "@/pages/Homepage";
import MarketsPage from "@/pages/MarketsPage";
import CoinPage from "@/pages/CoinPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Homepage} />
      <Route path="/markets" component={MarketsPage} />
      <Route path="/coin/:id" component={CoinPage} />
      <Route path="/category/:category" component={Homepage} />
      <Route path="/article/:id" component={Homepage} />
      <Route path="/community" component={Homepage} />
      <Route path="/about" component={Homepage} />
      <Route path="/contact" component={Homepage} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
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
