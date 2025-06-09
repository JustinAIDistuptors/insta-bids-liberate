import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SalesBotLanding from "./pages/tools/SalesBotLanding";
import SalesBot from "./pages/tools/SalesBot";
import AgentsMadeEasy from "./pages/tools/AgentsMadeEasy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Sales Bot Routes */}
          <Route path="/sales-bot" element={<SalesBotLanding />} />
          <Route path="/tools/sales-bot" element={<SalesBot />} />
          {/* Agents Made Easy Route */}
          <Route path="/agents-made-easy" element={<AgentsMadeEasy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
