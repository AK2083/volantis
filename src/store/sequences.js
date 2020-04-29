export default {
  namespaced: true,

  state: {
    sequences: null,
    original: null,
  },

  mutations: {
    setSequences(state, payload) {
      state.sequences = payload;
      state.original = payload;
    },

    removeSymbol(state, payload) {
      payload.forEach((item, idx) => {
        state.sequences.part.splice(item - idx, 1);
      });
    },
  },
};
