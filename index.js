const request = require("request");
const encoding = require("encoding");
const cheerio = require("cheerio");

const url =
  "https://restauracie.sme.sk/restauracia/foodoo-cantina_10461-ruzinov_2980/denne-menu";
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
    const menucka = $(".dnesne_menu");
    const ostatneMenucka = $(".ostatne_menu");
    menucka.each((idx, el) => {
      const element = $(el);
      data.push("\n\n");
      element.find(".jedlo_polozka").each((idx, el) => {
        data.push($(el).find("div").text().trim());
      });
    });
    ostatneMenucka.each((idx, el) => {
      const element = $(el);
      data.push("\n\n");
      element.find(".jedlo_polozka").each((idx, el) => {
        data.push($(el).find("div").text().trim());
      });
    });
    request(
      {
        url: slackUrl,
        method: "POST",
        json: {
          text: `${data.map((item) => item).join("\n")}`,
        },
      },
      (err, res, body) => {
        if (err) throw err;
        console.log(body);
      }
    );
  }
);
