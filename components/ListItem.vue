<template>
    <li v-if="item.visible">
        <div class="up-down-div">
            <button v-bind:class="{'arrowdisable':!nofilter}" v-on:click="moveUp">
                <i class="arrow arrowup" ></i>
            </button>
            <button v-bind:class="{'arrowdisable':!nofilter}" v-on:click="moveDown">
                <i class="arrow arrowdown"></i>
            </button>
        </div>
        <ListItemViewing v-on:editClicked="toggle" v-on:removeClicked="remove"
            v-bind:item="item" v-bind:hidden="item.hideEdit"></ListItemViewing>
        <ListItemEditing v-on:edit="edits" v-bind:item="item"
            v-bind:hidden="item.hideEdit"></ListItemEditing>
    </li>
</template>
<script>
import ListItemEditing from './ListItemEditing.vue';
import ListItemViewing from './ListItemViewing.vue';
export default {
    props: ["item", "nofilter"],
    components: {
        ListItemEditing,
        ListItemViewing
    },
    methods: {
        toggle() {
            this.item.hideEdit = !this.item.hideEdit;
            this.$root.editing = !this.$root.editing;
        },
        edits(changed, title, text) {
            // if neither title nor text have changed
            if(!(title || text) && this.item.isNew) {
                this.$parent.userdata.pop();
            } else {
                let toEmit = false;
                this.item.isNew = false;
                let index = -1;
                if(changed && text && title && text.length > 0 && title.length > 0) {
                    index = this.$vnode.key;
                    toEmit = true;
                }
                this.toggle();
                if(toEmit) {
                    this.$emit("updateAtIndex", index, {title, text});
                }
            }
        },
        remove() {
            let index = this.$vnode.key;
            this.$emit('removeAtIndex', index);
        },
        moveUp(event) {
            const index = this.$vnode.key;
            this.$emit('move', 0, index); // 0 means up
        },
        moveDown(event) {
            const index = this.$vnode.key;
            this.$emit('move', 1, index); // 1 means down
        }
    }
}
</script>
<style module>
.list-item>.up-down-div { display: inherit; }

.up-down-div button {
	background: none;
    border: none;outline: 0 !important;
}

.up-down-div button:hover {
	background: #e7ebfe;
	border-radius: 8px;
	border: thin solid #e7ebfe;
	cursor: pointer;
}

.up-down-div .arrowdisable .arrowup {
	border: solid #d3d3d3;
	border-width: 0 3px 3px 0;
	display: inline-block;
	padding: 3px;
	transform: rotate(-135deg);
	-webkit-transform: rotate(-135deg);
}

.up-down-div .arrowdisable .arrowdown {
	border: solid #d3d3d3;
	border-width: 0 3px 3px 0;
	display: inline-block;
	padding: 3px;
	transform: rotate(45deg);
	-webkit-transform: rotate(45deg);
}

.arrow {
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
}

.dark .arrow {
  border: solid #cccccc;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
}

.arrowup {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}

.dark .arrow:hover {
    border: solid black;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
}

.arrowdown {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}

.arrowdisable, .arrowdisable:hover {
	cursor: not-allowed;
	pointer-events: none;
}
</style>
