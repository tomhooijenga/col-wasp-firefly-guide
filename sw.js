importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js');

workbox.core.skipWaiting();
workbox.core.clientsClaim();

const {files, ver: revision} = self.__precacheManifest;
workbox.precaching.precacheAndRoute(files.map((url) => ({url, revision})));
workbox.precaching.precacheAndRoute([{url: 'index.html', revision}]);
