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

// 示例任务逻辑
async function yourTaskLogic() {
  console.log('🔄 正在执行定时任务...');
  // 例如：发送邮件、清理数据、调用API等
  // console.log('任务完成');
}
