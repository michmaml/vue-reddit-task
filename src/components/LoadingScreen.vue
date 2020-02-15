<template>
  <div :class="{ loader: true, fadeout: !isLoading }">Loading ...</div>
</template>

<script>
export default {
  name: "LoadingScreen",
  props: ["isLoading"]
};
</script>

<style>
html {
  overflow-y: scroll;
}

.loader {
  color: black;
  display: block;
  font-size: 32px;
  overflow: hidden;
  padding-top: 50vh;
  position: fixed;
  text-align: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.fadeout {
  animation: fadeout 1.2s forwards;
}

@keyframes fadeout {
  to {
    opacity: 0;
    visibility: hidden;
  }
}
</style>