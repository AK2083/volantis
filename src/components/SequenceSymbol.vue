<template>
    <span>
        <!--<v-bottom-sheet v-model="sheet" persistent>
            <template v-slot:activator="{ on }">
                <v-btn text small color="primary" v-on="on">
                    {{symbol}}
                </v-btn>
            </template>
            <v-sheet class="text-center" height="200px">
                <v-container fluid>
                    <v-row>
                        <v-col xs="3">
                            Position:
                        </v-col>
                        <v-col xs="9">
                            <v-btn small color="green darken-1" disabled class="mr-1">
                                <v-icon small>mdi-plus</v-icon>
                            </v-btn>
                            <v-btn small color="primary" disabled class="mr-1">
                                {{symbol}}
                            </v-btn>
                            <v-btn small color="green darken-1" disabled>
                                <v-icon small>mdi-plus</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col xs="3">
                            Basen:
                        </v-col>
                        <v-col xs="9">
                            <v-btn text small color="primary">A</v-btn>
                            <v-btn text small color="primary">C</v-btn>
                            <v-btn text small color="primary">G</v-btn>
                            <v-btn text small color="primary">T</v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col xs="3">
                            Result:
                        </v-col>
                        <v-col xs="9">
                            <v-btn text small color="primary">
                                <v-icon>mdi-dots-horizontal</v-icon>
                            </v-btn>
                            <v-btn text small color="primary">{{symbol}}</v-btn>
                            <v-btn text small color="primary">G</v-btn>
                            <v-btn text small color="primary">
                                <v-icon>mdi-dots-horizontal</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
                <v-btn text small color="error" @click="sheet=false">Close</v-btn>
            </v-sheet>
        </v-bottom-sheet>-->
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn text small color="primary" v-on="on">
            {{symbol}}
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
                    <v-btn text color="success">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <v-btn text color="primary">
                        {{symbol}}
                    </v-btn>
                    <v-btn text color="success">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
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
                    <v-btn text color="primary" v-for="(stdbase, idx) in base" :key="idx">
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
  props: ['symbol'],
  data: () => ({
    sheet: false,
    dialog: false,
    base: ['A', 'C', 'G', 'T'],
  }),
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
