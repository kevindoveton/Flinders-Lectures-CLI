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
  
  download(url, path) {
    this.bar = new ProgressBar({ 
      // schema: ':bar :ticks',
      total : 100
    });

    return new Promise((accept, reject) => {
      progress(request(url), {
      })
      .on('progress', (state) => {
        // console.log('progress', state);
        this.bar.update(state.percent, {
          elapsed: state.time.elapsed,
          eta: state.time.elapsed
        });
      })
      .on('error', (error) => {
        reject();
      })
      .on('end', () => {
        console.log('end')
        accept();
      })
      .pipe(fs.createWriteStream(path))
    })
  }
  
}

module.exports = Downloader;