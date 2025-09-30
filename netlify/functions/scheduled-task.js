const axios = require('axios');

// netlify/functions/scheduled-task.js
exports.handler = async (event, context) => {
  try {
    const timestamp = new Date().toISOString();
    console.log('✅ 定时任务执行成功:', timestamp);

    // 这里写你的定时任务逻辑
    await yourTaskLogic();

    return {
      statusCode: 200,
      data: Math.random(),
      body: JSON.stringify({
        message: '定时任务执行成功',
        timestamp: timestamp,
      }),
    };
  } catch (error) {
    console.error('❌ 定时任务错误:', error);
    return {
      statusCode: 500,
      data: Math.random(),
      body: JSON.stringify({ error: error.message }),
    };
  }
};

async function yourTaskLogic() {
  try {
    console.log('🔄 正在执行定时任务...');

    // 1. 你的业务逻辑（示例：获取数据）
    const data = await fetchSomeData();

    // 2. 通过 Bark 发送通知
    await sendBarkNotification({
      title: '定时任务执行成功',
      body: `最新数据: ${JSON.stringify(data)}`,
      level: 'active', // 通知级别（active/timeSensitive/passive）
    });

    console.log('✅ 任务完成');
  } catch (error) {
    // 错误时也发送通知
    await sendBarkNotification({
      title: '定时任务失败',
      body: `错误: ${error.message}`,
      level: 'timeSensitive',
    });
    throw error;
  }
}

// 发送 Bark 通知
async function sendBarkNotification({ title, body, level = 'active' }) {
  const BARK_KEY = process.env.BARK_KEY; // 从环境变量获取

  return axios.post(`https://api.day.app/${BARK_KEY}`, {
    title,
    body,
    sound: 'minuet', // 通知音效
    level, // 通知优先级
    isArchive: '1', // 保存到通知中心
  });
}
