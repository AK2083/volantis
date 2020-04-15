export default {
  namespaced: true,

  state: {
    sequences: null,
    currentViewedPosition: null,
  },

  mutations: {
    setSequences(state, payload) {
      state.sequences = payload;
    },
  },
};
