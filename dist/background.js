chrome.app.runtime.onLaunched.addListener(function() {

  chrome.app.window.create('index.html', {
    'id': 'mainWindow'
  });

  /*
  chrome.tabs.create(
    {
      url: "index.html"
    });
    */
});
