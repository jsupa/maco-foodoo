const request = require("request");
const encoding = require("encoding");
const cheerio = require("cheerio");

const url = "url";
const slackUrl = "SlackURL"
const data = [];

request(
  {
    url,
    encoding: null,
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36",
    },
  },
  (err, res, body) => {
    if (err) throw err;
    const $ = cheerio.load(encoding.convert(body, "UTF-8").toString());

    messages = "";
    request(
      {
        url: slackUrl,
        method: "POST",
        json: {
          text: `messages`,
        },
      },
      (err, res, body) => {
        if (err) throw err;
        console.log(body);
      }
    );
  }
);
