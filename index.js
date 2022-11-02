const request = require("request");
const encoding = require("encoding");
const cheerio = require("cheerio");

const url = "https://www.lanogi.sk/denne-menu/";
const slackUrl = "Hoook";
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
    const menu = $(
      "body > section.page-content > div > div > article > div:nth-child(1) > div > div > div > div:nth-child(3)"
    );

    menu.find("p").each((i, el) => {
      data.push($(el).text());
    });

    let message = "------ lanogi.sk ------";

    data.forEach((item, i) => {
      message += `\n${"🟢"} ${item}`;
    });

    data.length <= 0 &&
      (message =
        ":dovolenka: Ahojte milí kolegovia, " +
        "dnes som si vzal dovolenku :hauko:");

    request(
      {
        url: slackUrl,
        method: "POST",
        json: {
          text: message,
        },
      },
      (err, res, body) => {
        if (err) throw err;
        console.log(body);
      }
    );
  }
);
