# Flinders Downloader

## Description
Download flinders lectures

## Usage
```bash
Usage: flinders [options] <subject> [path]

Options:

  -h, --help          output usage information
  -V, --version       output the version number
  -y, --year <year>   The year to download from. eg. 2016
  -b --back <number>  Download previous lectures
```

```bash
flinders <subject> [path to download]
```

to download from a certain year add the optional parameter year
```bash
flinders <subject> [path to download] --year 2016
```

Download the second to last lecture available
```bash
flinders <subject> [path to download] --back 1
```

## Installation
To install flinders lecture downloader run the following command
```bash
npm install
npm install -g
```



Kevin Doveton - 2017