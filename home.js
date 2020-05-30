
/**
todo: 1 image sprite for the click edit delete icons
**/
import Vue from 'vue';
import App from './components/App.vue';

document.addEventListener('DOMContentLoaded', ()=>{
	let port = chrome.runtime.connect({name: 'hashboardPort'});
    function enhanceData(fetchedData){
        if(!fetchedData){
			fetchedData = [];
    	}
        fetchedData = fetchedData.map(item=>{
        	if(!item.hasOwnProperty('hideEdit')){
        		item.hideEdit = false;
        	}
        	item.visible = true;
        	return item;
        });
        return fetchedData;
    }
	chrome.runtime.sendMessage({message: "fetch"}, (fetchedData)=>{
		fetchedData = enhanceData(fetchedData);
		new Vue({
            el: "#app",
            render: h => h(App,{
                props:{
                    userList: fetchedData,
                    listExists : fetchedData.length>0,
                    nofilter: true
                }
            })
		});
    });	
});