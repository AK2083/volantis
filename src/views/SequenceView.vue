<template>
  <div>
    <v-card>
      <v-card-text>
        <v-file-input v-model="filepart" show-size label="File input"></v-file-input>
      </v-card-text>
      <v-card-actions>
        <v-btn right @click="importTxt">Read File</v-btn>
      </v-card-actions>
    </v-card>
    <v-card style="white-space:nowrap;overflow:scroll;overflow-y:hidden"
      v-for="(item, idx) in sequences" :key="idx" id="seqLine"
      class="mx-auto"
    >
      <v-card-title>{{item.header}}</v-card-title>
      <v-card-text>
        <span v-for="(subitem, pos) in item.part" :key="pos">
            <sequence-symbol :symbol="subitem"></sequence-symbol>
        </span>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import SequenceSymbol from '../components/SequenceSymbol.vue';

export default {
  name: 'SequenceView',
  data: () => ({
    filepart: null,
    sequences: null,
  }),
  components: { SequenceSymbol },

  methods: {
    importTxt() {
      if (window.File && window.FileReader
            && window.FileList && window.Blob) {
        const reader = new FileReader();
        reader.readAsText(this.filepart);
        reader.onload = (e) => {
          this.sequences = e.target.result.split('>');

          if (this.sequences[0] === '') {
            this.sequences.shift();
          }

          const x = this.sequences.map((item) => {
            const header = item.substr(0, item.indexOf('\n'));
            let body = item.substr(item.indexOf('\n') + 1);
            body = body.split('\n');
            const part = body[1].split('');

            return {
              header,
              part,
            };
          });

          this.sequences = x;
        };
      } else {
        alert('Dieser Browser unterstützt den Zugriff auf lokale Dateien nicht');
      }
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
