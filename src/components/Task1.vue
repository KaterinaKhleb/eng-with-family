<template >

<div class="main-task1-holder">
  <div class="bird-container ">
		<div class="bird "></div>
	</div>
  <div class="bird-container bird-container-back">
		<div class="bird bird-back"></div>
	</div>
    <div class="main-task1">
        <div class="main-half">
          <div style="width: 80%" v-if="user==='admin'">
            <h3 style="margin-top:30px">Add a sentence</h3>
            <input @keyup.enter="newSentence" v-model="addSentenceInput" name="add-sentence" type='text'/> <br>
            <button v-on:click.prevent="newSentence">Add </button>
          </div>
          <div style="margin-top: 30px">
            <h3>Your previous task:</h3>
            <ul class="list" v-if="pastFilteredSents.length"> 
             <li class="one-todo" v-for="sent in pastFilteredSents" :key="sent.text" >
              <div  class="row" v-if="(user==='mama'&&sent.mamaResolved===false)||(user==='papa'&&sent.papaResolved===false)||(user==='admin')">
                <div class="check-holder" > 
                  <img v-if="sent.mamaCheck && (user === 'mama'||user === 'admin')" src="../assets/check.png">
                  <img v-if="sent.papaCheck && (user==='papa' || user === 'admin')" src="../assets/check.png">
               </div> 
               <div class="span-holder" style="diplay: flex; flex-direction: column">
                  <span class="line line-small" >{{sent.text}}</span>
                  <div style="width: 100%; display: flex" v-if="user==='admin'&&sent.mamaVersion!=''">
                    <input class="line" style="font-size: 18px !important; width: 90% !important" v-html="sent.mamaVersion" v-model="sent.mamaVersion" contenteditable="true" > 
                    <img v-on:click="checkCorrection(sent,'mama')" class="check-btn" src="../assets/check.png">
                  </div>
                  <div  style="width: 100%; display: flex"  v-if="user==='admin'&&sent.papaVersion!=''">
                    <input class="line" style="font-size: 18px !important; width: 90% !important" v-html="sent.papaVersion" v-model="sent.papaVersion" contenteditable="true" > 
                    <img v-on:click="checkCorrection(sent,'papa')" class="check-btn"  src="../assets/check.png">
                  </div>
                  <span class="line"  v-if="user==='mama'"  v-html="sent.mamaVersion" >{{sent.mamaVersion}}</span>
                  <span class="line"  v-if="user==='papa'"  v-html="sent.papaVersion" >{{sent.papaVersion}}</span>
                  </div>
                </div>  
              </li>
            </ul>
            <div style="margin-top: 40px" v-if="allPastSentences.length === 0">
                There are no previous sentences available yet! 
            </div>
            <button v-if="(user==='mama'||user==='papa')&&(allPastSentences.length != 0)" v-on:click="resolveSentence()">Lesson is learnt</button>
          </div>
        </div>
        <div  class="main-half">
          <div class="list-header">
            <span> Today is {{getDate(new Date().toISOString())}}</span>
          </div>
          <ul class="list">
            <li v-for="sent in filteredSentences" :key="sent.textarea"  >
              <div style="display: flex; flex-direction:column">
                <div  class="row one-todo" >
                  <div class="check-holder"> </div> 
                  <div class="span-holder">
                      <span class="line original-text"  >{{sent.text}}:</span>
                  </div>
                </div>  
                <div  class="row one-todo" >
                  <div class="check-holder"></div> 
                  <div class="span-holder">
                    <div style="width:80% !important" v-if="user==='mama'">
                      <input type="text" class="line" v-model="sent.mamaVersion" contenteditable="true" >  
                    </div>
                    <div style="width:80% !important"  v-if="user==='papa'">  
                      <input type="text"  class="line" v-model="sent.papaVersion" contenteditable="true" >  
                    </div>
                  </div>
                </div>  
              </div>  
            </li>
          </ul>   
           <button style="margin-top: 0px !important" v-on:click="saveSentences()">Save my work </button>
        </div>
    </div>
</div>


</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Todo",
  computed: {
    ...mapGetters(["allSentences", "allPastSentences", "username"]),
    filteredSentences: function() {
      return this.allSentences;
    },
    pastFilteredSents() {
      return this.allPastSentences;
    },
  },
  data() {
    return {
      msg: "",
      addSentenceInput: "",
      showCreated: false,
      sentences: [],
      filterDone: false,
      showAll: true,
      user: "",
      pastSentences: [],
    };
  },
  async created() {
    await this.userinfo(this.user);
    this.user = this.username;
    await this.fetchSentences(this.user);
    await this.fetchPastSentences(this.user);
    this.allPastSentences.forEach(sent => {
      if (sent.mamaResolved === true && sent.papaResolved === true) {
        this.deleteSentence(sent);
      }
    });
  },
  methods: {
    ...mapActions([
      "fetchSentences",
      "fetchPastSentences",
      "addSentence",
      "saveSentence",
      "userinfo",
    ]),

    //Generates a new sentence
    newSentence(){
      let payload = {
        text: this.addSentenceInput,
        mamaVersion: "",
        papaVersion: "",
        mamaCheck: false,
        papaCheck: false,
        mamaResolved: false,
        papaResolved: false,
      };
      this.$store.dispatch("addSentence", payload);
      this.addSentenceInput = "";
      this.filteredSentences.push(payload);
    },
    //Saves a sentence, only used by admin
    async saveSentences() {
      this.filteredSentences = this.filteredSentences.forEach(sent => {
        let toSend = { data: sent, user: this.user };
        this.$store.dispatch("saveSentence", toSend);
      });
      this.filteredSentences = [];
      await this.fetchSentences(this.user);
      await this.fetchPastSentences(this.user);
    },
    
    //save the status of the task as "checked"
    checkCorrection(sent, name) {
      if (name === "mama") {
        sent.mamaCheck = true;
      } else if (name === "papa") {
        sent.papaCheck = true;
      }
      let toSend = { data: sent, user: this.user };
      this.$store.dispatch("saveSentence", toSend);
    },

    // Activayed when the user looked through the corrections and wants to remove the completed task:
    resolveSentence() {
      if (this.user === "mama") {
        this.pastFilteredSents.forEach(sent => {
          sent.mamaResolved = true;
          let toSend = { data: sent, user: this.user };
          this.$store.dispatch("saveSentence", toSend);
        });
      } else if (this.user === "papa") {
        this.pastFilteredSents.forEach(sent => {
          sent.papaResolved = true;
          let toSend = { data: sent, user: this.user };
          this.$store.dispatch("saveSentence", toSend);
        });
      }
    },

    // Deletes the sentences if both users resolved them and they are checked
    deleteSentence: function(sent) {
      this.$store.dispatch("removeSentence", sent);
    },

    // Gets current date:
    getDate: function(date) {
      let datevar = new Date(date);
      let day = datevar.getUTCDate();
      let month = datevar.getUTCMonth() + 1;
      return `${day}.${month}`;
    },
  },
};
</script>

<style scoped>
::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}
.check-btn {
  cursor: pointer;
  transition: 0.3s;
}
.check-btn:hover {
  transform: scale(1.3);
}
.line-small {
  font-size: 12px !important;
  opacity: 0.7;
}
.task1 {
  text-decoration: none;
  color: #000;
  background: #ffc;
  display: block;
  height: 15em;
  width: 90%;
  padding: 2em 1em;
  margin: 1em;
  -moz-box-shadow: 5px 5px 7px rgba(33, 33, 33, 1);
  -webkit-box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
  box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
  overflow-y: scroll;
  text-align: left;
}
.original-text {
  font-size: 1vw;
}
.main-task1 {
  width: 96%;
  margin: 0 auto;
  border-collapse: collapse;
  height: 87vh;
  overflow: hidden;
  margin-bottom: 3%;
  z-index: 12 !important;
  position: relative;
  display: flex;
}
.main-half {
  width: 50%;
  display: block;
  overflow-y: scroll;
}
input[type="text"] {
  border: 0;
  padding: 10px;
  border: 2px solid transparent;
  border-bottom-color: black;
  transition: 0.4s;
  background: none;
  outline: none;
  width: 100%;
  height: 20px;
  margin-top: 4%;
  font-size: 1vw;
}

input:focus {
  padding: 20px;
  transition: 0.4s;
  border: 2px solid black;
}
.main-half h1 {
  margin-top: 5%;
}
.main-half:nth-of-type(1) {
  border-right: 1px solid black;
}
.main-half:nth-of-type(2) {
  border-left: 1px solid black;
}
button {
  background: none;
  padding: 7px;
  font-size: 1.3vw;
  margin: 50px auto;
  border: 2px solid black;
  width: 20%;
  transition: all 300ms cubic-bezier(0.77, 0, 0.175, 1);
  cursor: pointer;
  user-select: none;
  outline: none;
}

button:hover {
  background: black;
  color: lightgray;
}
.list {
  color: #555;
  font-size: 1.2vw;
  padding: 0 !important;
  margin: 2% auto;
  width: 80%;
  max-height: 80%;
  border: 1px solid #dedede;
  overflow-y: scroll;
  position: relative;
}

.list li {
  list-style: none;
  border-bottom: 1px dotted black;
  height: auto;
  background: white;
  /* text-transform: capitalize; */
  text-align: left;
  display: flex;
  width: 100%;
  line-height: 22px;
}
.list li:hover {
  background: none;
}

img {
  width: 25px;
  height: auto;
  margin: auto;
}
.completed {
  opacity: 1;
}
.uncompleted {
  opacity: 0;
}
.check-holder {
  width: 60px;
  margin: auto;
  height: auto;
  padding: 15px 15px;
}
.span-holder {
  width: 600px;
  padding-left: 15px;
  display: flex;
  border-left: 1px solid red;
}
li span {
  margin-left: 3px;
  display: inline-block;
  position: relative;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  padding: 5px;
}
.icon {
  opacity: 0;
  transition: all 0.2s linear;
  width: 40px !important;
  height: 40px;
  margin: auto;
  transition: all 0.15s linear;
}

.row:hover > .icon {
  opacity: 1;
}

.icon:hover {
  -webkit-transform: scale(1.3);
}
.createdon {
  font-size: 10px;
  position: relative;
  top: 5px;
}
.list-header {
  display: flex;
  width: 70%;
  margin: 30px auto 0px auto;
  justify-content: space-between;
}

span:before,
span:after {
  content: "";
  position: absolute;
  width: 0%;
  height: 2px;
  top: 50%;
  margin-top: -0.5px;
  background: black;
}

span:before {
  left: -2.5px;
}
span:after {
  right: 2.5px;
  background: black;
  transition: width 0.8s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.row {
  width: 100%;
  display: flex;
  height: fit-content;
}
.icon-small {
  width: 27px !important;
  height: 27px !important;
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
.task1 ul {
  margin-left: 30px;
}

.bird:nth-of-type(1) {
  animation-delay: 1.5s;
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
  top: 20%;
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
  .main-task1 {
    width: calc(96% - 1px);
    height: 86vh;
  }
  h1 {
    font-size: 26px;
  }
  label {
    font-size: 12px;
  }
  .list li {
    line-height: 22px;
  }
  img {
    width: 20px;
    height: auto;
  }
}

/* Horiz Tablet to vertical
===============================*/
@media (min-width: 768px) and (max-width: 1023px) {
  .main-task1{
    width: calc(96% - 2px);
    height: 86vh;
  }
  h1 {
    font-size: 20px;
  }
  input[type="text"] {
    width: 80%;
  }
  label {
    font-size: 12px;
  }
  .list {
    margin: 5% auto;
  }
  .list li {
    line-height: 22px;
    font-size: 18px;
  }
  img {
    width: 20px;
    height: auto;
  }
  .list-header {
    width: 94%;
  }

  .icon {
    width: 28px !important;
    height: auto !important;
  }
  .icon-small {
    width: 20px !important;
    height: auto !important;
  }
}

/* Mobile to Tablet Portrait
===============================*/
@media (min-width: 480px) and (max-width: 767px) {
  .main-task1 {
    width: calc(98% - 2px);
    height: 86vh;
  }
  h1 {
    font-size: 16px;
  }
  input[type="text"] {
    width: 80%;
    padding: 12px;
  }
  button {
    margin: 14px auto;
  }
  label {
    font-size: 9px;
  }
  .list {
    margin: 5% auto;
  }
  .list li {
    line-height: 15px;
    font-size: 12px;
  }
  img {
    width: 16px;
    height: auto;
  }

  .list-header {
    width: 94%;
    margin-top: 6px;
  }
  .list-header span {
    font-size: 12px;
  }

  .icon {
    width: 24px !important;
    height: auto !important;
  }
  .icon-small {
    width: 14px !important;
    height: auto !important;
  }
  
  .line {
    padding: 8px 8px;
    top: 20%;
  }
  span:before,
  span:after {
    top: 32%;
  }
}
@media (max-width: 480px) {
  .main-task1 {
    width: calc(99% - 1px);
    height: 92vh;
    display: flex;
    flex-direction: column;
  }
  .main-half {
    width: 100%;
    height: 50%;
  }
  .main-half:nth-of-type(1) {
    border-bottom: 2px solid black;
    border-right: none;
  }
  h1 {
    font-size: 16px;
  }
  input[type="text"] {
    width: 80%;
    padding: 12px;
  }
  button {
    margin: 14px auto;
    font-size: 12px;
  }
  label {
    font-size: 9px;
  }

  .list {
    margin: 5% auto;
    width: 90%;
  }
  .list li {
    line-height: 15px;
    font-size: 12px;
  }
  img {
    width: 16px;
    height: auto;
  }
  .list-header {
    width: 94%;
    margin-top: 6px;
  }
  .list-header span {
    font-size: 12px;
  }

  .icon {
    width: 24px !important;
    height: auto !important;
  }
  .icon-small {
    width: 14px !important;
    height: auto !important;
  }
  .line {
    padding: 8px 8px;
    top: 20%;
  }
  span:before,
  span:after {
    top: 32%;
  }
}
</style>