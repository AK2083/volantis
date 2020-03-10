export default {
  namespaced: true,

  state: {
    user: null,
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },

  getters: {
    isAuthenticated: (state) => state.user !== null && state.user !== undefined,
  },
};
