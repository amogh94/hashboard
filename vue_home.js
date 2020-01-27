
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
		        <img class="icons" src="edit.png" v-on:click="$emit('editClicked')"/>
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
		data: function(){
			return {
				title: this.item.title,
				text: this.item.text
			}
		},
		template:
		`<div class="editing" v-bind:class="{'hidden':!hidden}">
			<div>
				<input v-on:keyup="changeInputTitle" class="heading" type="text" maxlength=30 placeholder="Title" v-bind:value="title" />
				<button v-on:click="$emit('edit',false)" class="edit-actions">Cancel</button>
				<button v-on:click="$emit('edit',true, title, text)" class="edit-actions" v-if="title && text && title.length && text.length">Save</button>
			</div>
			<input v-on:keyup="changeInputText" type="text" class="itemtext" placeholder="Text" v-bind:value="text" />
		</div>`,
		methods: {
			changeInputTitle: function(event){
				this.title = event.target.value;
			},
			changeInputText: function(event){
				this.text = event.target.value;
			}
		}
	});

	Vue.component('list-item',{
		props:["item"],
		template:
		`<li>
			<list-item-viewing v-on:editClicked="toggle" v-bind:item="item" v-bind:hidden="item.hideEdit"></list-item-viewing>
			<list-item-editing v-on:edit="edits" v-bind:item="item" v-bind:hidden="item.hideEdit"></list-item-editing>
		</li>`,
		methods:{
			toggle(){
				this.item.hideEdit = !this.item.hideEdit;
			},
			edits(changed, title, text){
				// if neither title nor text have changed
				if(!(title || text) && this.item.isNew){
					// delete
					this.$parent.userdata.pop();
				}else{
					this.item.isNew = false;
					if(changed && text && title && text.length>0 && title.length>0){
						const index = this.$vnode.key;
						this.$parent.userdata[index].title = title;
						this.$parent.userdata[index].text = text;
					}
					this.toggle();
				}
				
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

		new Vue({
			el: "#app",
			data:{
				userList: fetchedData
			},
			methods:{
				newListItem(){
					this.userList.push({title: '',text: '', hideEdit: true, isNew: true});
				}
			}
		});
    });	
});