exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      accessToken: process.env.WEATHER_TOKEN,
    })
  };
};
