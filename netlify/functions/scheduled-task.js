// netlify/functions/love-days-counter.js
const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    // 相恋日期（可以改为你的纪念日）
    const LOVE_START_DATE = new Date('2024-09-14T00:00:00Z');
    const nowUTC = new Date();

    // 计算天数差
    const diffTime = nowUTC - LOVE_START_DATE;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // 显示北京时间给用户
    const beijingTime = new Date(nowUTC.getTime() + 8 * 60 * 60 * 1000);
    const displayDate = beijingTime.toISOString().split('T')[0];

    // 可爱风格的消息模板
    const message = `
    💕 恋爱日报 💕
    ━━━━━━━━━━━━
    今天是我们的第 ${diffDays} 天！

    🗓️ 纪念日：2024-09-14
    📆 今日日期：${displayDate}

    ${getRandomLoveEmoji()} ${getRandomLoveMessage(diffDays)}
    `;

    // 通过 Bark 推送（替换为你的Bark Key）
    await sendBarkNotification({
      title: '💘 恋爱天数提醒',
      body: message,
      sound: 'minuet',
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, days: diffDays }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

// 随机恋爱表情
function getRandomLoveEmoji() {
  const emojis = ['🌸', '🍬', '💌', '🐇', '🧸', '🎀', '🍭', '🌈'];
  return emojis[Math.floor(Math.random() * emojis.length)];
}

// 随机恋爱语录
function getRandomLoveMessage(days) {
  const messages = [
    `已经一起走过 ${days} 个日夜啦~`,
    `我们的爱情像小树苗一样生长了 ${days} 天！`,
    `${days} 天的陪伴，每一天都甜度超标！`,
    `这是我们一起编织的第 ${days} 个梦境✨`,
    `💖 ${days} 天 = ${days * 24} 小时 = ${days * 1440} 分钟的爱 💖`,
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

// 发送 Bark 通知
async function sendBarkNotification({ title, body, sound = 'minuet' }) {
  const BARK_KEY = process.env.BARK_KEY;
  return axios.post(`https://api.day.app/${BARK_KEY}`, {
    title,
    body,
    sound,
    icon: 'https://emojicdn.elk.sh/💖',
    level: 'timeSensitive',
  });
}
