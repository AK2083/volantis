<template>
  <div>
    <v-toolbar dense color="primary">
      <sequence-input />

      <v-spacer></v-spacer>
      <v-btn dark text v-if="markedSymbols.length === 2">Sequenz einfügen</v-btn>
      <v-btn dark text v-if="markedSymbols.length > 0">Symbole ersetzen</v-btn>
    </v-toolbar>
    <v-card style="white-space:nowrap;overflow:auto;overflow-y:hidden"
      id="seqLine"
      class="mx-auto"
    >
      <v-card-title v-if="getSequence !== null">{{getSequence.header}}</v-card-title>
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

export default {
  name: 'SequenceView',
  data: () => ({
    markedSymbols: [],
    previousPosition: null,
  }),
  components: {
    SequenceInput,
  },

  methods: {
    addBaseToSequence(insertObj) {
      this.$store.state.sequences.sequences.part
        .splice(insertObj.positionToInsert, 0, insertObj.newSymbol);
      this.$store.state.sequences.sequences.whichInserted
        .splice(insertObj.positionToInsert, 0, 1);
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
