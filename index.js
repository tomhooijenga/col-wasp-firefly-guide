if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  navigator.serviceWorker.register(
    new URL('sw.js', import.meta.url)
  );
}
