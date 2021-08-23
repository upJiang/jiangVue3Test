import {Module} from 'vuex';
import {State as RootState} from '../index';

export interface State {
    age: number;
}

const state = {
    age: 5
}

const getters = {
    age: state => state.age
}

const actions = {
    addAge({commit, state}, value: number) {
        commit('SET_USER_AGE', state.age + value);
    }
}

const mutations = {
    SET_USER_AGE(state, age: State['age']) {
        state.age = age;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}as Module<State, RootState>;
