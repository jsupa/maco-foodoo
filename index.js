const request = require("request");
const encoding = require("encoding");
const cheerio = require("cheerio");

const url = "https://menucka.sk/denne-menu/bratislava/foodoo-2";
const slackUrl = "slackhook";
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

    polievka = $(
      "#upperContent > div > div > div.col-xs-12.col-sm-12.col-md-9.profile-padding > div:nth-child(7) > div > div > div:nth-child(3)"
    ).text();

    let data = [polievka];
    data.push(
      $(
        "#upperContent > div > div > div.col-xs-12.col-sm-12.col-md-9.profile-padding > div:nth-child(7) > div > div > div:nth-child(5)"
      ).text()
    );
    data.push(
      $(
        "#upperContent > div > div > div.col-xs-12.col-sm-12.col-md-9.profile-padding > div:nth-child(7) > div > div > div:nth-child(7)"
      ).text()
    );

    data.push(
      $(
        "#upperContent > div > div > div.col-xs-12.col-sm-12.col-md-9.profile-padding > div:nth-child(7) > div > div > div:nth-child(9)"
      ).text()
    );
    data.push(
      $(
        "#upperContent > div > div > div.col-xs-12.col-sm-12.col-md-9.profile-padding > div:nth-child(7) > div > div > div:nth-child(11)"
      ).text()
    );
    data.push(
      $(
        "#upperContent > div > div > div.col-xs-12.col-sm-12.col-md-9.profile-padding > div:nth-child(7) > div > div > div:nth-child(13)"
      ).text()
    );

    let message = "------ " + url + " ------";

    data.forEach((item, i) => {
      message += `\n${"🟢"} ${item}`;
    });

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
