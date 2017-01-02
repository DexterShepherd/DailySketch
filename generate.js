"use strict";
// generate a new sketch folder for today
const exec = require('child_process').exec;
const moment = require('moment');
const fs = require('fs');

const path = "./" + moment().format('MM-DD-YY');

function generate() {
  exec("cp -rf default " + path, (err, stdout, sterr) => {
    if(err) {
      return console.log(err);
    }
    let pack = JSON.parse(fs.readFileSync(path + "/package.json", 'utf8'));
    pack.name = "Daily-Sketch-" + moment().format('MM-DD-YY');

    fs.writeFile(path + "/package.json", JSON.stringify(pack, null, 2), (err) => {
      if (err) {
        return console.log(err);
      }
    })
  });
}

generate();
