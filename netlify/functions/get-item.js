const { readData } = require('./utils');

exports.handler = async (event, context) => {
  try {
    const id = parseInt(event.path.split('/').pop());
    const data = readData();
    const item = data.items.find((item) => item.id === id);

    if (!item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Item not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(item),
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
