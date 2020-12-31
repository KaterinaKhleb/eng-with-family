<template>
  <div class="main">
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   id="SVGRoot"
   version="1.1"
   viewBox="0 0 778 778"
   height="778px"
   width="778px">
  <defs
     id="defs1234" />
  <metadata
     id="metadata1237">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title></dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <g
     id="layer1">
   
    <circle class="path"
       r="355.57233"
       cy="388.50391"
       cx="387.51169"
       id="path18"
       style="fill:none;fill-opacity:1;stroke:#000000;stroke-width:3.03328609;stroke-miterlimit:4;stroke-opacity:1" />
    <circle class="path"
       r="386.13174"
       cy="389"
       cx="389"
       id="path18-3"
       style="opacity:0.27000002;fill:none;fill-opacity:1;stroke:#000000;stroke-width:1.42384982;stroke-miterlimit:4;stroke-opacity:1" />
  </g>
</svg>
<h1 class="hello">Hello,</h1>
<input v-model="user"  v-on:keyup.enter="navigate()" type="text">
<button v-on:click="navigate()" class="from-center">E n t e r </button>

	<div class="bird-container ">
		<div v-on:click="alert()" class="bird "></div>
	</div>
  <div class="bird-container ">
		<div v-on:click="alert()" class="bird "></div>
	</div>
  <div class="bird-container bird-container-back">
		<div v-on:click="alert()" class="bird bird-back"></div>
	</div>


	

  </div>
</template>

<script>

import router from '../router'
import { mapActions } from 'vuex';

export default {
  name: 'Enter',
    data () {
             return {
                user: "",
                
            }
    },
  props: {
    msg: String
  },
  methods: {
    ...mapActions(['login']),

    async navigate() {
      console.log('User', this.user)
      const success = await this.login(this.user);
      if (success) {
        router.push({ name: "User" });
      }
      this.$forceUpdate()
    },
  }
}
</script>

<style scoped>
.main {
  text-align: center;
  width: 100%;
  height: 100%;
  z-index: 1;
	position: relative;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	min-height: 35rem;
    display: flex;
  justify-content:space-evenly;
  z-index:9 !important;
  position: relative;
	
}
.hello {
  position: absolute;
  top:40%
}
input[type=text]{
  border: 0;
   padding: 30px; 
   border: 2px solid transparent; 
   border-bottom-color: black; 
   transition: 0.4s;
   background: none;
   outline: none;
   width:10%;
   height:40px;
   margin-top:1%;
   position: absolute;
   font-size: 26px;
   top:47%
  }

input:focus{
  padding: 40px;
   transition: 0.4s;
   border:2px solid black
   }

.main svg{
  width: 40%;
  height: auto;
  margin: auto;
    vertical-align: middle;
}
.bird {
	background-image: url('../assets/bird.svg');
	background-size: auto 100%;
	width: 88px;
	height: 125px;
	will-change: background-position;
  animation-duration: 1s;
	animation-name: fly-cycle;
	animation-timing-function: steps(10);
	animation-iteration-count: infinite;
}
.bird-back {
animation-delay: 6.5s;	
	background-image: url('../assets/bird_back.svg');

}
.bird:nth-of-type(1){
animation-delay: 1.5s;	
}
.bird:nth-of-type(2){
animation-delay: 11.5s;	
}
/* .bird:nth-of-type(3){
animation-delay: 16.5s;	
} */

.bird-container {
	position: absolute;
	transform: scale(0) translateX(-10vw);
	will-change: transform;
	animation-name: fly-right-one;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
  animation-duration: 15s;
}
.bird-container-back{
	/* transform: scale(0) translateX(110vw) !important; */
	animation-name: fly-left-one !important;
  position: absolute;
	transform: scale(0) translateX(-10vw);
	will-change: transform;
	animation-name: fly-right-one;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
  animation-duration: 15s;
  top: 60%;
	left: -10%;
	animation-delay: 5s;

}

.bird-container:nth-of-type(1){
	top: 20%;
	left: -10%;
	animation-delay: 0s;

}
.bird-container:nth-of-type(2){
	top: 80%;
	left: -10%;
	animation-delay:10s;

}

.letter {
  opacity: 0;
}
.letter:nth-of-type(1) {
  animation: appear 0.3s 2.2s linear forwards; 
}
.letter:nth-of-type(2) {
  animation: appear 0.3s 2.3s linear forwards; 
}
.letter:nth-of-type(3) {
  animation: appear 0.3s 2.4s linear forwards; 
}
.letter:nth-of-type(4) {
  animation: appear 0.3s 2.5s linear forwards; 
}
.letter:nth-of-type(5) {
  animation: appear 0.3s 2.6s linear forwards; 
}
.letter:nth-of-type(6) {
  animation: appear 0.3s 2.7s linear forwards; 
}
.letter:nth-of-type(7) {
  animation: appear 0.3s 2.8s linear forwards; 
}
.letter:nth-of-type(8) {
  animation: appear 0.3s 2.9s linear forwards; 
}
.letter:nth-of-type(9) {
  animation: appear 0.3s 3.0s linear forwards; 
}

@keyframes appear {
  to {
    opacity: 1;
  }
}
.path {
    stroke-dasharray: 2500px;
    stroke-dashoffset: 2500px;
    animation: drawing 1.8s 0.5s ease-in-out forwards;
}
@keyframes drawing {
    to {
        stroke-dashoffset: 0px;
    }
} 

button {
  background: none;
  padding: 7px;
  font-family: 'Space Mono', monospace;
  font-size: 20px;
  width: 10%;
  margin: 10px auto;
  border: none;
  position: fixed;
  top:60%;
  /* text-transform: uppercase; */
	transition: all 500ms cubic-bezier(0.77, 0, 0.175, 1);	
	cursor: pointer;
	user-select: none;
  outline: none;
  opacity: 0;
  animation: appear 0.3s 1s cubic-bezier(0.77, 0, 0.175, 1) forwards ;
}

@keyframes appear {
  to {
    opacity: 1;
  }
}
button:before, button:after {
	content: '';
	position: absolute;	
	transition: inherit;
	z-index: -1;
}

button:hover {
	color:whitesmoke;
	transition-delay: .5s;
}

button:hover:before {
	transition-delay: 0s;
}

button:hover:after {
	background: black;
	transition-delay: .35s;
}

.from-center:before {
	top: 0;
	left: 50%;
	height: 100%;
	width: 0;
	border: 1px solid black;
	border-left: 0;
	border-right: 0;
}

.from-center:after {
	bottom: 0;
	left: 0;
	height: 0;
	width: 100%;
	background: black;
}

.from-center:hover:before {
	left: 0;
	width: 100%;
}

.from-center:hover:after {
	top: 0;
	height: 100%;
}




/* Tablet horiz to desktop
===============================*/
@media (min-width: 1024px) and (max-width: 1280px)  { 
button {
  font-size: 14px !important
}

}


/* Horiz Tablet to vertical
===============================*/
@media (min-width: 768px) and (max-width: 1023px) {

button {
  font-size: 12px !important;
  padding: 3px;
  top:57%
}

.main svg {
  width:65%
}
}


/* Mobile to Tablet Portrait
===============================*/
@media (min-width: 480px) and (max-width: 767px) {


.main {
  min-height: 0rem;
}

button {
  font-size: 10px !important;
  padding: 3px;
  top:57%
}


.bird-container-back{
	/* transform: scale(0) translateX(110vw) !important; */

  top:10%;
	left: -10%;


}

.bird-container:nth-of-type(1){
	top: 20%;
	left: -10%;
	animation-delay: 0s;

}
.bird-container:nth-of-type(2){
	top: 50%;
	left: -10%;
	animation-delay:10s;

}

.bird {
	width: 88px;
	height: 125px;

}

}
@media (max-width: 480px) {

.main svg {
  width:80%
}
button {
  font-size: 12px;
  width:50%;
  top:57%
}
}
</style>
