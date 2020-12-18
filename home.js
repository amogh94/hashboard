
/**
todo: 1 image sprite for the click edit delete icons
**/
import Vue from 'vue';
import App from './components/App.vue';

document.addEventListener('DOMContentLoaded', () => {
	let port = chrome.runtime.connect({name: 'hashboardPort'});
    function enhanceList(list) {
        list = list.map( item => {
        	if(!item.hasOwnProperty('hideEdit')) {
        		item.hideEdit = false;
        	}
        	item.visible = true;
        	return item;
        });
        return list;
    }
	chrome.runtime.sendMessage({message: "fetch"}, fetchedData => {
        let oldData = [];
        if(Array.isArray(fetchedData)) {
            oldData = fetchedData;
            fetchedData = {};
        }
        if(!fetchedData) {
            fetchedData = {};
        }
        if(!fetchedData.list) {
            fetchedData.list = oldData;
        }
        if(!fetchedData.mode) {
            fetchedData.mode = "light";
        }
        fetchedData.list = enhanceList(fetchedData.list);
		new Vue({
            el: "#app",
            render: h => h(App, {
                props: {
                    userList: fetchedData.list,
                    listExists : fetchedData.list.length > 0,
                    nofilter: true,
                    mode: fetchedData.mode
                }
            })
		});
    });	
});