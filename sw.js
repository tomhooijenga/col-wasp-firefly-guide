import {skipWaiting, clientsClaim} from "workbox-core";
import {precacheAndRoute} from 'workbox-precaching';
import {manifest, version as revision } from '@parcel/service-worker';

skipWaiting();
clientsClaim();

precacheAndRoute(manifest.map((url) => ({url, revision})));
precacheAndRoute([{url: 'index.html', revision}]);
