const env = require('./env.json');

const nodeEnv = process.env.NODE_ENV || 'development';

export default env[nodeEnv];
