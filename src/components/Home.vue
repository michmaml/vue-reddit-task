<template>
  <div id="app">
    <div class="sign">MJS 2020</div>
    <Header v-on:phrase-search="passPhrase" />
    <LoadingScreen :isLoading="isLoading" />
    <div v-if="!isLoading">
      <div v-for="(post, index) in filteredPosts" v-bind:key="post.id">
        <PostItem
          v-bind:post="post"
          v-bind:index="index"
          :key="post.id"
          v-on:remove-post="removePost"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LoadingScreen from "./LoadingScreen";
import PostItem from "./PostItem";

import Header from "./elements/Header";

export default {
  name: "Home",
  components: {
    Header,
    PostItem,
    LoadingScreen
  },
  data() {
    return {
      posts: [],
      isLoading: true,
      searchedPhrase: "",
      deletedIndex: null
    };
  },
  created() {
    axios.get("https://www.reddit.com/r/aww.json").then(response => {
      this.posts = response.data.data.children;
    });
  },
  computed: {
    filteredPosts() {
      let temp_text = this.searchedPhrase;

      return this.posts.filter(post => {
        return post.data.title
          .toLowerCase()
          .match(temp_text.trim().toLowerCase());
      });
    }
  },
  methods: {
    passPhrase(phrase) {
      this.searchedPhrase = phrase;
    },
    removePost(index) {
      this.deletedIndex = index;
      this.posts.splice(this.deletedIndex, 1);
      //return this.posts.filter(post => post.index !== index);
    }
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

body {
  background-color: #f5f5f5;
}

.sign {
  text-align: right;
  padding: 0.5vh;
}
</style>
