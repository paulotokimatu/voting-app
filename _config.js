require('dotenv').config();

var ids = {
  twitter: {
    consumerKey: process.env.consumerKey,
    consumerSecret: process.env.consumerSecret
  }
};

module.exports = ids;