<template>
  <div class="spin-loading-container" v-if="$store.state.common.loading">
    <a-spin></a-spin>
  </div>
  <router-view />
</template>

<style lang="less">
#app {
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.spin-loading-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  background-color: rgba(255, 255, 255, 0.4);
}
</style>
