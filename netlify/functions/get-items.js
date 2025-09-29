const { readData } = require('./utils');

exports.handler = async (event, context) => {
  try {
    const data = readData();
    return {
      statusCode: 200,
      body: JSON.stringify(data.items),
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
