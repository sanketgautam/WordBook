// Read it using the storage API
 chrome.storage.sync.get(["token"], function(items) {
    if(items.token == undefined){
        // Save it using the Chrome extension storage API.
        chrome.storage.sync.set({"token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbml0MUBoYWNrMzYuY29tIiwiX2lkIjoiNWE2YzhiYmJmNmI3ZGUwYWNhZTBkMjhhIiwiaWF0IjoxNTE3MDYzMDk5fQ.bBG8fMTEO8zIAkz5xZrYsNOK7B9nUfW7vYpyxMckmW8"}, function() {
            console.log('Settings saved');
        });
    }else{
        console.log("token - "+items.token);
    }
  });

/*
  listening to API Token request from Content Script
 */
chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.message == "token"){
        chrome.storage.sync.get(["token"], function(items) {
            sendResponse({token: items.token});
        });
      }
      else
        sendResponse({}); // snub them.
});


// A generic onclick callback function.
function genericOnClick(info, tab) {
    /*var creating = chrome.tabs.create({
        url:"https://google.com/search?q=define " + info.selectionText
      });
    creating.then(onCreated, onError);
    */
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {selection: "info.selectionText"}, function(response) {});  
    });
}
  
  // Create one test item for each context type.
  var title = "Search '%s' with WordBook";
  var id = chrome.contextMenus.create({"title": title, "contexts":["selection"],
                                         "onclick": genericOnClick});
