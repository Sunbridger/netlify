const { readFileSync, writeFileSync } = require('fs');
const path = require('path');

const dataPath = path.join('/tmp', 'data.json'); // 使用临时目录

function readData() {
  try {
    const rawData = readFileSync(dataPath);

    // 将 Buffer 转换为字符串
    const dataString = rawData.toString('utf8');

    console.log(dataString, 'dataString'); // 现在可以看到JSON字符串了
    console.log(JSON.parse(dataString), 'parsedData'); // 解析后的对象

    return JSON.parse(dataString);
  } catch (error) {
    console.log(error, '报错了');
    // 文件不存在时返回默认值
    return { items: [] };
  }
}

function writeData(data) {
  try {
    writeFileSync(dataPath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing data:', error);
    return false;
  }
}
module.exports = {
  readData,
  writeData,
};
