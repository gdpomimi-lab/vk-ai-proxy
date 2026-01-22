import { serve } from "https://deno.land/std@0.205.0/http/server.ts";

const APPID = Deno.env.get("APPID") || "default_appid";
const SECRET = Deno.env.get("SECRET") || "default_secret";
const PORT = Number(Deno.env.get("PORT")) || 3000;

console.log(`vk-ai-cloud running on port ${PORT}`);

serve((req) => {
  const url = new URL(req.url);
  if (url.pathname === "/api/test") {
    return new Response(JSON.stringify({ message: "Test OK", appid: APPID, secret: SECRET }), {
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response("vk-ai-cloud server is running ✅");
}, { port: PORT });