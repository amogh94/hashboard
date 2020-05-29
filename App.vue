<template>
  <div id="app">
    <AppTitle></AppTitle>
    <SearchBar v-bind:listexists="listExists" v-bind:userdata="userList"></SearchBar>
  </div>
</template>

<script>
import AppTitle from './AppTitle.vue';
import SearchBar from './SearchBar.vue';
export default {
    components: {
        AppTitle,
        SearchBar
    },
    props:["userList","listExists","nofilter"],
    data:function(){
        return {userList: this.userList, listExists: this.listExists, nofilter: this.nofilter};
    },
    methods:{
        newListItem(){
            let newItem = {title: '',text: '', hideEdit: true, isNew: true, visible:true};
            this.userList.push(newItem);
        }
    }
}
</script>