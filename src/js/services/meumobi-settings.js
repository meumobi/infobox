'use strict';

angular.module('meumobi.settings', [])

.constant("SITE", {
  /*"DOMAIN": "infobox.meumobi.com",
  "SRC_URL": "http://infobox.meumobilesite.com/",
  "API_URL": "http://infobox.meumobilesite.com/api/",*/
  "TIMEOUT": "5000",
  "ITEMS_PER_PAGE": "10",
  "DOMAIN": "infobox.int-meumobi.com",
  "SRC_URL": "http://int-meumobi.com/",
  "API_URL": "http://int-meumobi.com/api/",
  "WELCOME_MESSAGE": "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
}).constant('MEDIAS', {
  'application/pdf': {
    class: 'fa-file-pdf-o',
    label: 'View',
    extension: 'pdf',
    download: true
  },
  'application/vnd.ms-excel': {
    class: 'fa-file-excel-o',
    label: 'View',
    extension: 'xls',
    download: true
  },
  'audio/mpeg': {
    class: 'fa-file-audio-o', 
    label: 'Play',
    extension: 'mp3',
    download: true
  },
  'application/vnd.ms-powerpoint': {
    class: 'fa-file-powerpoint-o',
    label: 'View',
    extension: 'ppt',
    download: true,
  }
}).constant("INFOBOXAPP", {
  "VERSION" : "1.0.0"
});
