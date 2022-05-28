var express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");

const AXIOS_OPTIONS = {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
    },
  };

var app = express();

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get("/find", (req, res, next) => {
    let code = req.query.code;
    let results = [];

    axios
      .get(
        `https://strefamtg.pl/szukaj?controller=search&s=${code}`,
        AXIOS_OPTIONS
      )
      .then(function ({ data }) {
        let $ = cheerio.load(data);
        data.products.map(i => {
            let name = i.name;
            if(name.includes('-')) {
                name = name.substring(0, name.indexOf('-'))
                console.log(name);
            }
            if(name.includes('(')) {
                name = name.substring(0, name.indexOf('('))
                console.log(name);
            }
            if(name.includes('[')) {
                name = name.substring(0, name.indexOf('['))
                console.log(name);
            }
            if(name[name.length-1] === ' ') {
                name = name.slice(0,-1);
            }
            results.push(name)
        });

      }).then(() => {
          console.log(results);
        res.json(results);
      });

    
   });



   async function getResults(code) {
    
  }