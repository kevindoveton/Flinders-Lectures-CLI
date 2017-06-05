const fs = require('fs');
const request = require('request');
const progress = require('request-progress');
const ProgressBar = require('ascii-progress');

class Downloader {
  constructor(url, folder) {
    this.url = url;
    this.folder = folder;
    return this.download(this.url, this.folder);
  }
  
  round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }
  
  download(url, path) {
    this.bar = new ProgressBar({ 
      schema: '[:bar] :percent :gones :remainings',
      total : 100
    });

    return new Promise((accept, reject) => {
      var _remaining = 0;
      var _gone = 0;
      progress(request(url), {
      })
      .on('progress', (state) => {
        _gone = this.round(state.time.elapsed, 2);
        _remaining = this.round(state.time.remaining, 2);
        
        this.bar.update(state.percent, {
          gone: _gone,
          remaining: _remaining
        });
      })
      .on('error', (error) => {
        reject();
      })
      .on('end', () => {
        _remaining = 0;
        this.bar.update(1, {
          gone: _gone,
          remaining: _remaining
        });
        accept();
      })
      .pipe(fs.createWriteStream(path))
    })
  }
  
}

module.exports = Downloader;