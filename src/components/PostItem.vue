<template>
  <div class="post-item" data-aos="fade-up">
    <div class="wrapper">
      <div class="post-image" style="float:left">
        <!--    Display the thumbnail attached to the object    -->

        <img class="image-attached" v-bind:src="post.data.thumbnail" />
      </div>
      <div class="post-rest" style="float:right">
        <!--    Display the title of the the object    -->

        <div class="post-text">{{post.data.title}}</div>
        <div class="post-actions">
          <div class="btn-container">
            <!--    Enable the button with a link to the original post    -->

            <a v-bind:href="getLink()" target="_blank">
              <button class="btn-link">Original Post</button>
            </a>

            <!--    Get the index of the post and initialize sendIndex(...)   -->

            <button class="btn-remove" @click="sendIndex(index)">Remove</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostItem",

  // extract each post and its index

  props: ["post", "index"],
  methods: {
    // allows the button to get the correct link to the post

    getLink() {
      //returns alink to the post, there is a pattern: firstly the base url is the same
      //but each post have unique reference
      return `https://www.reddit.com/${this.post.data.permalink}`;
    },

    // send the value attached to remove-post, Home.vue will get it and extract it

    sendIndex(index) {
      this.$emit("remove-post", index);
    }
  }
};
</script>

<style>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: stretch;
  margin: 5% 20%;
  padding: 1.5%;

  border-radius: 15px;
  border: 0.5em solid rgb(183, 216, 214);
  box-shadow: 20px 5px 35px 0px rgb(77, 100, 102);
}

.wrapper,
.post-image,
.post-text,
.post-actions,
.btn-container {
  background-color: rgb(255, 255, 255);
}

.post-image,
.post-rest {
  width: 50%;
  text-align: center;
}

.post-text,
.post-actions {
  height: 50%;
}

img {
  overflow: hidden;
  width: 152px;
  height: 152px;
}

.post-text {
  padding: 1% 0;
  text-align: center;
  font-size: 1em;
}

.post-actions {
  position: relative;
}

.btn-container {
  width: 100%;
  margin-bottom: 1%;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-evenly;
}

button {
  border-radius: 7px;
  border: 0.2em solid rgb(120, 158, 158);
  background-color: rgb(238, 243, 216);
  color: rgb(254, 97, 90);
  font-size: 1.3em;
  cursor: pointer;
  padding: 0.25em;

  /**
    Custom styling
  */

  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  -webkit-transition-property: color;
  transition-property: color;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
}

button::before {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgb(254, 97, 90);
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
  -webkit-transform-origin: 0 50%;
  transform-origin: 0 50%;
  -webkit-transition-property: transform;
  transition-property: transform;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}

button:hover,
button:focus,
button:active {
  color: rgb(238, 243, 216);
}

button:hover:before,
button:focus:before,
button:active:before {
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
}

.btn-link {
  float: left;
}

.btn-remove {
  float: right;
}

.btn-remove::before {
  -webkit-transform-origin: 100% 50%;
  transform-origin: 100% 50%;
}

/**
  I am not adding additional css for smaller screens but might include that in the future.
  I would probably use some parts from the world-clocks where the idea of responsive design
  was fully expolited and was fully compatible with 3 different sizes.
*/

@media screen and (max-width: 1080px) {
  .post-image {
    padding: 2.5% 0;
  }

  img {
    width: 140px;
    height: 140px;
  }

  button {
    font-size: 1em;
    padding: 0.2em;
  }
}
</style>