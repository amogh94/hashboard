<template>
  <div id="app">
    <AppTitle></AppTitle>
    <SearchBar v-bind:listexists="listExists" v-bind:userdata="userList"></SearchBar>
    <AppList v-bind:userdata="userList" v-bind:nofilter="nofilter"></AppList>
    <center>
        <button v-if="nofilter" v-on:click="newListItem">+</button>
    </center>
    <center class="about">
        <strong><a href="https://www.amoghagnihotri.com" target="_blank">Abouts</a></strong>
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
        return {userList: this.userList || [], listExists: this.listExists, nofilter: this.nofilter};
    },
    methods:{
        newListItem(){
            let newItem = {title: '',text: '', hideEdit: true, isNew: true, visible:true};
            this.userList.push(newItem);
        }
    }
}
</script>

<style module>
body{
	min-width: 350px;
	max-width: 350px;
	max-height: 250px;
	font-size: 13px;
	/*background: #e3e6e8;*/
	background: white;
	display: block;
}

#app{
	margin-bottom: 0.5rem;
}
#app>center>button{
	display: block;
    border-radius: 50%;
    border: 1px solid;
    color: #e3e6e8;
    height: 3rem;
    width: 3rem;
    font-size: 2rem;
    background: #1a73e8;
}

.buttoninfo{
	text-align: center;
}

.about{
	border-top: 0.15rem solid black;
    border-radius: 0.5rem;
    margin-top: 1rem;
    padding: 0.7rem;
}

.about a{
	text-decoration: underline;
	font-style: italic;
}

.hidden{
	display: none;
}
input{
	width: 100%;
	margin-right: 0.3rem !important;
	outline: 0.33rem;
	text-indent: 0.2rem;
	background: inherit;
	padding: 2px;
}

input:focus, input:active {
	border-bottom: 0.1rem solid #1a73e8; /*#1c87c9;*/
	
	
}
</style>