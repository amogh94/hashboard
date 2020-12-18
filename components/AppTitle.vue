<template>
    <div class='app-title'>
        <h1 title="Click 'About' to know more." class="hidden">Hashboard</h1>
        <div class='app-title-content'>
            <img src="icons/logo.jpg"/>
            <span>Save and copy frequently used texts on the fly!</span>
        </div>
    </div>
</template>
<script>
export default {}
</script>

<style module>
.app-title {
	color: #1a73e8;
	text-align: center;
	padding-bottom: 1rem;
}

.logo-head { display: inherit; }

.dark .app-title { color: #126ce0; }

.app-title-content {
    position: relative;
    margin-bottom: -1.5rem;
}

.app-title img { float: left; }

.app-title span {
    margin-left: 1.7rem;
    display: inline-block;
    margin-top: -1.8rem;
    font-size: 12px;
}

</style>
