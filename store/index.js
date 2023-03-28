import Vue from 'vue'
import Vuex from 'vuex'
import resume from './module/resume'
import add from './module/add'
import update from './module/update';
import user from './module/user';

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {},
	mutations: {},
	getters: {},
	modules: {
		resume,
		add,
		update,
		user
	}
})

export default store
