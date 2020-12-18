<template>
    <div class="viewing" v-bind:class="{'hidden':hidden}">
        <div>
            <h4 class="heading">{{ item.title }}</h4>
            <img class="icons" src="icons/delete.png" v-on:click="$emit('removeClicked')" />
            <img class="icons" src="icons/copy.png" v-bind:data-text="item.text"
                v-on:click="copy" />
            <img class="icons" src="icons/edit.png" v-on:click="$emit('editClicked')"/>
        </div>
        <span class="itemtext">{{ item.text }}</span>
    </div>
</template>
<script>
export default {
    props: ["item", "hidden"],
    methods: {
        copy: function(event) {
            navigator.clipboard.writeText(event.target.dataset.text);
        }
    }
}
</script>

<style module>
.itemtext {
	text-overflow: ellipsis;
    white-space: nowrap; 
    overflow: hidden;
    display: block;
}

.viewing {
	padding-left: 0.3rem;
	float:right;
	width:80%;
}

.dark .viewing { color: #cccccc; }

.viewing div { display: flow-root; }

.heading {
	float: left;
	margin: inherit;
	font-weight: bold;
	font-size: 0.95rem;
	min-width: auto;
}

.icons {
	width: 15px;
	height: 15px;
	float: right;
	padding: 0.4rem;
	cursor: pointer;
}

.dark .icons {
    -webkit-filter: invert(1);
    filter: invert(1);
}
</style>
