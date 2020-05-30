<template>
    <div class="viewing" v-bind:class="{'hidden':hidden}">
        <div>
            <h4 class="heading">{{ item.title }}</h4>
            <img class="icons" src="icons/delete.png" v-on:click="$emit('removeClicked')" />
            <img class="icons" src="icons/copy.png" v-bind:data-text="item.text" v-on:click="copy" />
            <img class="icons" src="icons/edit.png" v-on:click="$emit('editClicked')"/>
        </div>
        <span class="itemtext">{{ item.text }}</span>
    </div>
</template>
<script>
export default {
    props:["item","hidden"],
    methods:{
        copy: function(event){
            navigator.clipboard.writeText(event.target.dataset.text);
        }
    }
}
</script>