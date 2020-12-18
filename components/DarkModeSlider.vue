<template>
    <div id="dark-mode-slider">
        <label class="switch">
            <input type="checkbox" v-model="modeSwitch" @change="toggle">
            <span class="slider round"></span>
        </label>
        <span id="dark-mode-heading">Dark mode</span>
    </div>
</template>
<script>
const modeNameList = ["light", "dark"];
export default {
    props: ["mode"],
    data: function() {
        return {
            modeSwitch: this.mode == "dark"
        }
    },
    methods: {
        toggle() {
            this.mode = modeNameList[this.modeSwitch ? 1 : 0];
            this.$emit("modeToggled", this.mode);
        }
    }
}
</script>
<style scoped>
#dark-mode-heading {
    float: right;
    margin-right: 1rem;
}

.dark #dark-mode-heading { color: #126ce0; }

/* slider css */
#dark-mode-slider {
    float: right;
    margin-right: 0.5rem;
    margin-bottom: 1rem;
    width: -webkit-fill-available;
}

/* The switch - the box around the slider */
.switch {
    position: relative;
    width: 2.5rem;
    height: 1.2rem;
    float: right;
}

/* Hide default HTML checkbox */
.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

/* The slider */
.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    -webkit-transition: .4s;
    transition: .4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 1.3rem;
    width: 1.3rem;
    top: -0.23rem;
    left: -4px;
    background-color: #1a73e8;
    -webkit-transition: .4s;
    transition: .4s;
}

input:checked + .slider { background-color: #333333; }

/* ball color in dark mode */
input:checked + .slider:before { background-color: #126ce0; }

input:focus + .slider { box-shadow: 0 0 1px #1a73e8; }

input:checked + .slider:before {
    -webkit-transform: translateX(1.3rem);
    -ms-transform: translateX(1.3rem);
    transform: translateX(1.3rem);
}

/* Rounded sliders */
.slider.round {
    border-radius: 2rem;
    border-color: #ccc;
    border-style: solid;
    border-width: 0.15rem;
}

.slider.round:before { border-radius: 50%; }
</style>
