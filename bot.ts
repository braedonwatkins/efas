console.log("Every Frame a Spider Starting!");

const { TwitterApi } = require("twitter-api-v2");
const config = require("./config.ts");

// console.log("debugging: loaded configs\n" + JSON.stringify(config, null, 4));

/* DO NOT COMMIT */
const client = new TwitterApi(config);

