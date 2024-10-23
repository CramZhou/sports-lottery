export default defineStore("main", {
  state: () => ({
    count: 0
  }),
  getters: {
    doubleCount() {
      return this.count * 2;
    }
  },
  actions: {
    increase() {
      this.count++;
    }
  }
});
