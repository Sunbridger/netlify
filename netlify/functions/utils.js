const { readFileSync, writeFileSync } = require('fs');
const path = require('path');

const dataPath = path.join('/tmp', 'data.json'); // 使用临时目录

function readData() {
  try {
    const rawData = readFileSync(dataPath);
    return JSON.parse(rawData);
  } catch (error) {
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
