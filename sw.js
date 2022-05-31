import {cacheNames, clientsClaim} from 'workbox-core';
import {precacheAndRoute} from 'workbox-precaching';
import {manifest, version as revision} from '@parcel/service-worker';
import {registerRoute, Route} from 'workbox-routing';
import {StaleWhileRevalidate} from 'workbox-strategies';

self.skipWaiting();
clientsClaim();

precacheAndRoute([{url: 'index.html', revision}]);
precacheAndRoute(
  manifest
    .filter((url) => url.endsWith('.css'))
    .map((url) => ({url, revision}))
)

registerRoute(new Route(
  ({url}) => manifest.includes(url.pathname),
  new StaleWhileRevalidate({
    cacheName: cacheNames.runtime
  })
));

addEventListener('message', async (event) => {
  if (event.data.type === 'MAKE_OFFLINE') {
    const cache = await caches.open(cacheNames.runtime)
    await cache.addAll(manifest)
    console.log('done');
    event.ports[0].postMessage(true);
  }
  else if (event.data.type === 'CHECK_OFFLINE') {
    const cache = await caches.open(cacheNames.runtime)
    const matches = await Promise.all(
      manifest.map((url) => cache.match(url))
    )

    event.ports[0].postMessage(matches.every(Boolean));
  }
});
