
document.addEventListener('DOMContentLoaded', ()=>{
	
	Vue.component('app-title',{
	  template: `<div class='app-title'>
	  <h1>Hashboard</h1>
	  <h4>Quick access to links or texts or just about any text</h4>
	  </div>`
	});

	Vue.component('list-item-viewing',{
		props:["item","hidden"],
		template:
		`<div class="viewing" v-bind:class="{'hidden':hidden}">
			<div>
				<h4 class="heading">{{ item.title }}</h4>
				<img class="icons" src="delete.png" v-on:click="remove" />
		        <img class="icons" src="copy.png" v-bind:data-text="item.text" v-on:click="copy" />
		        <img class="icons" src="edit.png" v-on:click="$emit('edit')"/>
            </div>
			<span class="itemtext">{{ item.text }}</span>
		</div>`,
		methods:{
			copy: function(event){
				navigator.clipboard.writeText(event.target.dataset.text);
			},
			remove: function(event){
				let index = this.$parent.$vnode.key;
				this.$parent.$parent.userdata.splice(index,1);
				// this.$parent.$delete(this.$parent);
			}
		}
	});

	Vue.component('list-item-editing',{
		props:["item","hidden"],
		template:
		`<div class="editing" v-bind:class="{'hidden':!hidden}">
			<div>
				<input v-on:keyup="changeInput" class="heading" type="text" maxlength=30 placeholder="Title" v-bind:value="item.title" />
				<span class="edit-actions">Cancel</span>
				<span class="edit-actions" v-if="item.title && item.title.length">Save</span>
			</div>
			<input type="text" class="itemtext" placeholder="Text" v-bind:value="item.text" />
		</div>`,
		methods: {
			changeInput: function(event){
				let index = this.$parent.$vnode.key;
				this.$parent.$parent.userdata[index].title = event.target.value;
			}
		}
	});

	Vue.component('list-item',{
		props:["item"],
		template:
		`<li>
			<list-item-viewing v-on:edit="toggle" v-bind:item="item" v-bind:hidden="item.hideEdit"></list-item-viewing>
			<list-item-editing v-bind:item="item" v-bind:hidden="item.hideEdit"></list-item-editing>
		</li>`,
		methods:{
			toggle(){
				this.item.hideEdit = !this.item.hideEdit;
			}
		}
	});

	Vue.component('app-list',{
		props:["userdata"],
		template:
		`<div v-if="userdata.length" class='app-list'>
			<ul>
				<list-item class="list-item" v-for="(userListItem,index) in userdata" v-bind:item="userListItem" v-bind:key="index"></list-item>
			</ul>
		</div>
		<div v-else>
			<h3>Click the + button to add any quick links or texts!</h3>
		</div>
		`
	});

	chrome.runtime.sendMessage({message: "fetch"}, (fetchedData)=>{

		if(!fetchedData){
	        fetchedData = [{
	            title: "LinkedIn",
	            text: "https://www.linkedin.com/in/amogh-agnihotri/",
	            hideEdit: false
	        },{
	            title: "GitHub",
	            text: "https://github.com/amogh94",
	            hideEdit: false
	        }];
    	}

        let dataToStore = fetchedData;
        dataToStore.push({title:"Reddit", text: "reddit.com"})

		function storeData(){
		    chrome.runtime.sendMessage({message: "store", data: dataToStore});
		}

        // build UI here..

        new Vue({
			el: "#app",
			data:{
				userList: fetchedData
			},
			methods:{
				newListItem(){
					this.userList.push({title: '',text: 't', hideEdit: true});
				}
			}
		});
    });

		
});


document.addEventListener('unload', function(event) {
	alert("unloaded");
});

