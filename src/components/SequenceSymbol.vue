<template>
    <span>
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <template v-slot:activator="{ on }">
          <v-btn text color="primary" v-on="on">
              {{getSymbol}}
          </v-btn>
        </template>
        <v-card>
            <v-toolbar dark color="primary">
            <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Settings</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn dark text @click="dialog = false">Save</v-btn>
            </v-toolbar-items>
            </v-toolbar>

            <v-list two-line subheader>
            <v-list-item>
                <v-list-item-content>
                <v-list-item-title>Vorschau</v-list-item-title>
                <v-list-item-subtitle class="mt-2">
                  <span>
                    <v-btn v-for="(item, idx) in getSequence.part" :key="idx">
                        {{item}}
                    </v-btn>
                  </span>
                </v-list-item-subtitle>

                </v-list-item-content>
            </v-list-item>
            </v-list>

            <v-list two-line subheader>
            <v-list-item>
                <v-list-item-content>
                <v-list-item-title>Einfügen / Entfernen der Basen / Aminosäuren</v-list-item-title>
                <v-list-item-subtitle class="mt-2">
                    <v-btn text color="error">
                        <v-icon>mdi-close-box-outline</v-icon>
                    </v-btn>
                    <v-btn text color="primary" v-for="(stdbase, idx) in base"
                           :key="idx" @click="addBase(stdbase)">
                        {{stdbase}}
                    </v-btn>
                </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            </v-list>
        </v-card>
        </v-dialog>
    </span>
</template>

<script>
export default {
  name: 'SequenceSymbol',
  props: ['from', 'to', 'position'],
  data: () => ({
    sheet: false,
    dialog: false,
    base: ['A', 'C', 'G', 'T'],
    unmarkedBase: null,
  }),

  methods: {
    getSpecificBase(nr, side) {
      switch (side) {
        case 'left':
          return this.$store.state.sequences.sequences.part[this.position - nr];
        case 'right':
          return this.$store.state.sequences.sequences.part[this.position + nr];
        default:
          return this.$store.state.sequences.sequences.part[this.position];
      }
    },

    addBase(base) {
      if (this.unmarkedBase === 'left') {
        console.log(this.position);
        const seq = this.$store.state.sequences.sequences.part;
        seq.splice((this.position), 0, base);
        // .splice(this.position - 1, 0, base);
        this.position += 1;
        this.symbol = this.$store.state.sequences.sequences.part[this.position];
        console.log(this.position);
        console.log(seq.slice(0, 10));
      }
    },
  },

  computed: {
    getSymbol() {
      return this.$store.state.sequences.sequences.part[this.position];
    },

    getSequence() {
      return this.$store.state.sequences.sequences.part.slice(this.from, this.to);
    },
  },
};
</script>

<style scoped>
.isAddedHidden {
  visibility: hidden;
  width: 0.1rem;
}
.isAddedActive {
  visibility: visible;
}
</style>
