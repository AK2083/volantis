<template>
  <v-row justify="center">
    <v-dialog v-model="showEditDialog" max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn icon text v-on="on">
            <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{$t("editProjectProps")}}</span>
          <v-spacer></v-spacer>
            <v-btn color="error" icon text
                   @click="showEditDialog = !showEditDialog">
                <v-icon>mdi-close</v-icon>
           </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Projektname*"
                              v-model="project.head" required>
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Projektbeschreibung"
                              v-model="project.sub"
                              required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*{{$t("reqField")}}</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" tile
                 @click="saveEditedProject"
                 :loading="loading"
                 :disabled="loading">
            <v-icon left>mdi-content-save</v-icon>
            {{$t("save")}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'ProjectEdit',
  props: ['project', 'projectKey'],

  data: () => ({
    showEditDialog: false,
    loading: false,
  }),

  methods: {
    saveEditedProject() {
      const id = this.projectKey;
      const header = this.project.head;
      const descr = this.project.sub;
      this.loading = true;

      this.$store.dispatch('projects/patch', { id, head: header, sub: descr })
        .then(() => {
          this.loading = false;
          this.showEditDialog = !this.showEditDialog;
        });
    },
  },
};
</script>

<i18n>
{
  "en": {
    "editProjectProps": "Edit Project Properties",
    "reqField": "indicates required field",
    "save": "Save"
  },

  "de": {
    "editProjectProps": "Projekteigenschaften bearbeiten",
    "reqField": "bezeichnet benötigtes Feld",
    "save": "Speichern"
  }
}
</i18n>
