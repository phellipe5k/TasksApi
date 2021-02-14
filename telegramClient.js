const { TelegramClient } = require('messaging-api-telegram');
const TOKEN = '';

const client = new TelegramClient({
  accessToken: TOKEN,
});

client.getWebhookInfo().catch((error) => {
  console.log(error); 
});

const getChatId = async () => {
  const [update] = await client.getUpdates();
  return update.message.from.id;
}

const sendMessage = async (message) => {
  const chatId = await getChatId();

  await client.sendMessage(chatId, message);
}

module.exports = {
  sendMessage
}