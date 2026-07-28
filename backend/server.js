import express from "express";
import cors from "cors";
import dotenv from "dotenv";
process.env.DOTENV_CONFIG_QUIET = "true";

import walletRoutes from "./routes/wallet.js";
import transactionRoutes from "./routes/transactions.js";
import merchantRoutes from "./routes/merchants.js";
import exitTripRoutes from "./routes/exitTrip.js";
import assistantRoutes from "./routes/assistant.js";

dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "paytm-tourist-backend", ai: "local-offline-engine" });
});

app.use("/api/wallet", walletRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api", merchantRoutes); // exposes GET /api/merchants and POST /api/pay
app.use("/api/exit-trip", exitTripRoutes);
app.use("/api/assistant", assistantRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`✅ Paytm Tourist backend running at http://localhost:${PORT}`);
  console.log(`   AI assistant: fully local, offline, no API key, no rate limit`);
});
