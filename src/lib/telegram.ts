import * as fs from "fs";

const TELEGRAM_KEYS_PATH = "/home/u781187371/telegram-keys.json";

interface TelegramConfig {
  botToken: string;
  adminChatIds: Array<{ chatId: string; name: string }>;
}

let _cachedConfig: TelegramConfig | null = null;

function getTelegramConfig(): TelegramConfig | null {
  if (_cachedConfig) return _cachedConfig;
  try {
    const keys = JSON.parse(fs.readFileSync(TELEGRAM_KEYS_PATH, "utf8"));
    if (keys.botToken && Array.isArray(keys.adminChatIds)) {
      _cachedConfig = {
        botToken: keys.botToken,
        adminChatIds: keys.adminChatIds,
      };
      return _cachedConfig;
    }
  } catch {
    // Fall through to env-var fallback
  }
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (token) {
    _cachedConfig = {
      botToken: token,
      adminChatIds: [
        { chatId: "8665156164", name: "Cristofer" },
        { chatId: "1572834634", name: "Asaí" },
      ],
    };
    return _cachedConfig;
  }
  console.error("⚠️ Telegram keys not found at /home/u781187371/telegram-keys.json and no TELEGRAM_BOT_TOKEN env var");
  return null;
}

async function sendOne(chatId: string, text: string): Promise<boolean> {
  const config = getTelegramConfig();
  if (!config) return false;
  try {
    const res = await fetch(`https://api.telegram.org/bot${config.botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "(no body)");
      console.error(`❌ Telegram sendMessage to ${chatId} failed: ${res.status} ${body.slice(0, 200)}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`❌ Telegram sendMessage to ${chatId} threw:`, err);
    return false;
  }
}

export async function notifyAdminsTelegram(text: string): Promise<void> {
  const config = getTelegramConfig();
  if (!config) return;
  await Promise.allSettled(config.adminChatIds.map((r) => sendOne(r.chatId, text)));
}
