#!/usr/bin/env node
 
const Feed = require('./feed');
const Download = require('./download');

const BASE_URL = 'http://video.flinders.edu.au/lectureResources/vod/';
const CURRENT_YEAR = new Date().getYear() + 1900;

const program = require('commander');
var subject = '';
var path = '';
var year = CURRENT_YEAR;

program
  .version('1.0.0')
  .arguments('<subject> <path>')
  // .option('-u, --username <username>', 'The user to authenticate as')
  .option('-y, --year <year>', 'The year to download from. eg. 2016')
  .action(function(_subject, _path) {
    subject = _subject.toUpperCase();
    path = _path; 
    if (program.year)
      year = program.year
  })
  .parse(process.argv);


var url = BASE_URL + subject + '_' + year + '.xml';


const feed = new Feed(url);
feed.get((res) => {
  var link = res[0].link
  var title = res[0].title
  var extension = link.split('.')[link.split('.').length - 1]
  
  path = title +'.'+ extension
  
  new Download(res[0].link, path).then(() => {
    console.log('done')
  });
});