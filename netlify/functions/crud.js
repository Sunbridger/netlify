const fs = require('fs');
const path = require('path');

// 数据文件路径
const DATA_FILE = path.join(__dirname, 'data.json');

// 读取数据
function readData() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

// 写入数据
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

exports.handler = async (event) => {
  let data = readData();
  let result;

  try {
    switch (event.httpMethod) {
      // 创建数据
      case 'POST':
        const newItem = JSON.parse(event.body);
        newItem.id = Date.now().toString(); // 生成唯一ID
        data.push(newItem);
        writeData(data);
        result = newItem;
        break;

      // 读取数据
      case 'GET':
        result = data;
        break;

      // 更新数据
      case 'PUT':
        const { id, ...updateFields } = JSON.parse(event.body);
        data = data.map(item =>
          item.id === id ? { ...item, ...updateFields } : item
        );
        writeData(data);
        result = { id, ...updateFields };
        break;

      // 删除数据
      case 'DELETE':
        const { id: deleteId } = JSON.parse(event.body);
        data = data.filter(item => item.id !== deleteId);
        writeData(data);
        result = { success: true, id: deleteId };
        break;

      default:
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result)
    };
  } catch (error) {
    return { statusCode: 500, body: error.message };
  }
};