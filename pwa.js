/* HTTPS 或 localhost 才可註冊；路徑相對於目前網站，支援 GitHub Pages。 */
if ('serviceWorker' in navigator && window.isSecureContext) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js', {scope:'./'})
      .catch(error => console.warn('PWA 離線功能註冊失敗：', error));
  });
}
