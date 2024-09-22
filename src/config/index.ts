const env:string = process.env.NODE_ENV || 'development';
const config:any = require(`./${env}`).default;

export default config;