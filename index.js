import { serve } from "https://deno.land/std@0.205.0/http/server.ts";

// 🔹 写死你的 API 信息
const APPID = "0d0b10d7";
const SECRET = "Y2JmMTMwOWQ0OTg4OWYxZTZkZDZlOGQ1";
const APIKEY = "5d641cfe9f7a9638641491aa2c89c4c3";
const PORT = 3000;

console.log(`vk-ai-cloud WebSocket server running on port ${PORT}`);

serve((req) => {
  // 如果不是 WebSocket 请求，返回普通消息
  if (req.headers.get("upgrade") !== "websocket") {
    return new Response("vk-ai-cloud server is running ✅", { status: 200 });
  }

  // 升级 WebSocket
  const { socket, response } = Deno.upgradeWebSocket(req);

  socket.onopen = () => {
    console.log("WebSocket connected ✅");
    socket.send(`Welcome! APPID: ${APPID}, SECRET: ${SECRET}, APIKey: ${APIKEY}`);
  };

  socket.onmessage = (event) => {
    console.log("Received:", event.data);
    // 简单 echo，并返回写死的 API 信息
    socket.send(`Echo: ${event.data} | APPID: ${APPID} | SECRET: ${SECRET} | APIKey: ${APIKEY}`);
  };

  socket.onclose = () => console.log("WebSocket closed ❌");
  socket.onerror = (err) => console.error("WebSocket error:", err);

  return response;
}, { port: PORT });