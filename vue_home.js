
/**
todo: 1 image sprite for the click edit delete icons
**/

document.addEventListener('DOMContentLoaded', ()=>{

	Vue.component('app-title',{
	  template: `<div class='app-title'>
	  <h1 title="Click 'About' to know more." class="hidden">Hashboard</h1>
	  <a target="_blank" href="https://gmail.com" class="logo-head"><img src="icons/logo2.jpg"  /></a>
	  <span>Save and copy frequently used texts on the fly!</span>
	  </div>`
	});

	Vue.component('list-item-viewing',{
		props:["item","hidden"],
		template:
		`<div class="viewing" v-bind:class="{'hidden':hidden}">
			<div>
				<h4 class="heading">{{ item.title }}</h4>
				<img class="icons" src="icons/delete.png" v-on:click="remove" />
		        <img class="icons" src="icons/copy.png" v-bind:data-text="item.text" v-on:click="copy" />
		        <img class="icons" src="icons/edit.png" v-on:click="$emit('editClicked')"/>
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
				storeData(this.$parent.$parent.userdata);
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
				<button v-on:click="$emit('edit',false)" class="edit-actions cancel">Cancel</button>
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
		props:["item","nofilter"],
		template:
		`<li v-if="item.visible">
			<div class="up-down-div">
				<button v-bind:class="{'arrowdisable':!nofilter}" v-on:click="moveUp"><i class="arrow arrowup" ></i></button>
				<button v-bind:class="{'arrowdisable':!nofilter}" v-on:click="moveDown"><i class="arrow arrowdown"></i></button>
			</div>
			</div>
			<list-item-viewing v-on:editClicked="toggle" v-bind:item="item" v-bind:hidden="item.hideEdit"></list-item-viewing>
			<list-item-editing v-on:edit="edits" v-bind:item="item" v-bind:hidden="item.hideEdit"></list-item-editing>
		</li>`,
		methods:{
			toggle(){
				this.item.hideEdit = !this.item.hideEdit;
				this.$root.editing = !this.$root.editing;
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
				storeData(this.$parent.userdata);
			},
			moveUp(event){
				const index = this.$vnode.key;
				// emit an event
				this.$emit('move',0, index); // 0 means up
			},
			moveDown(event){
				const index = this.$vnode.key;
				this.$emit('move',1, index); // 1 means down
			}
		}
	});

	Vue.component('app-list',{
		props:["userdata","nofilter"],
		template:
		`<div v-if="userdata.length" class='app-list'>
			<ul>
				<list-item class="list-item" v-on:move="moveUpDown" v-for="(userListItem,index) in userdata" v-bind:nofilter="nofilter" v-bind:item="userListItem" v-bind:key="index"></list-item>
			</ul>
		</div>
		<div v-else>
			
		</div>
		`,
		methods:{
			moveUpDown(moveType, index){
				if(moveType==0 && index==0){
					return;
				}else if(moveType == 1 && index==this.userdata.length-1){
					return;
				}

				const thatIndex = (moveType==0)?(index-1):(index+1);
				const thisObject = this.userdata[index];
				const thatObject = this.userdata[thatIndex];
				this.$set(this.userdata,thatIndex,thisObject);
				this.$set(this.userdata,index,thatObject);
				storeData(this.userdata);
			}
		}
	});

	Vue.component('search-bar',{
		props:["listexists","userdata"],
		data:function(){
			let data = this.userdata;
			data = data.map(item=>{
				let copy = {};
				copy.title = item.title;
				copy.text = item.text;
				return copy;
			}); 
			let headings = Object.keys(data[0]);
			let csv = headings.join(",")+"\n";
			for(let obj of data){
				csv += obj[headings[0]]+","+obj[headings[1]]+"\n";
			};
			return {
				csv: encodeURI(csv)
			};
		},
		template:
		`<div v-if="listexists">
			<input id="searchbar" v-on:keyup="applyFilter" placeholder="Search">
			<img class="download-icon" v-on:click="download" src="icons/download.png" title="Download as CSV"/>
			<a ref="download" class="hidden" download="MyHashboardData.csv" v-bind:href="'data:application/octet-stream,' + csv">Click here</a>

		</div>`,
		methods:{
			applyFilter(event){
				const text = event.target.value;
				if(text.length){
					this.$parent.nofilter = false;
					for(let i in this.userdata){
						let pattern = new RegExp(text,'gi');
						this.userdata[i].visible = (this.userdata[i].title.match(pattern)!=null);
					}
				}else{
					this.$parent.nofilter = true;
					for(let i in this.userdata){
						this.userdata[i].visible = true;
					}
				}
			},
			download(){
				this.$refs.download.click();
			}
		}
	});

	let port = chrome.runtime.connect({name: 'hashboardPort'});

	function storeData(list){
    	chrome.runtime.sendMessage({message: "store", data: list});
	}

	chrome.runtime.sendMessage({message: "fetch"}, (fetchedData)=>{

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
		new Vue({
			el: "#app",
			data:{
				userList: fetchedData,
				listExists : fetchedData.length>0,
				nofilter: true
			},
			methods:{
				newListItem(){
					let newItem = {title: '',text: '', hideEdit: true, isNew: true, visible:true};
					this.userList.push(newItem);
				}
			}
		});
    });	
});