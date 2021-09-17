import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import user, { State as UserState } from "./modules/user";
import common, { State as CommonState } from "./modules/common";

// 将各模块的State类型汇总
export interface State {
  user: UserState;
  common: CommonState;
}

export const key: InjectionKey<Store<State>> = Symbol();

const debug = process.env.NODE_ENV !== "production";

export const store = createStore<State>({
  modules: { user, common },
  strict: debug,
});
// 向组件注入$store的类型声明
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
