<template>
    <div v-if="listexists">
        <input id="searchbar" v-on:keyup="applyFilter" placeholder="Search">
        <img class="download-icon" v-on:click="download" src="icons/download.png" title="Download as CSV"/>
        <a ref="download" class="hidden" v-bind:href="'data:application/octet-stream,' + csv">Click here</a>
    </div>
</template>
<script>
export default {
    methods: {
        applyFilter(event) {
            const text = event.target.value;
            if(text.length) {
                this.$parent.nofilter = false;
                for(let i in this.userdata) {
                    let pattern = new RegExp(text, 'gi');
                    this.userdata[i].visible = (this.userdata[i].title.match(pattern) != null);
                }
            } else {
                this.$parent.nofilter = true;
                for(let i in this.userdata) {
                    this.userdata[i].visible = true;
                }
            }
        },
        download() {
            const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
            const time = (new Date(Date.now() - tzoffset)).toISOString()
                .slice(0, -5).replace(/T/g, "_").replace(/\:/g, "");
            const name = `MyHashboardData-${time}.csv`;
            let elem = this.$refs.download;
            elem.setAttribute("download", name);
            elem.click();
        }
    },
    props:["listexists", "userdata"],
    data:function() {
        let data = this.userdata;
        data = data.map(item => {
            let copy = {};
            copy.title = item.title;
            copy.text = item.text;
            return copy;
        }); 
        let headings = ["title", "text"];
        try{
            headings = Object.keys(data[0]);
        } catch(e) {}
        let csv = headings.join(",") + "\n";
        for(let obj of data) {
            csv += obj[headings[0]] + "," + obj[headings[1]] + "\n";
        };
        return {
            csv: encodeURI(csv)
        };
    }
}
</script>
<style module>
#searchbar {
	width:86%;
	margin-top: 3px;
    margin-left: 0.2rem;
}

.dark #searchbar { color: #eeeeee; }

.dark #searchbar::placeholder { color: #bbbbbb; }

.download-icon {
	float:right;
	margin-right: 0.5rem;
    padding: 0.4rem;
    cursor: pointer;
    width: 18px;
    height: 18px;
}

.dark .download-icon {
    -webkit-filter: invert(1);
    filter: invert(1);
}
</style>
