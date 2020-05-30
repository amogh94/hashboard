<template>
    <div v-if="listexists">
        <input id="searchbar" v-on:keyup="applyFilter" placeholder="Search">
        <img class="download-icon" v-on:click="download" src="icons/download.png" title="Download as CSV"/>
        <a ref="download" class="hidden" download="MyHashboardData.csv" v-bind:href="'data:application/octet-stream,' + csv">Click here</a>
    </div>
</template>
<script>
export default {
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
    },
    props:["listexists","userdata"],
    data:function(){
        let data = this.userdata;
        console.log(data);
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
    }
}
</script>
<style module>
#searchbar{
	width:85%;
	margin-top: 3px;
}
.download-icon{
	float:right;
	margin-right: 15px;
    padding: 0.4rem;
    cursor: pointer;
    width: 18px;
    height: 18px;
}
</style>