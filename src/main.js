#!/usr/bin/env node
 
const Feed = require('./feed');
const Download = require('./download');

const BASE_URL = 'http://video.flinders.edu.au/lectureResources/vod/';
const CURRENT_YEAR = new Date().getYear() + 1900;

const program = require('commander');
var subject = '';
var path = undefined;
var year = CURRENT_YEAR;
var back = 0;
var all = false;
var list = false;
var listMax = 10;
program
  .version('1.0.0')
  .arguments('<subject> [path]')
  .option('-y, --year <year>', 'The year to download from. eg. 2016')
  .option('-b --back <number>', 'Download previous lectures')
  .option('-l --list', 'List the lectures')
  .action(function(_subject, _path) {
    subject = _subject.toUpperCase();
    path = _path; 
    if (program.year)
      year = program.year;
    if (program.back)
      back = program.back;
    if (program.all)
      all = true;
    if (program.list)
      list = true;
  })
  .parse(process.argv);


var url = BASE_URL + subject + '_' + year + '.xml';


const feed = new Feed(url);
feed.get((res) => {
  if (res.length <= back) {
    console.log('no lecture available')
    process.exit(1);
  }
  
  const r = res[back];
  
  const link = r.link
  const title = r.title
  const extension = link.split('.')[link.split('.').length - 1]
  
  // if no path
  if (typeof(path) == 'undefined')
    path = title +'.'+ extension

  // check that the path contains a valid extension..
  // this could probably fail
  const pathExtension = path.split('.')[path.split('.').length - 1]
  if (pathExtension.length !== 4 || pathExtension.length !== 3)
    path = path +'.'+ extension;
    
  if (list) {
    
    for (var i = 0; i < listMax; i++) {
      if (typeof(res[i]) != 'undefined') {
        console.log(res[i].title);  
      }
    }
  } else {
    new Download(link, path).then(() => {
    });
  }
});