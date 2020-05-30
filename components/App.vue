<template>
  <div id="app">
    <AppTitle></AppTitle>
    <SearchBar v-bind:listexists="listExists" v-bind:userdata="userList"></SearchBar>
    <AppList v-bind:userdata="userList" v-bind:nofilter="nofilter"></AppList>
    <center>
        <button v-if="nofilter" v-on:click="newListItem">+</button>
    </center>
    <center class="about">
        <strong><a href="https://www.amoghagnihotri.com" target="_blank">About</a></strong>
    </center>
  </div>
</template>

<script>
import AppTitle from './AppTitle.vue';
import SearchBar from './SearchBar.vue';
import AppList from './AppList.vue';
export default {
    components: {
        AppTitle,
        SearchBar,
        AppList
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