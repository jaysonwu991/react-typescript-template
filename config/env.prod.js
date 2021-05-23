module.exports = {
  NODE_ENV: JSON.stringify('production'),
  API_ENDPOINT: JSON.stringify(process.env.API_ENDPOINT || 'http://localhost:4000'),
}
