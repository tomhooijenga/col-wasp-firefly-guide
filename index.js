if ('serviceWorker' in navigator) {
  const button = document.getElementById('make-offline');

  navigator.serviceWorker
    .register(new URL('./sw.js', import.meta.url), {type: 'module'})
    .then(async () => {
      const available = await sendMessage({type: 'CHECK_OFFLINE'})
      if (available) {
        markReady(button);
      } else {
        button.addEventListener('click', async () => {
          markPending(button);
          await sendMessage({type: 'MAKE_OFFLINE'});
          markReady(button);
        });
      }
    });
}

async function sendMessage(message) {
  const messageChannel = new MessageChannel();

  const {active: controller} = await navigator.serviceWorker.ready;

  return new Promise((resolve) => {
    messageChannel.port1.onmessage = (event) => {
      resolve(event.data)
    }

    controller.postMessage(message, [messageChannel.port2]);
  });
}

function markReady(button) {
  button.innerText = 'Complete!';
  button.dataset.offlineState = 'ready';
}

function markPending(button) {
  button.innerText = 'Loading...';
  button.dataset.offlineState = 'loading';
}
