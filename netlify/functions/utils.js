// 内存数据存储
let memoryData = { items: [] };

// 初始化时可以设置初始数据（可选）
function initData(initialData = { items: [] }) {
  memoryData = { ...initialData };
}

// 读取数据
function readData() {
  return memoryData;
}

// 写入数据
function writeData(data) {
  memoryData = { ...data };
  return true;
}

// 清空数据
function clearData() {
  memoryData = { items: [] };
}

// 获取数据快照（用于调试或备份）
function getDataSnapshot() {
  return JSON.parse(JSON.stringify(memoryData));
}

module.exports = {
  readData,
  writeData,
  initData,
  clearData,
  getDataSnapshot
};