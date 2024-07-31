const fetch = require("node-fetch");

exports.handler = async (event) => {
  const response = await fetch("http://3.37.165.67:8080/api" + event.path);
  const data = await response.json();

  return {
    statusCode: response.status,
    body: JSON.stringify(data),
  };
};
