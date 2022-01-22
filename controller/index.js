const rp = require("request-promise");
const cheerio = require("cheerio");
const request = require("request");
const e = require("express");

exports.getMusic = (req, res) => {
  let url = "https://nhacpro.me/";
  request(url, (error, response, body) => {
    const options = {
      uri: url,
      transform: function (body) {
        //Khi lấy dữ liệu từ trang thành công nó sẽ tự động parse DOM
        return cheerio.load(body);
      },
    };

    (async () => {
      try {
        // Lấy dữ liệu từ trang crawl đã được parseDOM
        let $ = await rp(options);

        const listmusic = $(".left-content .s-list ul li");

        const list = [];

        for (let i = 0; i < listmusic.length; i++) {
          const element = listmusic[i];
          const name = $(element).find("h3 a").text().trim();
          const url = $(element)
            .find("h3 a")
            .attr("href")
            .replace("https://nhacpro.me/bai-hat/", "");
          const singer = $(element).find("#singer h4").text().trim();
          // console.log(name, singer, url);

          list.push({
            name,
            url,
            singer,
          });
        }

        // res.send(body);
        res.status(200).json({
          status: "success",
          data: list,
        });
      } catch (error) {
        return res.status(400).json({
          status: "fail",
          error: true,
          message: error,
        });
      }
    })();
  });
};

exports.getMusicInfo = (req, res) => {
  const { id } = req.params;
  let url = `https://nhacpro.me/bai-hat/${id}`;
  request(url, (error, response, body) => {
    const options = {
      uri: url,
      transform: function (body) {
        //Khi lấy dữ liệu từ trang thành công nó sẽ tự động parse DOM
        return cheerio.load(body);
      },
    };

    (async () => {
      try {
        // Lấy dữ liệu từ trang crawl đã được parseDOM
        let $ = await rp(options);

        const avt = $(".avatar img").attr("src");
        const name = $(".info h1#title").text().trim();
        const singer = $(".info h2#title").text();

        const music = $("#audio source").attr("src");

        const lyric = $("#full-lyric").html();

        const listSugetion = $(".right-content .menu");

        const listSuggest = [];
        // console.log(music);

        for (let i = 0; i < listSugetion.length; i++) {
          const element = listSugetion[i];
          const name = $(element).find("h3 a").text().trim();
          const url = $(element)
            .find("h3 a")
            .attr("href")
            .replace("https://nhacpro.me/bai-hat/", "");
          const singer = $(element).find("#singer h4").text().trim();

          listSuggest.push({
            name,
            url,
            singer,
          });
        }

        // console.log(name, singer, avt, music);
        // console.log(lyric);

        // res.send(body);
        res.status(200).json({
          status: "success",
          data: {
            avt,
            name,
            singer,
            music,
            lyric,
            listSuggest,
          },
        });
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          status: "fail",
          error: true,
          message: error,
        });
      }
    })();
  });
};

exports.topMusic = (req, res) => {
  let url = "https://nhacpro.me/bang-xep-hang.html";
  request(url, (error, response, body) => {
    const options = {
      uri: url,
      transform: function (body) {
        //Khi lấy dữ liệu từ trang thành công nó sẽ tự động parse DOM
        return cheerio.load(body);
      },
    };

    (async () => {
      try {
        // Lấy dữ liệu từ trang crawl đã được parseDOM
        let $ = await rp(options);

        const listmusic = $(".left-content .menu");

        const list = [];

        for (let i = 0; i < listmusic.length; i++) {
          const element = listmusic[i];
          const name = $(element).find("h3 a").text().trim();
          const url = $(element)
            .find("h3 a")
            .attr("href")
            .replace("https://nhacpro.me/bai-hat/", "");
          const avt = $(element).find(".s-avatar img").attr("src");
          const singer = $(element).find("#singer h4").text().trim();
          // console.log(name, singer, url);

          list.push({
            name,
            url,
            avt,
            singer,
            top: i + 1,
          });
        }

        // res.send(body);
        res.status(200).json({
          status: "success",
          data: list,
        });
      } catch (error) {
        return res.status(400).json({
          status: "fail",
          error: true,
          message: error,
        });
      }
    })();
  });
};
