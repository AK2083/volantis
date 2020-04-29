<template>
  <div>
    <v-toolbar dense color="primary">
      <sequence-input />
    </v-toolbar>

    <v-card style="white-space:nowrap;overflow:auto;overflow-y:hidden"
      id="seqLine"
      class="mx-auto"
    >
      <v-card-title v-if="getSequence !== null">
        {{getSequence.header}}

        <v-spacer></v-spacer>

        <sequence-edit v-if="markedSymbols.length > 0"/>
        <v-btn icon v-if="markedSymbols.length > 0" @click="removeSymbol">
          <v-icon color="error">mdi-close</v-icon>
        </v-btn>
        <v-btn icon >
          <v-icon color="error">mdi-delete</v-icon>
        </v-btn>

      </v-card-title>
      <v-card-text v-if="getSequence !== null">
        <v-btn-toggle v-model="markedSymbols" multiple dark dense>
          <span v-for="(subitem, pos) in getSequence.part" :key="pos">
            <v-btn text x-large color="primary">
              {{ subitem }}
            </v-btn>
          </span>
        </v-btn-toggle>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import SequenceInput from '../components/SequenceInput.vue';
import SequenceEdit from '../components/SequenceEdit.vue';

export default {
  name: 'SequenceView',
  data: () => ({
    dialog: false,
    markedSymbols: [],
    wordbook: ['A', 'C', 'G', 'T'],
  }),
  components: {
    SequenceInput,
    SequenceEdit,
  },

  methods: {
    addBaseToSequence(insertObj) {
      this.$store.state.sequences.sequences.part
        .splice(insertObj.positionToInsert, 0, insertObj.newSymbol);
    },

    removeSymbol() {
      this.$store.commit('sequences/removeSymbol', this.markedSymbols);
      this.markedSymbols = [];
    },

    replaceSymbol() {

    },
  },

  computed: {
    getSequence() {
      return this.$store.state.sequences.sequences;
    },
  },
};
</script>

<style scoped>
#seqLine::-webkit-scrollbar {
  height: 5px;
}
#seqLine::-webkit-scrollbar-track {
  background: #f1f1f1;
}
#seqLine::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
#seqLine::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
