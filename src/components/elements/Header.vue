<template>
  <div class="search">
    <div class="header-panel">
      <p>Type In Your Search Term</p>
      <form>
        <input type="text" placeholder=" Type here..." @input="phrasePassed" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: ["posts"],
  methods: {
    phrasePassed(evt) {
      this.$emit("phrase-search", evt.target.value);
    }
  }
};
</script>

<style scoped>
.header-panel {
  text-align: center;
  margin: 0 15% 1% 15%;
  border-radius: 5px;
  border: 0.5em solid rgb(183, 216, 214);
  box-shadow: 20px 5px 35px 0px rgb(77, 100, 102);
  color: rgb(238, 243, 216);
  background-color: rgb(254, 97, 90);
}

p {
  padding: 2%;
  font-size: 3em;
}

form {
  margin: 0 15% 2% 15%;
}

input {
  width: 100%;
  border: none;
  border-bottom: 2px solid rgb(77, 100, 102);
  background-color: rgb(254, 97, 90);
  font-size: 1.5em;
  color: rgb(255, 255, 255);
}

@media screen and (max-width: 1080px) {
  p {
    font-size: 2em;
  }
  input {
    font-size: 1em;
  }
  form {
    margin: 0 25% 2% 25%;
  }
}

@media screen and (max-width: 700px) {
  p {
    font-size: 1.5em;
  }
}
</style>