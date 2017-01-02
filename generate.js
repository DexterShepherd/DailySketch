// generate a new sketch folder for today
const exec = require('child_process').exec;
const moment = require('moment');

function generate() {
  exec("cp -rf default " + moment().format('MM-DD-YY')  , (err, stdout, sterr) => {
    if(err) {
      return console.log(err);
    }
  });
}

generate();
