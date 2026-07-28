import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { WalletProvider } from "@/context/WalletContext";
import Landing from "./pages/Landing";
import Onboarding from "./pages/Onboarding";
import Wallet from "./pages/Wallet";
import AddMoney from "./pages/AddMoney";
import ScanPay from "./pages/ScanPay";
import Assistant from "./pages/Assistant";
import Success from "./pages/Success";
import Dashboard from "./pages/Dashboard";
import ExitTrip from "./pages/ExitTrip";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <WalletProvider>
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/add-money" element={<AddMoney />} />
              <Route path="/scan" element={<ScanPay />} />
              <Route path="/assistant" element={<Assistant />} />
              <Route path="/success" element={<Success />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/exit" element={<ExitTrip />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </WalletProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
