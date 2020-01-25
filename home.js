

document.addEventListener('DOMContentLoaded', ()=>{
    let fetchedData = [];
    let dataToStore = [];

    // fetch from storage
    // Note: this is a promise and will fail if there is empty or no response
    chrome.runtime.sendMessage({message: "fetch"}, (fetchedData)=>{
        console.log(fetchedData);
        dataToStore = fetchedData;
        fetchedData = [{
            title: "WhatsApp",
            text: "web.whatsapp.com"
        },{
            title: "GitHub",
            text: "https://github.com/amogh94"
        }];
        if(fetchedData && fetchedData.length){
            buildUI(fetchedData);
            // store into 'dataToStore'
        }else{

        }
    });
    
});

function buildUI(){

}

function storeData(){
    chrome.runtime.sendMessage({message: "store", data: dataToStore});
}