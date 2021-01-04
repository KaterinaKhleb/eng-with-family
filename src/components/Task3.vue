<template>

<div class="main-notes-holder">

  <div class="bird-container ">
		<div class="bird "></div>
	</div>

  <div class="bird-container bird-container-back">
		<div class="bird bird-back"></div>
	</div>


  <div class="main-half">
    <h3>Your current task: </h3>
      <div class="paper">
        <div class="lines">
          <div class="text" v-if="user==='mama'||user==='papa'" id="review" contenteditable spellcheck="false">
           <h3 v-if="review">{{review.task}}</h3>  <br /><br />
            </div>
          <div class="text" id="review" v-if="user==='admin'"  spellcheck="false">
            <h3 v-if="review">{{review.task}}</h3>  <br /><br />
            </div>
        </div>
        <div class="holes hole-top"></div>
        <div class="holes hole-middle"></div>
        <div class="holes hole-bottom"></div>
        <button v-on:click="savereviewText()" style="width:25%; margin-top: 20px">Submit</button>
      </div>
  
  </div>

  <div class="main-half">
    <div v-if="user==='admin'">
      <h3 style="margin-top:30px">Add a topic</h3>
        <input @keyup.enter="newreview" v-model="addreviewInput" name="add-review" type='text'/> <br>
        <button v-on:click.prevent="newreview">Add </button>
    </div>
       
    <h3>Your last review: </h3>
        <div v-for=" (item, index) in pastreview"  v-bind:key="index" style="overflow: scroll; height: 60vh">
          <div class="paper-past past" v-if="item.mamaVersion!= ''&& item.mamaResolved===false  && ((user==='admin')||(user === 'mama'))"  >
            <div class="lines">
              <div class="text-past" v-if="user==='admin'" contenteditable spellcheck="false">
               <textarea style="font-size: 16px !important; width: 100% !important; height: 100%"  v-html="item.mamaVersion" v-model="item.mamaVersion" contenteditable="true">
               </textarea>
              <!-- </input> -->
              </div>
              <button class="button-check" v-if="user==='admin' && item.mamaCheck===false"  v-on:click="checkCorrection(item,'mama')" >
                  <img class="check-btn"  src="../assets/check.png"> Save corrections
              </button>
                <div class="button-check" v-if="user==='admin' && item.mamaCheck===true"  >
                  <img class="check-btn"  src="../assets/check.png"> review is already checked
              </div>
                <div class="text-past" v-if="user==='mama' && item.mamaResolved === false"  v-html="item.mamaVersion"   spellcheck="false">
                {{item.mamaVersion}} <br /><br />
              </div>
            </div>
            <div v-if="user != 'admin'" class="holes-past hole-top"></div>
            <div v-if="user != 'admin'" class="holes-past hole-middle"></div>
            <div v-if="user != 'admin'" class="holes-past hole-bottom"></div>
             <button v-on:click="resolvereview(item)" v-if="user==='mama' && item.mamaCheck===true"  class="resolve-btn">Lesson is learnt!</button>

             <div v-if="user==='mama'&&item.mamaCheck===true" class="note">
              Great job!
              </div>
          </div>


          <div v-if="item.papaVersion!= ''&& item.papaResolved===false && ((user==='admin')||(user === 'papa'))" class="paper-past past">
            <div class="lines">
              <div class="text-past" v-if="user==='admin'"  spellcheck="false">
                 <textarea style="font-size: 16px !important; width: 100% !important; height: 100%"  v-html="item.papaVersion" v-model="item.papaVersion" contenteditable="true">
              </textarea>
              </div>
                <button class="button-check" v-if="user==='admin' && item.papaCheck===false"  v-on:click="checkCorrection(item,'papa')" >
                  <img class="check-btn"  src="../assets/check.png"> Save corrections
              </button>
                <div class="button-check" v-if="user==='admin' && item.papaCheck===true"  >
                  <img class="check-btn"  src="../assets/check.png"> review is already checked
              </div>
                <div class="text-past" v-if="user==='papa' && item.papaResolved === false"   v-html="item.papaVersion"   spellcheck="false">
                {{item.papaVersion}} <br /><br />
                </div>
             
            </div>
            <div v-if="user != 'admin'" class="holes-past hole-top"></div>
            <div v-if="user != 'admin'" class="holes-past hole-middle"></div>
            <div v-if="user != 'admin'" class="holes-past hole-bottom"></div>
               <button v-on:click="resolvereview(item)" v-if="user==='papa' && item.papaCheck === true" class="resolve-btn">Lesson is learnt!</button>

             <div v-if="user==='papa'&&item.papaCheck===true" class="note">
              Great job!
              </div>
          </div>
        </div>

  </div>
</div>

   
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Task2",
  data() {
    return {
      msg: "",
      addreviewInput: "Watch a movie / episode in English and write about it.",
      user: "",
    };
  },
  async created() {
    await this.userinfo(this.user);
    this.user = this.username;

    await this.fetchreviews(this.user);
    await this.fetchPastreviews(this.user);
    console.log("the past reviews: ", this.pastreview);

    if (this.pastreview != null) {
      this.pastreview.forEach(el => {
        if (el.mamaResolved === true && el.papaResolved === true) {
          this.removereview(el);
        }
      });
    }
  },
  updated() {
    //  this.fetchreviews(this.user)
    //   this.fetchPastreviews(this.user)
  },
  computed: {
    ...mapGetters(["review", "pastreview", "username"]),
  },

  methods: {
    ...mapActions([
      "fetchreviews",
      "fetchPastreviews",
      "addreview",
      "savereview",
      "userinfo",
      "removereview",
    ]),

    newreview: function() {
      let payload = {
        task: this.addreviewInput,
        mamaVersion: "",
        papaVersion: "",
        mamaCheck: false,
        papaCheck: false,
        mamaResolved: false,
        papaResolved: false,
      };
      this.$store.dispatch("addreview", payload);
      this.addreviewInput = "";
    },
    savereviewText() {
      let text = document.getElementById("review").innerText;
      if (this.user === "mama") {
        this.review.mamaVersion = text;
      } else if (this.user === "papa") {
        this.review.papaVersion = text;
      }
      let toSend = { data: this.review, user: this.user };
      this.$store.dispatch("savereview", toSend);

      document.getElementById("review").innerText =
        "You completed an review for this week!";

        this.$forceUpdate()
    },

    checkCorrection(review, name) {
      if (name === "mama") {
        review.mamaCheck = true;
      } else if (name === "papa") {
        review.papaCheck = true;
      }
      let toSend = { data: review, user: this.user };
      this.$store.dispatch("savereview", toSend);
    },

    resolvereview(item) {
      if (this.user === "mama") {
        item.mamaResolved = true;
        let toSend = { data: item, user: this.user };
        console.log("data to be sent to the server: ", toSend);
        this.$store.dispatch("savereview", toSend);
      } else if (this.user === "papa") {
        item.papaResolved = true;
        let toSend = { data: item, user: this.user };
        this.$store.dispatch("savereview", toSend);
      }
    },
  },
};
</script>

<style scoped>
h3 {
  font-size: 1.1em
}
.resolve-btn {
  position: absolute;
  bottom: 5%;
  right: 20%;
  width: 130px;
}
.main-notes-holder {
  overflow: hidden;
  height: 90%;
  display: flex;
  position: relative;
}
.main-half {
  width: 50%;
  display: block;
}
@import url(https://fonts.googleapis.com/css?family=Indie+Flower);
body {
  margin: 0;
  padding: 0;
  background: lightgoldenrodyellow;
}
.paper {
  position: absolute;
  height: 80%;
  width: 35%;
  background: rgba(255, 255, 255, 0.9);
  left: 10%;
  top: 7%;
  box-shadow: 0px 0px 5px 0px #888;
}
.paper-past {
  /* margin-right: 7% !important; */
  margin: auto;
  /* position: absolute; */
  height: 50vh;
  width: 80%;
  background: rgba(255, 255, 255, 0.9);
  /* top: 7%; */
  box-shadow: 0px 0px 5px 0px #888;
}
.paper::before {
  content: "";
  position: absolute;
  left: 45px;
  height: 100%;
  width: 2px;
  background: rgba(255, 0, 0, 0.4);
}
.paper-past::before {
  content: "";
  position: absolute;
  right: 8%;
  height: 50vh;
  width: 2px;
  background: rgba(255, 0, 0, 0.4);
}
.lines {
  margin-top: 40px;
  height: calc(100% - 40px);
  width: 100%;
  background-image: repeating-linear-gradient(
    white 0px,
    white 24px,
    steelblue 25px
  );
}
.check-btn {
  width: 20px;
  height: auto;
}
.button-check {
  width: 120px !important;
  background: white;
  font-size: 12px;
}
.text {
  position: absolute;
  text-align: left;
  top: 65px;
  left: 55px;
  bottom: 10px;
  right: 10px;
  line-height: 25px;
  font-family: "Indie Flower";
  overflow: hidden;
  outline: none;
}
.text-past {
  text-align: left;
  height: 100%;
  width: 80%;
  margin-right: 10%;
  line-height: 25px;
  font-family: "Indie Flower";
  overflow: hidden;
  outline: none;
}

.holes {
  position: absolute;
  left: 10px;
  height: 25px;
  width: 25px;
  background: #f3f3f3;
  border-radius: 50%;
  box-shadow: inset 0px 0px 2px 0px #888;
}
.holes-past {
  position: absolute;
  right: 100px;
  height: 25px;
  width: 25px;
  background: #f3f3f3;
  border-radius: 50%;
  box-shadow: inset 0px 0px 2px 0px #888;
}
.hole-top {
  top: 10%;
}
.hole-middle {
  top: 50%;
}
.hole-bottom {
  bottom: 10%;
}
.main-notes {
  width: 94%;
  margin: 0 auto !important;

  border-left: 2px solid black;
  border-right: 2px solid black;
  border-bottom: 2px solid black;
  border-collapse: collapse;
  /* height:80%; */
  position: relative;
  z-index: 13 !important;
  overflow: scroll;
}

input[type="text"] {
  border: 0;
  padding: 30px;
  border: 2px solid transparent;
  border-bottom-color: black;
  transition: 0.4s;
  background: none;
  outline: none;
  width: 60%;
  height: 40px;
  margin-top: 1%;
  font-size: 1.5vw;
}

input:focus {
  padding: 40px;
  transition: 0.4s;
  border: 2px solid black;
}

button {
  background: none;
  padding: 7px;
  font-family: "Space Mono", monospace;
  font-size: 1.2vw;
  width: 10%;
  margin: 10px auto;
  border: 2px solid black;
  /* text-transform: uppercase; */
  transition: all 300ms cubic-bezier(0.77, 0, 0.175, 1);
  cursor: pointer;
  user-select: none;
  outline: none;
}

button:hover {
  background: black;
  color: lightgray;
}
.notes-lists {
  display: grid;
  width: 80%;
  margin: 30px auto 0px auto;
  grid-template-columns: repeat(6, 1fr);
}
::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}
.note {
  text-decoration: none;
  color: #000;
  background: rgb(208, 255, 204);
  position: absolute;
  right: 5%;
  bottom: 4%;
  height: 70px !important;
  width: 130px !important;
  line-height: 1em !important;
  border-radius: 0% !important;
  padding: 2em 1em;
  margin: 1em;
  -moz-box-shadow: 5px 5px 7px rgba(33, 33, 33, 1);
  -webkit-box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
  box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
  -webkit-transform: rotate(-6deg);
  -o-transform: rotate(-6deg);
  -moz-transform: rotate(-6deg);
  -moz-transition: -moz-transform 0.15s linear;
  -o-transition: -o-transform 0.15s linear;
  -webkit-transition: -webkit-transform 0.15s linear;
  overflow-y: scroll;
}

img:hover {
  transform: rotate(8deg) scale(1.1);
}

.mouseover-span {
  opacity: 0;
}

.bird {
  background-image: url("../assets/bird.svg");
  background-size: auto 100%;
  width: 88px;
  height: 125px;
  will-change: background-position;
  animation-duration: 1s;
  animation-name: fly-cycle;
  animation-timing-function: steps(10);
  animation-iteration-count: infinite;
}

.bird:nth-of-type(1) {
  animation-delay: 3s;
}

.bird-container {
  position: absolute;
  transform: scale(0) translateX(-10vw);
  will-change: transform;
  animation-name: fly-right-one;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: 15s;
}

.bird-container:nth-of-type(1) {
  top: 30%;
  left: -10%;
  animation-delay: 0s;
}

.bird-container-back {
  /* transform: scale(0) translateX(110vw) !important; */
  animation-name: fly-left-one !important;
  position: absolute;
  transform: scale(0) translateX(-10vw);
  will-change: transform;
  animation-name: fly-right-one;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: 15s;
  top: 70%;
  left: -10%;
  animation-delay: 5s;
}

.bird-back {
  animation-delay: 9.5s;
  background-image: url("../assets/bird_back.svg");
}

/* Tablet horiz to desktop
===============================*/
@media (min-width: 1024px) and (max-width: 1280px) {
  .main-notes-holder {
    width: calc(96% - 1px);
    margin: auto;
    height: 85vh;
  }
  .main-notes {
    width: 100%;
  }
  .notes-lists {
    width: 90%;
    grid-template-columns: repeat(4, 1fr);
  }
  .note {
    height: 13em;
    width: 11em;
  }
}

/* Horiz Tablet to vertical
===============================*/
@media (min-width: 768px) and (max-width: 1023px) {
  .main-notes-holder {
    width: calc(96% - 1px);
    margin: auto;
    height: 87vh;
  }
  .main-notes {
    width: 100%;
  }
  .notes-lists {
    width: 90%;
    grid-template-columns: repeat(3, 1fr);
  }
  .note {
    height: 13em;
    width: 11em;
  }
}

/* Mobile to Tablet Portrait
===============================*/
@media (min-width: 480px) and (max-width: 767px) {
  .main-notes-holder {
    width: calc(98% - 1px);
    margin: auto;
    height: 84vh;
  }
  .main-notes {
    width: 100%;
  }
  h2 {
    font-size: 16px;
  }
  input[type="text"] {
    padding: 18px !important;
  }
  input:focus {
    padding: 25px;
  }

  .note {
    height: 10em;
    width: 8em;
  }
  button {
    width: 25%;
    padding: 3px;
  }
}
@media (max-width: 480px) {
  .main-notes-holder {
    width: calc(99% - 1px);
    margin: auto;
    height: 92vh;
  }
  .main-notes {
    width: 100%;
  }
  .note h2 {
    font-size: 14px;
  }

  input {
    padding: 18px;
  }
  input:focus {
    padding: 25px;
  }

  .note {
    height: 9.5em;
    width: 7.5em;
  }
  button {
    width: 25%;
    padding: 3px;
  }

  img {
    width: 18px !important;
    height: auto !important;
  }
}
</style>