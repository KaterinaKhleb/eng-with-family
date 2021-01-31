<template>
<div class="main-notes-holder">
  <div class="bird-container ">
		<div class="bird "></div>
	</div>
  <div class="bird-container bird-container-back">
		<div class="bird bird-back"></div>
	</div>
  <div class="main-half">
    <div v-if="user==='admin'">
      <h3 style="margin-top:30px">Add a topic</h3>
      <input @keyup.enter="newEssay" v-model="addEssayInput" name="add-essay" type='text'/> <br>
      <button v-on:click.prevent="newEssay">Add </button>
    </div>
    <h3>Your last essay: </h3>
      <div v-for=" (item, index) in pastEssay"  v-bind:key="index" style="overflow: scroll; height: 60vh">
        <div class="paper-past past" v-if="item.mamaVersion!= ''&& item.mamaResolved===false  && ((user==='admin')||(user === 'mama'))"  >
          <div class="lines">
            <div class="text-past" v-if="user==='admin'" contenteditable spellcheck="false">
              <textarea style="font-size: 16px !important; width:94% !important; height: 100%"  v-html="item.mamaVersion" v-model="item.mamaVersion" contenteditable="true">
              </textarea>
            </div>
            <button class="button-check" v-if="user==='admin' && item.mamaCheck===false"  v-on:click="checkCorrection(item,'mama')" >
              <img class="check-btn"  src="../assets/check.png"> Save corrections
            </button>
            <div class="button-check" v-if="user==='admin' && item.mamaCheck===true"  >
              <img class="check-btn"  src="../assets/check.png"> Essay is already checked
            </div>
            <div class="text-past" v-if="user==='mama'  && item.mamaResolved === false"  v-html="item.mamaVersion"   spellcheck="false">
              {{item.mamaVersion}} <br /><br />
            </div>
            <div v-if="user==='mama'&&item.mamaCheck===true" class="note">
              Great job!
            </div>
          </div>
          <div class="holes-past hole-top"></div>
          <div class="holes-past hole-middle"></div>
          <button v-on:click="resolveEssay(item)" v-if="user==='mama' && item.mamaCheck===true"  class="resolve-btn">Lesson is learnt!</button>  
        </div>

        <div v-if="item.papaVersion!= ''&& item.papaResolved===false  && ((user==='admin')||(user === 'papa'))" class="paper-past past">
          <div class="lines">
            <div class="text-past" v-if="user==='admin'"  spellcheck="false">
              <textarea style="font-size: 16px !important; width: 94% !important; height: 100%"  v-html="item.papaVersion" v-model="item.papaVersion" contenteditable="true">
              </textarea>
            </div>
            <button class="button-check" v-if="user==='admin' && item.papaCheck===false"  v-on:click="checkCorrection(item,'papa')" >
              <img class="check-btn"  src="../assets/check.png"> Save corrections
            </button>
            <div class="button-check" v-if="user==='admin' && item.papaCheck===true"  >
              <img class="check-btn"  src="../assets/check.png"> Essay is already checked
            </div>
            <div class="text-past" v-if="user==='papa'"  v-html="item.papaVersion"   spellcheck="false">
                {{item.papaVersion}} <br /><br />
            </div>
            <div v-if="user==='papa'&&item.papaCheck===true" class="note">
              Great job!
            </div>
          </div>
          <div class="holes-past  hole-top"></div>
          <div class="holes-past hole-middle"></div>
          <button v-on:click="resolveEssay(item)" v-if="user==='papa' && item.papaCheck === true"  class="resolve-btn">Lesson is learnt!</button>
        </div>
      </div>
  </div>

  <div class="main-half">
    <h3>Your current task: </h3>
    <div class="paper">
      <div class="lines">
        <div class="text" v-if="user==='mama'||user==='papa'" id="essay" contenteditable spellcheck="false">
          <h3 v-if="essay">{{essay.task}}</h3>  <br> <br>
        </div>
        <div class="text" id="essay" v-if="user==='admin'"  spellcheck="false">
          <h3 v-if="essay">{{essay.task}} </h3>  <br> <br>
        </div>
      </div>
      <div class="holes hole-top"></div>
      <div class="holes hole-middle"></div>
      <div class="holes hole-bottom"></div>
      <button v-on:click="saveEssayText()" style="width:25%; margin-top: 20px">Submit</button>
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
      addEssayInput: "",
      user: "",
    };
  },
  async created() {
    await this.userinfo(this.user);
    this.user = this.username;
    await this.fetchEssays(this.user);
    await this.fetchPastEssays(this.user);
    if (this.pastEssay != null) {
      this.pastEssay.forEach(el => {
        if (el.mamaResolved === true && el.papaResolved === true) {
          this.removeEssay(el);
        }
      });
    }
  },
  updated() {
    //  this.fetchEssays(this.user)
    //   this.fetchPastEssays(this.user)
  },
  computed: {
    ...mapGetters(["essay", "pastEssay", "username"]),
  },

  methods: {
    ...mapActions([
      "fetchEssays",
      "fetchPastEssays",
      "addEssay",
      "saveEssay",
      "userinfo",
      "removeEssay",
    ]),

    // Creates a new essay, only used by admin
    newEssay(){
      let payload = {
        task: this.addEssayInput,
        mamaVersion: "",
        papaVersion: "",
        mamaCheck: false,
        papaCheck: false,
        mamaResolved: false,
        papaResolved: false,
      };
      this.$store.dispatch("addEssay", payload);
      this.addEssayInput = "";
    },
    // Save updates to the essay object, used by everyone besudes admin
    async saveEssayText() {
      let text = document.getElementById("essay").innerHTML;
      if (this.user === "mama") {
        this.essay.mamaVersion = text;
      } else if (this.user === "papa") {
        this.essay.papaVersion = text;
      }
      let toSend = { data: this.essay, user: this.user };
      this.$store.dispatch("saveEssay", toSend);
      await this.fetchEssays(this.user);
      await this.fetchPastEssays(this.user);
      document.getElementById("essay").innerText =
        "You completed an essay for this week!";
    },

    // Saves a 'checked" property to each essay, used by the admin
    checkCorrection(essay, name) {
      if (name === "mama") {
        essay.mamaCheck = true;
      } else if (name === "papa") {
        essay.papaCheck = true;
      }
      let toSend = { data: essay, user: this.user };
      this.$store.dispatch("saveEssay", toSend);
    },

    // Used to resolve completed task. If the task is resolved by any user, it will be deleted.
    async resolveEssay(item) {
      if (this.user === "mama") {
        item.mamaResolved = true;
        let toSend = { data: item, user: this.user };
        console.log("data to send: ", toSend);
        this.$store.dispatch("saveEssay", toSend);
      } else if (this.user === "papa") {
        item.papaResolved = true;
        let toSend = { data: item, user: this.user };
        this.$store.dispatch("saveEssay", toSend);
      }
      this.fetchEssays(this.user);
      this.fetchPastEssays(this.user);
    },
  },
};
</script>

<style scoped>
h3 {
  font-size: 1.1em;
}
.resolve-btn {
  position: absolute;
  bottom: 5%;
  left: 20%;
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
  right: 10%;
  top: 7%;
  box-shadow: 0px 0px 5px 0px #888;
}
.paper-past {
  margin-left: 7%;
  height: 50vh;
  width: 80%;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 0px 5px 0px #888;
}
.paper::before,
.paper-past::before {
  content: "";
  position: absolute;
  left: 45px;
  height: 100%;
  width: 2px;
  background: rgba(255, 0, 0, 0.4);
}
.paper-past::before {
  margin-left: 4%;
  height: 50vh !important;
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
  font-size: 0.8vw;
}
.text {
  position: absolute;
  text-align: left;
  top: 65px;
  left: 55px;
  bottom: 10px;
  right: 10px;
  line-height: 25px;
  overflow: hidden;
  outline: none;
}
.text-past {
  text-align: left;
  height: 100%;
  width: 90%;
  margin-left: 10%;
  line-height: 25px;
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
  left: 80px;
  height: 5px;
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
::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}
.note {
  text-decoration: none;
  color: #000;
  background: rgb(208, 255, 204);
  position: absolute;
  left: 5%;
  top: 50%;
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
.note:hover {
  opacity: 0.2;
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