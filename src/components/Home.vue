<!--    Main file which bridges componnts with the App    -->

<template>
  <div id="app">
    <div class="sign">MJS 2020</div>

    <!--    Header includes a search bar    -->

    <Header v-on:phrase-search="passPhrase" />

    <!--    Loading screen, disapears once the elements appear    -->

    <LoadingScreen :isLoading="isLoading" />
    <div v-if="!isLoading">
      <!--    For each existing post, display it. Ideally I would 
      create a "PostList" file, which would combine all of the PostItems-->

      <div v-for="(post, index) in filteredPosts" v-bind:key="post.id">
        <!--    Rectangle with the title, thumbnail and action buttons. Unique for
        each post.-->

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
    // Fetch the data using axios and put it in the posts array

    axios.get("https://www.reddit.com/r/aww.json").then(response => {
      this.posts = response.data.data.children;
    });
  },
  computed: {
    // Method for Header; searches for posts that include the given query

    filteredPosts() {
      // set the phrase locally
      let temp_text = this.searchedPhrase;

      // for each exsting post within posts
      return this.posts.filter(post => {
        // get the title of the post
        return (
          post.data.title
            // set all characters to lower case
            .toLowerCase()
            // and check if the title matches the phrase
            .match(temp_text.trim().toLowerCase())
        );
        // if it does, display it
      });
    }
  },
  methods: {
    // gets the phrase from Header and sets it to searchedPhrase

    passPhrase(phrase) {
      this.searchedPhrase = phrase;
    },

    // function for Remove button from PostItem; remove clicked post

    // get the index of the post
    removePost(index) {
      // set it to deletedIndex
      this.deletedIndex = index;
      // set the value locally
      const temp_index = this.deletedIndex;
      // and remove it from the list of posts
      this.posts.splice(temp_index, 1);
      //return this.posts.filter(post => post.index !== index);
    }
  },
  mounted() {
    // checks if the content loaded and display it initialize fading once true

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
