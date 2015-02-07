chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    'id': 'mainWindow',
    'minWidth': 800,
    'minHeight': 600
  });
});
