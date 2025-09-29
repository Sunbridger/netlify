const { readData, writeData } = require('./utils');

exports.handler = async (event, context) => {
  try {
    const id = parseInt(event.path.split('/').pop());
    const updates = JSON.parse(event.body);

    const data = readData();
    const index = data.items.findIndex((item) => item.id === id);

    if (index === -1) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Item not found' }),
      };
    }

    data.items[index] = { ...data.items[index], ...updates };
    writeData(data);

    return {
      statusCode: 200,
      body: JSON.stringify(data.items[index]),
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
