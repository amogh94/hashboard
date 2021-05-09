const localStorageKey = "hashboard";

let stored = {};

chrome.runtime.onConnect.addListener(function (externalPort) {

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if(request.message == "fetch") {
            chrome.storage.sync.get(localStorageKey, result => {
                const response = result[localStorageKey];
                sendResponse(response);
            });
            return true;
        } else if(request.message == "store") {
            stored[localStorageKey] = request.data;
            sendResponse();
        } else {
            sendResponse();
        }
    });


    externalPort.onDisconnect.addListener(() => {
        chrome.storage.sync.set(stored);
    });
});
