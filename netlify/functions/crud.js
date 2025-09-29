const { readData, writeData } = require('./utils');

exports.handler = async (event, context) => {
  const { httpMethod, path, body } = event;
  const pathParts = path.split('/').filter(Boolean);
  const endpoint = pathParts[pathParts.length - 1];

  if (endpoint !== 'items') {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Not Found' }),
    };
  }

  try {
    let data = readData();

    // CREATE
    if (httpMethod === 'POST') {
      const newItem = JSON.parse(body);
      newItem.id = Date.now(); // 简单ID生成
      data.items.push(newItem);
      writeData(data);
      return {
        statusCode: 201,
        body: JSON.stringify(newItem),
      };
    }

    // READ (all)
    if (httpMethod === 'GET' && pathParts.length === 2) {
      return {
        statusCode: 200,
        body: JSON.stringify(data.items),
      };
    }

    // READ (single)
    if (httpMethod === 'GET' && pathParts.length === 3) {
      const id = parseInt(pathParts[2]);
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
    }

    // UPDATE
    if (httpMethod === 'PUT' && pathParts.length === 3) {
      const id = parseInt(pathParts[2]);
      const index = data.items.findIndex((item) => item.id === id);
      if (index === -1) {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: 'Item not found' }),
        };
      }
      const updatedItem = JSON.parse(body);
      data.items[index] = { ...data.items[index], ...updatedItem };
      writeData(data);
      return {
        statusCode: 200,
        body: JSON.stringify(data.items[index]),
      };
    }

    // DELETE
    if (httpMethod === 'DELETE' && pathParts.length === 3) {
      const id = parseInt(pathParts[2]);
      data.items = data.items.filter((item) => item.id !== id);
      writeData(data);
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Item deleted' }),
      };
    }

    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
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
