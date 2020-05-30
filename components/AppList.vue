<template>
    <div v-if="userdata.length" class='app-list'>
        <ul>
            <ListItem class="list-item" v-on:updateAtIndex="updateAtIndex" v-on:removeAtIndex="removeAtIndex" v-on:move="moveUpDown" v-for="(userListItem,index) in userdata" v-bind:nofilter="nofilter" v-bind:item="userListItem" v-bind:key="index"></ListItem>
        </ul>
    </div>
    <div v-else></div>
</template>
<script>
import ListItem from './ListItem.vue';
export default {
    props:["userdata","nofilter"],
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
            this.storeData(this.userdata);
        },
        removeAtIndex(index){
            this.userdata.splice(index,1);
            this.storeData(this.userdata);
        },
        updateAtIndex(index,data){
            this.userdata[index].title = data.title;
            this.userdata[index].text = data.text;
            this.storeData(this.userdata);
        },
        storeData(list){
            chrome.runtime.sendMessage({message: "store", data: list});
        }
    },
    components:{
        ListItem
    }
}
</script>
<style module>
ul{
	list-style-type: none;
	padding: 0;
}
.list-item{
	border-bottom: 0.1rem solid #1a73e8;
	border-radius: 0.5rem;
	padding: 0.2rem;
	margin-top: 0.2rem;
	font-size: 0.85rem;
	display: inline-flex;
	width: -webkit-fill-available;
}
</style>