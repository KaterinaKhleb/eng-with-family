import axios from 'axios';
const resource_uri = '/notesdb'
const create_uri = '/createnote'
const delete_uri = '/deletenote'
const update_uri = '/updatenote'
const pin_uri_todos = '/pintodo'
const resource_uri_shops = '/shopdb'
const create_uri_shop = '/createshop'
const update_uri_shop = '/updateshop'
const pin_uri_shop = '/pinshop'
const delete_uri_shop = '/deleteshop'

const url = ""



const state = {

    notes: [],
    todos: [],
    shop: [],
    sentences: [],
    pastSentences: []

};

const getters = {
    allNotes: (state) => state.notes,
    allSentences: (state) => state.sentences,
    allShops: (state) => state.shop,
    allPastSentences: (state) => state.pastSentences,
}

const actions = {
    async fetchNotes({ commit }) {
        const response = await axios.get(resource_uri)
        commit('setNotes', response.data)
    },
    async addNote({ commit }, note) {
        const response = await axios.post(create_uri, note);
        commit('newNote', response.data.note);
    },
    async removeNote({ commit }, note) {
        await axios.delete(delete_uri, { data: note });
        commit('deleteNote', note)
    },
    async editNote({ commit }, note) {
        await axios.put(update_uri, { data: note });
        commit('updateNote', note)
    },


    async fetchSentences({ commit }, userName) {
        const response = await axios.get(url + "/sentences/" + userName)
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
    async pinTodo({ commit }, todo) {
        await axios.put(pin_uri_todos, { data: todo });
        commit('updateTodo', todo)
    },

    async fetchShops({ commit }) {
        const response = await axios.get(resource_uri_shops)
        commit('setShops', response.data)
    },

    async addShopList({ commit }, list) {
        const response = await axios.post(create_uri_shop, list);
        commit('newShopList', response.data.shop);
    },
    async updateShopList({ commit }, list) {
        await axios.put(update_uri_shop, { data: list });
        commit('updateShop', list)
    },
    async pinShopList({ commit }, list) {
        await axios.put(pin_uri_shop, { data: list });
        commit('updateShop', list)
    },
    async removeShopList({ commit }, list) {
        await axios.delete(delete_uri_shop, { data: list });
        commit('deleteShopList', list)
    },



};

const mutations = {
    setNotes: (state, notes) => state.notes = notes,
    newNote: (state, note) => state.notes.push(note),
    deleteNote: (state, note) => {
        let index = state.notes.findIndex(n => n._id == note._id)
        state.notes.splice(index, 1)
    },
    updateNote: (state, note) => {
        state.notes.findIndex(n => n._id == note._id)
    },

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


    setShops: (state, shop) => state.shop = shop,

    newShopList: (state, list) => state.shop.push(list),
    updateShop: (state, list) => {
        state.shop.findIndex(t => t._id == list._id)
    },
    deleteShopList: (state, list) => {
        let index = state.shop.findIndex(s => s._id == list._id)
        state.shop.splice(index, 1)
    },


}

export default {
    state,
    getters,
    actions,
    mutations
};