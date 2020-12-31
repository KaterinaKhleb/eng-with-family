import axios from 'axios';

const url = "" //"http://localhost:3000"

const state = {

    sentences: [],
    pastSentences: [],
    essays: [],
    pastEssays: [],
    reviews: [],
    pastreviews: [],
    username: "",
    mamaStrikes: 0,
    papaStrikes: 0

};

const getters = {
    allSentences: (state) => state.sentences,
    allPastSentences: (state) => state.pastSentences,
    essay: (state) => state.essays,
    pastEssay: (state) => state.pastEssays,
    review: (state) => state.reviews,
    pastreview: (state) => state.pastreviews,
    username: (state) => state.username,
    mamaStrike: (state) => state.mamaStrikes,
    papaStrike: (state) => state.papaStrikes,
}

const actions = {
    async userinfo({ commit }) {
        console.log("Fetching user info")
        const response = await axios.get(url + "/userinfo");
        commit("setUserinfo", response.data.user)

    },
    async login(_, name) {
        console.log('Logging in as:', name)
        const response = await axios.post(url + "/login", { name });
        if (response.data !== "OK") {
            console.log("Login failed");
            return false;
        } else {
            console.log('Login success')
            return true;
        }
    },
    async fetchUserStrikes({ commit }, userName) {
        const response = await axios.get(url + "/user/" + userName)
        commit('setUserStrikes', response.data)
    },
    async saveUserStrikes(_, data) {
        await axios.put(url + "/user", { data: data });
        // commit('updateSentence', sent)
    },
    async fetchSentences({ commit }, userName) {
        const response = await axios.get(url + "/sentences/" + userName)
        console.log(response.data)
        commit('setSentences', response.data)
    },
    async fetchPastSentences({ commit }, userName) {
        const response = await axios.get(url + "/pastsentences/" + userName)
        commit('setPastSentences', response.data)
        console.log(response.data)
    },
    async addSentence({ commit }, sent) {
        const response = await axios.post(url + "/sentences", sent);
        console.log(response.data)
        commit('newSentence', response.data);
    },
    async removeSentence({ commit }, sent) {
        await axios.delete(url + "/sentences", { data: sent });
        commit('deleteSentence', sent)
    },
    async saveSentence({ commit }, sent) {
        console.log("item to save", sent)
        await axios.put(url + "/sentences", { data: sent });
        commit('updateSentence', sent)
    },

    async fetchreviews({ commit }, userName) {
        const response = await axios.get(url + "/review/" + userName)
        commit('setReviews', response.data)
        console.log(response.data)

    },
    async fetchPastreviews({ commit }, userName) {
        const response = await axios.get(url + "/pastreview/" + userName)
        commit('setPastReviews', response.data)

    },
    async addreview({ commit }, sent) {
        console.log(sent)
        const response = await axios.post(url + "/review", sent);
        commit('newReview', response.data);
    },
    async removereview({ commit }, sent) {
        await axios.delete(url + "/review", { data: sent });
        commit('deleteReview')
    },
    async savereview({ commit }, sent) {
        await axios.put(url + "/review", { data: sent });
        commit('updateReview', sent)
    },

    async fetchEssays({ commit }, userName) {
        const response = await axios.get(url + "/essay/" + userName)
        commit('setEssays', response.data)
        console.log(response.data)

    },
    async fetchPastEssays({ commit }, userName) {
        const response = await axios.get(url + "/pastessay/" + userName)
        commit('setPastEssays', response.data)

    },
    async addEssay({ commit }, sent) {
        const response = await axios.post(url + "/essay", sent);
        commit('newEssay', response.data);
    },
    async removeEssay({ commit }, sent) {
        await axios.delete(url + "/essay", { data: sent });
        commit('deleteEssay')
    },
    async saveEssay({ commit }, sent) {
        await axios.put(url + "/essay", { data: sent });
        commit('updateEssay', sent)
    }
};

const mutations = {

    setUserinfo: (state, info) => state.username = info,

    setSentences: (state, sent) => state.sentences = sent,
    setPastSentences: (state, sent) => state.pastSentences = sent,
    newSentence: (state, sent) => state.sentences.push(sent),
    deleteSentence: (state, sent) => {
        let index = state.sentences.findIndex(t => t._id == sent._id)
        state.sentences.splice(index, 1)
    },
    updateSentence: (state, sent) => {
        state.sentences.findIndex(t => t._id == sent._id)
    },

    setEssays: (state, sent) => state.essays = sent,
    setPastEssays: (state, sent) => state.pastEssays = sent,
    newEssay: (state, sent) => state.essays.push(sent),
    updateEssay: (state, sent) => {
        state.essays = sent
    },
    deleteEssay: () => console.log("ok"),
    setReviews: (state, sent) => state.reviews = sent,
    setPastReviews: (state, sent) => state.pastreviews = sent,
    newReview: (state, sent) => state.reviews.push(sent),
    updateReview: (state, sent) => {
        state.reviews = sent
    },
    deleteReview: () => console.log("ok"),
    setUserStrikes: (state, data) => {
        console.log("DBXEIEIBDYEX", data)

        if (data[0].name === 'mama') {
            state.mamaStrikes = data[0].strikes
        } else if (data[0].name === 'papa') {
            state.papaStrikes = data[0].strikes
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};