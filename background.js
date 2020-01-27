/**
 * A common need for extensions is to have a single long-running script to manage some task or state. 
 * Background pages to the rescue.
 * The background page is an HTML page that runs in the extension process. 
 * It exists for the lifetime of your extension, and only one instance of it at a time is active.
 */

// listen to messages sent from content.js of each page

const localStorageKey = "hashboard";

let fetched = {};
let stored = {};

chrome.runtime.onConnect.addListener(function (externalPort) {

    chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
        if(request.message=="fetch"){
            // const response = await fetchData();
            // sendResponse(fetchData);
            chrome.storage.sync.get(localStorageKey,result=>{
                const response = result[localStorageKey];
                fetched = response;
                sendResponse(response);
            });
            return true;
        }else if(request.message=="store"){
            stored[localStorageKey] = request.data;
            sendResponse();
        }else{
            sendResponse();
        }
    });


    externalPort.onDisconnect.addListener(function() {
        chrome.storage.sync.set(stored);
    });
});
