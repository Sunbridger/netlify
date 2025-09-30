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
    ${getRandomLoveEmoji()} ${getRandomLoveMessage(diffDays)}
    `;

    // 通过 Bark 推送（替换为你的Bark Key）
    await sendBarkNotification({
      title: `💘 乔&娜恋爱天数提醒，今天是我们相恋的第 ${diffDays} 天！`,
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
  const emojis = [
    '🌸',
    '🍬',
    '💌',
    '🐇',
    '🧸',
    '🎀',
    '🍭',
    '🌈', // 基础款
    '🐾',
    '🌟',
    '🍓',
    '🦄',
    '💐',
    '🍫',
    '🕯️',
    '🎁', // 甜蜜款
    '💞',
    '🐈',
    '🫧',
    '🎠',
    '🍡',
    '🌷',
    '🦋',
    '🍩', // 梦幻款
    '🎼',
    '📖',
    '🏮',
    '🎈',
    '🍯',
    '🛍️',
    '💒',
    '👑', // 浪漫款
    '🌙',
    '☁️',
    '🥂',
    '🍎',
    '✨',
    '🫶',
    '🐚',
    '🚀', // 特别款
  ];
  return emojis[Math.floor(Math.random() * emojis.length)];
}

// 随机恋爱语录

function getRandomLoveMessage(days) {
  // 所有基础文案（普通日期使用）
  const baseMessages = [
    // 基础甜蜜款
    `已经一起走过 ${days} 个日夜啦~`,
    `我们的爱情像小树苗一样生长了 ${days} 天！`,
    `${days} 天的陪伴，每一天都甜度超标！`,
    `这是我们一起编织的第 ${days} 个梦境✨`,
    `${days} 天 = ${days * 24} 小时 = ${days * 1440} 分钟的爱 💖`,

    // 文艺诗句款
    `春风十里不如你，${days}天只是开始`,
    `三生三世太遥远，只要这${days}天的每一天`,
    `你是我第${days}次心动，也是余生每一次`,
    `${days}天前的那一眼，成了我永恒的春天`,

    // 可爱比喻款
    `像${days}颗草莓糖，每天甜度+1`,
    `我们的爱情储蓄罐又多了${days}枚金币~`,
    `这是第${days}次宇宙为我们绽放烟花🎆`,
    `恋爱进度条：▓▓▓▓▓▓▓▓▓ ${days}/∞`,

    // 互动款
    `今天是我们通关恋爱游戏的第${days}关！`,
    `第${days}次对你说：早安、午安、晚安`,
    `已收集 ${days} 个「爱你」的碎片🧩`,
    `今日恋爱温度：${days}°C（持续升温中）`,

    // 暖心款
    `${days}天前你牵起的手，现在依然温暖`,
    `每一天都是新的开始，但爱你是${days}天的坚持`,
    `我们的故事写了${days}页，每一页都有彩虹`,

    // 趣味款
    `已连续爱你${days}天，打破宇宙记录！`,
    `第${days}次确认：我还是好喜欢你呀`,
    `恋爱待机时间：${days}天 0小时 0分钟`,
    `今日恋爱KPI：想你${days}次（超额完成）`,

    // 诗意款
    `${days}天的晨光与月色，都有你的轮廓`,
    `把${days}天的星光串成项链，戴在你心上`,
    `我们的${days}天，比银河的星星更闪耀`,

    // 未来展望款
    `${days}天只是起点，未来还有光年`,
    `从第1天到第${days}天，从心动到永恒`,
    `我们的爱，${days}天新鲜如初`,
  ];

  // 特殊日期文案（100的整数倍天数）
  const specialMessages = [
    `🎉 ${days}天纪念！我们的爱满分！`,
    `💯 恭喜达成「${days}天恋爱」成就！`,
    `🏆 第${days}天：你是我人生最完美的冠军`,
    `📅 ${days}页的恋爱日记，每一页都是心动`,
    `✨ ${days}天的星光，照亮了我们的永恒`,
  ];

  // 判断是否为特殊日期（100的整数倍）
  const isSpecialDay = days % 100 === 0;

  // 如果是特殊日期，有50%概率使用特殊文案（也可以调整为更高概率）
  if (isSpecialDay) {
    return specialMessages[Math.floor(Math.random() * specialMessages.length)];
  }

  // 普通日期随机返回基础文案
  return baseMessages[Math.floor(Math.random() * baseMessages.length)];
}

// 发送 Bark 通知
async function sendBarkNotification({ title, body, sound = 'minuet' }) {
  const BARK_KEY = process.env.BARK_KEY;
  return axios.post(`https://api.day.app/${BARK_KEY}`, {
    title,
    body,
    sound,
    icon: `https://emojicdn.elk.sh/${getRandomLoveEmoji()}`,
    // level: 'timeSensitive',
  });
}
