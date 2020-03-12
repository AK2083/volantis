<template>
  <div>
    <v-card outlined>
      <v-list-item class="ma-0 pa-0" style="background-color:#616161;">
        <v-spacer></v-spacer>
        <v-btn icon @click="removeProjectCard"><v-icon>mdi-delete</v-icon></v-btn>
      </v-list-item>

      <v-list-item three-line>
        <v-list-item-content>

          <div class="overline mb-4">
            {{ project.oline }}
          </div>

          <v-list-item-title class="headline mb-1">
            {{ project.head }}
          </v-list-item-title>

          <v-list-item-subtitle>
            {{ project.sub }}
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar color="primary" size="64" tile>
          <v-avatar>
            <span class="white--text headline">{{ getFirstAndLastLetter }}</span>
          </v-avatar>
        </v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn icon text>
          <v-icon>mdi-eye</v-icon>
        </v-btn>
        <v-btn icon text>
          <project-edit :project="project" :projectKey="projectKey"/>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import ProjectEdit from './ProjectEdit.vue';

export default {
  name: 'ProjectCard',
  props: ['project', 'projectKey'],
  components: { ProjectEdit },

  methods: {
    removeProjectCard() {
      this.$store.dispatch('projects/delete', this.projectKey);
    },
  },

  computed: {
    getFirstAndLastLetter() {
      return this.project.head.charAt(0).toUpperCase() + this.project.head.charAt(1).toUpperCase();
    },
  },
};
</script>

<style>
.v-input__slot {
  margin-bottom: 0;
}
</style>
