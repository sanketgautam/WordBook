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
