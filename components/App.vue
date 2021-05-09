<template>
  <div id="app" v-bind:class="mode">
    <AppTitle></AppTitle>
    <DarkModeSlider v-on:modeToggled="modeToggled" v-bind:mode="mode"></DarkModeSlider>
    <SearchBar v-bind:listexists="listExists" v-bind:userdata="userList" v-on:setnofilter="setNoFilter"></SearchBar>
    <AppList v-on:storeData="storeData" v-bind:userdata="userList" v-bind:nofilter="nofilter"></AppList>
    <center>
        <button v-if="nofilter" v-on:click="newListItem">+</button>
    </center>
    <center class="about">
        <!-- <strong><a href="https://www.amoghagnihotri.com" target="_blank">About</a></strong> -->
    </center>
  </div>
</template>

<script>
import AppTitle from './AppTitle.vue';
import DarkModeSlider from './DarkModeSlider.vue';
import SearchBar from './SearchBar.vue';
import AppList from './AppList.vue';
export default {
    components: {
        AppTitle,
        DarkModeSlider,
        SearchBar,
        AppList
    },
    props: ["userList", "listExists", "nofilter", "mode"],
    data: function() {
        return {
            userList: this.userList || [],
            listExists: this.listExists,
            nofilter: this.nofilter,
            mode: this.mode
        };
    },
    methods: {
        newListItem() {
            let newItem = {title: '', text: '', hideEdit: true, isNew: true, visible:true};
            this.userList.push(newItem);
        },
        modeToggled(newMode) {
            this.mode = newMode;
            this.storeData(this.userList);
        },
        setNoFilter(status) {
            this.nofilter = status;
        },
        storeData(list) {
            chrome.runtime.sendMessage(
                {
                    message: "store",
                    data: {
                        list: list,
                        mode: this.mode
                    }
                }
            );
        }
    }
}
</script>

<style module>
body {
	min-width: 350px;
	max-width: 350px;
	max-height: 250px;
	font-size: 13px;
	background: white;
	display: block;
    margin:0;
}

#app {
	margin-bottom: 0.5rem;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
}
#app>center>button {
	display: block;
    border-radius: 50%;
    border: 1px solid;
    color: #e3e6e8;
    height: 3rem;
    width: 3rem;
    font-size: 2rem;
    background: #1a73e8;
}

.buttoninfo { text-align: center; }

.about {
	border-top: 0.15rem solid black;
    border-radius: 0.5rem;
    margin-top: 1rem;
    padding: 0.7rem;
}

.dark .about { border-top: 0.15rem solid #cccccc; }

.dark .about a { color: #126ce0; }

.dark .about a:visited { color: #126ce0; }

.about a {
	text-decoration: underline;
	font-style: italic;
    color: #1a73e8;
}

.about a:visited { color: #1a73e8; }

.about a:hover { color: #1a73e8; }

.about a:active { color: #1a73e8; }

.hidden { display: none; }
input {
	width: 100%;
	margin-right: 0.3rem !important;
	outline: 0.33rem;
	text-indent: 0.2rem;
	background: inherit;
	padding: 2px;
}

input:focus, input:active { border-bottom: 0.1rem solid #1a73e8; }

#app.dark { background-color: #000010; }
</style>
