const { TelegramClient } = require('messaging-api-telegram');

const TOKEN = '';
const CHAT_ID = '';

const client = new TelegramClient({
  accessToken: TOKEN,
});

client.getWebhookInfo().catch((error) => {
  console.log(error);
});

// const getChatId = async () => {
//   const [update] = await client.getUpdates();

//   return update.message.from.id;
// };

const sendMessage = async (message) => {
  await client.sendMessage(CHAT_ID, message);
};

module.exports = {
  sendMessage,
};
