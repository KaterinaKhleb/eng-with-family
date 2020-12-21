<template>
  <div class="main-user">
      <div style="display: flex">
        <div class="user-info col-8">
          <img class="photo" src="../assets/mama.jpg">
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
        <p style="margin-top: 60px"> Complete your daily tasks to get reward!</p>
      </div>
      </div>
      <h3 class="strike-word">Your weekly strike:</h3>
      <!-- <img class="strike" src="../assets/strike_mono.png"> -->
    <div class="notes-lists" >
            <div  class="note pink">
                <span>1</span>
            </div>
            <div  class="note yellow">
                <span>2</span>
               
            </div>
            <div  class="note blue">
                <span>3</span>
               
            </div><div  class="note green">
                <span>4</span>
               
            </div><div  class="note pink">
                <span>5</span>
               
            </div>
    </div>
     
  </div>
  
</template>

<script>


import router from '../router'


export default {
  name: 'Navigation',
 data: function () {
    return {
      clicked: "",
      user: "mama",

    }
  },
  computed: {
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
      }
      return data
    }
  },
 
     methods: {
            navigate(page) {
                this.clicked = page.toLowerCase()
                router.push({ name: page});
            },
              classAktiv: function (item) {
            return {
              "aktiv": this.$route.path == item

    }
  }
        },

}
</script>

<style>
.col-8 {
    width: 66%;
}
.col-4 {
    width: 33%
}
.col-6 {
    width: 50%
}
.main-user {
 display: flex;
 flex-direction: column;
 width: 80vw;
 margin: 40px auto;
 z-index: 15 !important
}

.user-info {
    display: flex;
    border-right: 1px solid black
}
.user-info-table {
  display: flex;
  flex-direction: column;
  margin-left: 40px;
  margin-top: 40px

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
  margin: 10px 0px
}
.strike {
  width: 50vw;
  height: auto;
  margin: 30px auto;
  bottom: 40px;
  left: 25vw
}
.strike-word {
margin-top: 5%
}
.notes-lists {
  display:grid;
  width: 70%;
  margin: 30px auto 0px auto;
  grid-template-columns: repeat(5, 1fr);
}
.note {
text-decoration:none;
  color:#000;
  background:#ffc;
  display:block;
  height:8em;
  width:8em;
   line-height: 5em;
  border-radius: 50%;
  padding: 2em 1em;
  margin: 1em;
  -moz-box-shadow:5px 5px 7px rgba(33,33,33,1);
  -webkit-box-shadow: 5px 5px 7px rgba(33,33,33,.7);
   box-shadow: 5px 5px 7px rgba(33,33,33,.7);
  -webkit-transform:rotate(-6deg);
  -o-transform:rotate(-6deg);
  -moz-transform:rotate(-6deg);
  -moz-transition:-moz-transform .15s linear;
  -o-transition:-o-transform .15s linear;
  -webkit-transition:-webkit-transform .15s linear;
  overflow-Y:scroll
}
.note span {
    font-size: 40px
}

.note:hover{
  -moz-box-shadow:10px 10px 7px rgba(0,0,0,.7);
  -webkit-box-shadow: 10px 10px 7px rgba(0,0,0,.7);
  box-shadow:10px 10px 7px rgba(0,0,0,.7);
  -webkit-transform: scale(1.25);
  -moz-transform: scale(1.25);
  -o-transform: scale(1.25);
  position:relative;
  z-index:5;
}
.pink{
  background: #ffccff;
    -o-transform:rotate(4deg);
  -webkit-transform:rotate(4deg);
  -moz-transform:rotate(4deg);
   position:relative;
  top:5px;
}
.pink span {
    color: #752975
}
.green{
  background: #cfc;
    -o-transform:rotate(-3deg);
  -webkit-transform:rotate(-3deg);
  -moz-transform:rotate(-3deg);
  position:relative;
  top:-5px;
}
.green span {
    color: rgb(14, 82, 14)
}
.yellow{
  background: #feffd1;
    -o-transform:rotate(-1deg);
  -webkit-transform:rotate(-1deg);
  -moz-transform:rotate(-1deg);
  position:relative;
  top:-10px;
}
.yellow span {
    color: #ffd311
}
.blue {
    background: #ccecff;
    -o-transform:rotate(6deg);
  -webkit-transform:rotate(6deg);
  -moz-transform:rotate(6deg);
  position:relative;
  top:10px;
}
.blue span {
    color: #023653
}
/* Tablet horiz to desktop
===============================*/
@media (min-width: 1024px) and (max-width: 1280px)  { 
.main-nav {
  width:96%;
  margin: 1.5em auto 0em auto
}

.link {
  font-size: 16px;
  padding: 20px 0px 
}

}


/* Horiz Tablet to vertical
===============================*/
@media (min-width: 768px) and (max-width: 1023px) {
.main-nav {
  width:96%;
  margin: 1.5em auto 0em auto
}

}


/* Mobile to Tablet Portrait
===============================*/
@media (min-width: 480px) and (max-width: 767px) {

.main-nav {
  width:98%;
  margin: 0.5em auto 0em auto
}
.link {
  font-size: 12px;
  padding: 10px 0px 
}

}
@media (max-width: 480px) {
.main-nav {
  width:99%;
  margin: 0.5em auto 0em auto
}
.link {
  font-size: 10px;
  padding: 6px 0px 
}
}

</style>
