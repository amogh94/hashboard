<template>
    <div class="editing" v-bind:class="{'hidden':!hidden}">
        <div>
            <input v-on:keyup="changeInputTitle" class="heading" type="text" maxlength=30 placeholder="Title" v-bind:value="title" />
            <button v-on:click="$emit('edit',false)" class="edit-actions cancel">Cancel</button>
            <button v-on:click="$emit('edit',true, title, text)" class="edit-actions" v-if="title && text && title.length && text.length">Save</button>
        </div>
        <input v-on:keyup="changeInputText" type="text" class="itemtext" placeholder="Text" v-bind:value="text" />
    </div>
</template>
<script>
export default {
    props:["item","hidden"],
    data: function(){
        return {
            title: this.item.title,
            text: this.item.text
        }
    },
    methods: {
        changeInputTitle: function(event){
            this.title = event.target.value;
        },
        changeInputText: function(event){
            this.text = event.target.value;
        }
    }
}
</script>
<style module>
.editing{
	padding: inherit;
	float:right;
	width:80%;
}
.editing div{
	display: inline-flex;
    margin-bottom: 0.15rem;
}
.cancel{
	color: #1a73e8;
	background: white;
	border: 1px solid #1a73e8;
	font-weight: normal;
}
.edit-actions{
	cursor: pointer;
	color: #e3e6e8;
	background: #1a73e8;
	border: 1px solid #1a73e8;
	padding-left: 0.3rem;
	padding-right: 0.3rem;
	bottom: 0px;
	font-weight: bold;
}
</style>