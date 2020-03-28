export default {
  namespaced: true,

  state: {
    sequences: null,
  },

  mutations: {
    setSequences(state, payload) {
      state.sequences = payload;
    },
  },
};
