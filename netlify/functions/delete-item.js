const { readData, writeData } = require('./utils');

exports.handler = async (event, context) => {
  try {
    const id = parseInt(event.path.split('/').pop());
    const data = readData();

    const initialLength = data.items.length;
    data.items = data.items.filter((item) => item.id !== id);

    if (data.items.length === initialLength) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Item not found' }),
      };
    }

    writeData(data);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Item deleted' }),
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
