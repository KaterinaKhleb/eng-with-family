<template>
  <div class="main-user">
    <button class="logout-btn" v-on:click="logout()">
      <img src="../assets/logout.png"  class="icon">
      Logout
    </button>
      <div style="display: flex">
        <div class="user-info col-8">
          <img v-if="user==='mama'" class="photo" src="../assets/mama.png">
          <img v-if="user==='papa'" class="photo" src="../assets/papa.png">
          <img v-if="user==='admin'" class="photo" src="../assets/admin.jpeg">

          <div class="user-info-table ml-3 mt-3">
            <tr class="info-line" v-bind:key="key" v-for="(item, key ) in userData">
              <div class="col-6">
                <p> {{key}}:</p>
              </div>
                <div class="col-6">
                 <p>{{item}}</p> 
              </div>
            </tr>

          </div>
      </div>
      <div class="col-4 rewards"> 
        <h2 style="text-decoration: underline">Rewards:</h2> 
        <p style="margin-top: 60px"> Complete your 10-weeks strike to get reward!</p>
      </div>
      </div>
      <h3 class="strike-word">Your weekly strike:</h3>
      <!-- <img class="strike" src="../assets/strike_mono.png"> -->
    <div v-if="user==='mama'" class="notes-lists" >
            <div v-for="n in mamaStrike" v-bind:key="n"  class="note ">
                <span>{{n}}</span>
            </div>
    </div>
        <div v-if="user==='papa'" class="notes-lists" >
             <div v-for="n in papaStrike" v-bind:key="n"  class="note ">
                <span>{{n}}</span>
            </div>
    </div>
    <div v-if="user==='admin'" style="display: flex" >
      <div style="width: 50%">
        <span>Mama's strike: </span> 
        <input type="text" v-model="mamaStrikeNew"> <br>
        <button v-on:click="saveStrike('mama')"> Save strike </button>
      </div>  
       <div style="width: 50%">
        <span>Papa's strike: </span> 
        <input type="text" v-model="papaStrikeNew"> <br>
        <button v-on:click="saveStrike('papa')"> Save strike </button>
      </div>  
    
    </div>
     
  </div>
  
</template>

<script>


import router from '../router'
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'Navigation',
 data: function () {
    return {
      clicked: "",
      user: "",
      strike: 10,
      mamaStrikeNew: 0,
      papaStrikeNew: 0

    }
  },
  computed: {
     ...mapGetters(['allSentences', "allPastSentences", "username", 'mamaStrike', 'papaStrike']), 

    userData() {
      let data = {}
      if (this.user === "mama") {
        data = {
          name: "Mama",
          occupation: "The best mother in the world",
          hobbies: "Learning English, cooking",
          "level of English": "I can understand French people",
          goal: "to watch Friends without subtitles",
        }
      }else if (this.user === "papa") {
        data = {
          name: "Papa",
          occupation: "the best dad in the world / capitain",
          hobbies: "Learning English, making money",
          "level of English": "I can always find a way to communicate with people",
          goal: "to be able to explain in details the cook on my ship what I want for lunch",
        }
        }else if (this.user === "admin") {
          data = {
            name: "English guru",
            occupation: "Being cool",
            hobbies: "Video games, being cool",
            "level of English": "11/10",
            goal: "get 10 in IELTS",
        }
        }
      
      return data
    },
  
  },
       async created(){
          await this.userinfo()
          this.user = this.username
          if (this.user !== 'admin') {
            await this.fetchUserStrikes(this.user)
          }else {
            await this.fetchUserStrikes("mama")
            await this.fetchUserStrikes("papa")
            this.mamaStrikeNew = this.mamaStrike
            this.papaStrikeNew = this.papaStrike
          }


        },
 
     methods: {
          ...mapActions(['fetchSentences', "fetchPastSentences", 'addSentence', 'saveSentence', 'userinfo', 'fetchUserStrikes', 'saveUserStrikes']),

            navigate(page) {
                this.clicked = page.toLowerCase()
                router.push({ name: page});
            },
              classAktiv: function (item) {
            return {
              "aktiv": this.$route.path == item

              }
            },
            async saveStrike(name) {

              if (name === "mama") {
                let toSend = {name: name, strikes: this.mamaStrikeNew}
                 this.saveUserStrikes(toSend)
              }else {
                let toSend = {name: name, strikes: this.papaStrikeNew}
                 this.saveUserStrikes(toSend)
              }

            },
            logout () {
              router.push({ name: "Enter" });
            }
        },

}
</script>

<style>
.logout-btn {
  position: absolute;
  top: 7%;
  right: 2%;
  width: 100px
}
input[type=text]{
  border: 0;
   padding: 10px; 
   border: 2px solid transparent; 
   border-bottom-color: black; 
   transition: 0.4s;
   background: none;
   outline: none;
   width:40%;
   height:20px;
   margin-top:4%;
   font-size: 18px
  }

input:focus{
  padding: 20px;
   transition: 0.4s;
   border:2px solid black
   }
   button {
  background: none;
  padding: 7px;
  font-size: 20px;
  margin: 50px auto;
  border: 2px solid black;
  width: 40%;
  transition: all 300ms cubic-bezier(0.77, 0, 0.175, 1);	
  cursor: pointer;
  user-select: none;
  outline: none
}

button:hover{
  background: black;
  color:lightgray
}
.col-8 {
  width: 66%;
}
.col-4 {
  width: 33%;
}
.col-6 {
  width: 50%;
}
.main-user {
  display: flex;
  flex-direction: column;
  width: 80vw;
  margin: 40px auto;
  z-index: 15 !important;
}

.user-info {
  display: flex;
  border-right: 1px solid black;
}
.user-info-table {
  display: flex;
  flex-direction: column;
  margin-left: 40px;
  margin-top: 40px;
}
.photo {
  width: 400px;
  height: auto;
}
tr {
  display: flex;
  float: left;
}
tr div {
  text-align: left !important;
  margin: 10px 0px;
}
.strike {
  width: 100vw;
  height: auto;
  margin: 30px auto;
  bottom: 40px;
  left: 25vw;
}
.strike-word {
  /* margin-top: 5% */
}
.notes-lists {
  display: grid;
  overflow: scroll;
  width: 70%;
  height: 20%;
  margin: 30px auto 0px auto;
  grid-template-columns: repeat(5, 1fr);
}
.note {
  text-decoration: none;
  color: #000;
  background: #ffc;
  display: block;
  height: 8em;
  width: 8em;
  line-height: 4em;
  border-radius: 50%;
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
.note span {
  font-size: 40px;
}

.note:hover {
  -moz-box-shadow: 10px 10px 7px rgba(0, 0, 0, 0.7);
  -webkit-box-shadow: 10px 10px 7px rgba(0, 0, 0, 0.7);
  box-shadow: 10px 10px 7px rgba(0, 0, 0, 0.7);
  -webkit-transform: scale(1.25);
  -moz-transform: scale(1.25);
  -o-transform: scale(1.25);
  position: relative;
  z-index: 5;
}
.note:nth-of-type(1),
.note:nth-of-type(5),
.note:nth-of-type(8) {
  background: #ffccff;
  -o-transform: rotate(4deg);
  -webkit-transform: rotate(4deg);
  -moz-transform: rotate(4deg);
  position: relative;
  top: 5px;
}
.note:nth-of-type(1) span,
.note:nth-of-type(5) span,
.note:nth-of-type(8) span {
  color: #752975;
}
.note:nth-of-type(2),
.note:nth-of-type(6),
.note:nth-of-type(9) {
  background: #cfc;
  -o-transform: rotate(-3deg);
  -webkit-transform: rotate(-3deg);
  -moz-transform: rotate(-3deg);
  position: relative;
  top: -5px;
}
.note:nth-of-type(2) span,
.note:nth-of-type(6) span,
.note:nth-of-type(9) span {
  color: rgb(14, 82, 14);
}
.note:nth-of-type(3),
.note:nth-of-type(7),
.note:nth-of-type(10) {
  background: #feffd1;
  -o-transform: rotate(-1deg);
  -webkit-transform: rotate(-1deg);
  -moz-transform: rotate(-1deg);
  position: relative;
  top: -10px;
}
.note:nth-of-type(3) span,
.note:nth-of-type(7) span,
.note:nth-of-type(10) span {
  color: #ffd311;
}
.note:nth-of-type(4),
.note:nth-of-type(8) {
  background: #ccecff;
  -o-transform: rotate(6deg);
  -webkit-transform: rotate(6deg);
  -moz-transform: rotate(6deg);
  position: relative;
  top: 10px;
}
.note:nth-of-type(4) span,
.note:nth-of-type(8) span {
  color: #023653;
}
/* Tablet horiz to desktop
===============================*/
@media (min-width: 1024px) and (max-width: 1280px) {
  .main-nav {
    width: 96%;
    margin: 1.5em auto 0em auto;
  }

  .link {
    font-size: 16px;
    padding: 20px 0px;
  }
}

/* Horiz Tablet to vertical
===============================*/
@media (min-width: 768px) and (max-width: 1023px) {
  .main-nav {
    width: 96%;
    margin: 1.5em auto 0em auto;
  }
}

/* Mobile to Tablet Portrait
===============================*/
@media (min-width: 480px) and (max-width: 767px) {
  .main-nav {
    width: 98%;
    margin: 0.5em auto 0em auto;
  }
  .link {
    font-size: 12px;
    padding: 10px 0px;
  }
}
@media (max-width: 480px) {
  .main-nav {
    width: 99%;
    margin: 0.5em auto 0em auto;
  }
  .link {
    font-size: 10px;
    padding: 6px 0px;
  }
}
</style>
