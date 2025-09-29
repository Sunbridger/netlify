const { readData, writeData } = require('./utils');

exports.handler = async (event, context) => {
  try {
    const newItem = JSON.parse(event.body);
    newItem.id = Date.now();

    const data = readData();
    data.items.push(newItem);
    writeData(data);

    return {
      statusCode: 201,
      body: JSON.stringify(newItem),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal Server Error',
        error: error.message,
      }),
    };
  }
};
