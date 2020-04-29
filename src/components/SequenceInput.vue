<template>
  <div class="text-center">
    <v-dialog
      v-model="isSeqLoaded"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          text
          dark
          v-on="on"
        >
          <v-icon left>mdi-file</v-icon> Datei Öffnen
        </v-btn>
      </template>

      <v-card>
        <v-list shaped>
          <v-subheader>Lese Sequenzdatei</v-subheader>
          <v-card-text>
            <v-file-input v-model="filepart" show-size label="File input"></v-file-input>
          </v-card-text>
          <v-card-actions>
            <v-btn right @click="importContentFromFile">Lese Sequenzen</v-btn>
          </v-card-actions>
          <v-subheader>Sequenzen</v-subheader>
          <v-list-item-group v-model="itemidx" color="primary">
            <v-list-item
              v-for="(item, i) in sequences"
              :key="i"
              @click="loadSequence(item)"
            >
              <v-list-item-icon>
                <v-icon>mdi-nature</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.header"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'SequenceInput',
  data: () => ({
    filepart: null,
    itemidx: 1,
    sequences: [],
    isSeqLoaded: true,
  }),

  created() {
    this.isSeqLoaded = this.isSequenceLoaded;
  },

  methods: {
    loadSequence(seq) {
      // Save in store
      this.$store.commit('sequences/setSequences', seq);
      this.isSeqLoaded = this.isSequenceLoaded;
    },

    checkValidity(seqString) {
      const sequenceArray = [];
      const whitelist = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
        'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

      for (let i = 0; i < seqString.length; i += 1) {
        for (let j = 0; j < whitelist.length; j += 1) {
          if (seqString.charAt(i) === whitelist[j]) {
            sequenceArray.push(seqString.charAt(i));
          }
        }
      }

      return sequenceArray;
    },

    extractSequenceObject(item) {
      // Get header of sequence file
      const header = item.substr(0, item.indexOf('\n'));

      // Get sequence part
      let body = item.substr(item.indexOf('\n') + 1);
      body = body.toUpperCase();
      const part = this.checkValidity(body);

      const whichInserted = new Array(part.length);

      return {
        header,
        part,
        whichInserted,
      };
    },

    importContentFromFile() {
      if (window.File && window.FileReader && window.FileList && window.Blob) {
        const reader = new FileReader();
        reader.readAsText(this.filepart);
        reader.onload = (e) => {
          // Split the sequences by header
          let seqBlob = e.target.result.split('>');
          // Remove empty lines
          seqBlob = seqBlob.filter((item) => item !== '');
          // Build sequence object
          const x = seqBlob.map((item) => this.extractSequenceObject(item));
          this.sequences = x;
        };
      } else {
        alert('Dieser Browser unterstützt den Zugriff auf lokale Dateien nicht');
      }
    },
  },

  computed: {
    isSequenceLoaded() {
      return this.$store.state.sequences.sequences === null;
    },
  },
};
</script>
