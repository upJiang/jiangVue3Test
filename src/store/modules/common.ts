import { Module } from "vuex";
import { State as RootState } from "../index";

export interface State {
  loading: boolean;
}

const state = {
  loading: false
};

const mutations = {
  setLoading(state, flag: boolean) {
    state.loading = flag;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
} as Module<State, RootState>;
