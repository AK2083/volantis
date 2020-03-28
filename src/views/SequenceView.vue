<template>
  <div>
    <v-toolbar dense>
      <v-spacer></v-spacer>

      <sequence-input />
    </v-toolbar>
    <v-card style="white-space:nowrap;overflow:scroll;overflow-y:hidden"
      id="seqLine"
      class="mx-auto"
    >
      <v-card-title v-if="getSequence !== null">{{getSequence.header}}</v-card-title>
      <v-card-text v-if="getSequence !== null">
        <span v-for="(subitem, pos) in getSequence.part" :key="pos">
            <sequence-symbol :from="getFromPosition(pos)"
                             :to="getToPosition(pos)"
                             :position="pos"></sequence-symbol>
        </span>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import SequenceSymbol from '../components/SequenceSymbol.vue';
import SequenceInput from '../components/SequenceInput.vue';

export default {
  name: 'SequenceView',
  data: () => ({
    MaxPositionsFromBase: 2,
  }),
  components: {
    SequenceSymbol,
    SequenceInput,
  },

  methods: {
    getFromPosition(pos) {
      const x = pos <= this.MaxPositionsFromBase ? 0 : (pos - this.MaxPositionsFromBase);
      return x;
    },

    getToPosition(pos) {
      const x = pos === this.getSequence.part.length
        || pos === (this.getSequence.part.length - 1)
        ? pos : (pos + this.MaxPositionsFromBase + 1);
      return x;
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
