const fs = require('fs');

const dataPath = [];

function readData() {
  try {
    const rawData = fs.readFileSync(dataPath);
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Error reading data:', error);
    return { items: [] };
  }
}

function writeData(data) {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing data:', error);
    return false;
  }
}

module.exports = { readData, writeData };
