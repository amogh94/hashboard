<template>
    <li v-if="item.visible">
        <div class="up-down-div">
            <button v-bind:class="{'arrowdisable':!nofilter}" v-on:click="moveUp"><i class="arrow arrowup" ></i></button>
            <button v-bind:class="{'arrowdisable':!nofilter}" v-on:click="moveDown"><i class="arrow arrowdown"></i></button>
        </div>
        <ListItemViewing v-on:editClicked="toggle" v-on:removeClicked="remove" v-bind:item="item" v-bind:hidden="item.hideEdit"></ListItemViewing>
        <ListItemEditing v-on:edit="edits" v-bind:item="item" v-bind:hidden="item.hideEdit"></ListItemEditing>
    </li>
</template>
<script>
import ListItemEditing from './ListItemEditing.vue';
import ListItemViewing from './ListItemViewing.vue';
export default {
    props:["item","nofilter"],
    components:{
        ListItemEditing,
        ListItemViewing
    },
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
                let toEmit = false;
                this.item.isNew = false;
                let index = -1;
                if(changed && text && title && text.length>0 && title.length>0){
                    index = this.$vnode.key;
                    toEmit = true;
                }
                this.toggle();
                if(toEmit){
                    this.$emit("updateAtIndex",index,{title,text});
                }
            }
        },
        remove(){
            let index = this.$vnode.key;
            this.$emit('removeAtIndex',index);
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
}
</script>