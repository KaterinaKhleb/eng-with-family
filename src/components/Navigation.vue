<template>
<div class="main-nav">
<div class="nav-holder">
<a v-bind:class="classAktiv('/task1')" exact class="link" v-on:click="navigate('Task1')" > 
Task 1
<img v-if="(user==='mama' && allSentences.length != 0 && toDo === true)||(user==='papa'&& allSentences.length != 0 && toDo=== true)" src="../assets/alarm.png" class="icon"> 
</a>
<a v-bind:class="classAktiv('/task2')" exact class="link" v-on:click="navigate('Task2')" > Task 2
<img v-if="(user==='mama' && essay != null && toWriteEssay === true)||(user==='papa'&& essay != null && toWriteEssay=== true)" src="../assets/alarm.png" class="icon"> 
</a>
<a v-bind:class="classAktiv('/task3')" exact class="link" v-on:click="navigate('Task3')" > Task 3
<img  v-if="(user==='mama' && review != null && toWriteReview === true)||(user==='papa'&& review != null && toWriteReview=== true)" src="../assets/alarm.png" class="icon"> 
</a>

</div>
<img v-on:click="navigate('User')" src="../assets/user.png" class="icon user-icon" >

</div>
</template>

<script>
import router from "../router";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Navigation",
  data: function() {
    return {
      clicked: "",
      user: "",
    };
  },

  async created() {
    await this.userinfo(this.user);
    this.user = this.username;

    await this.fetchSentences(this.user);
    await this.fetchEssays(this.user);
    await this.fetchreviews(this.user)
  },

  computed: {
    ...mapGetters(["allSentences", "allPastSentences", "essay", "username", 'review']),

    toDo() {
      if (this.user === "mama") {
        let ind = this.allSentences.findIndex(el => el.mamaVersion === "");
        if (ind != -1) {
          return true;
        } else {
          return false;
        }
      } else if (this.user === "papa") {
        let ind = this.allSentences.findIndex(el => el.papaVersion === "");
        if (ind != -1) {
          return true;
        } else {
          return false;
        }
      } else return false;
    },
    toWriteEssay() {
      if (this.user === "mama") {
        if (this.essay.mamaVersion != "") {
          return false;
        } else {
          return true;
        }
      } else if (this.user === "papa") {
        if (this.essay.papaVersion != "") {
          return false;
        } else {
          return true;
        }
      } else return false;
    },
        toWriteReview() {
      if (this.user === "mama") {
        if (this.review.mamaVersion != "") {
          return false;
        } else {
          return true;
        }
      } else if (this.user === "papa") {
        if (this.review.papaVersion != "") {
          return false;
        } else {
          return true;
        }
      } else return false;
    },
  },

  methods: {
    ...mapActions([
      "fetchSentences",
      "fetchPastSentences",
      "addSentence",
      "saveSentence",
      "fetchEssays",
      "userinfo",
      "fetchreviews"
    ]),

    navigate(page) {
      this.clicked = page.toLowerCase();
      router.push({ name: page });
    },
    classAktiv: function(item) {
      return {
        aktiv: this.$route.path == item,
      };
    },
  },
};
</script>

<style>
.icon {
  width: 40px;
  height: aut0;
}
.nav-holder {
  display: inline-table;
  justify-content: space-evenly;
  z-index: 10 !important;
  table-layout: fixed;
  position: relative;
  width: 60%;
  border-collapse: collapse;
}
.main-nav {
  margin: 1em auto 0em auto;
  width: 94%;
}
.link {
  padding: 30px 0px;
  font-family: "Space Mono", monospace;
  font-size: 18px;
  text-align: center;
  vertical-align: middle;
  border-collapse: collapse;
  display: table-cell;
  width: 25%;
  cursor: pointer;
}
.aktiv {
  background: black;
  color: lightgray;
}

.icon {
  width: 40px;
  height: auto;
  transition: 0.5s;
}

.icon:hover {
  transform: scale(1.3);
}
.user-icon {
  float: right;
  margin-top: 1.5em;
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
