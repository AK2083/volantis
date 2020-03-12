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
            <ProjectCardLine :project="project" target="oline"/>
          </div>

          <v-list-item-title class="headline mb-1">
            <ProjectCardLine :project="project" target="head"/>
          </v-list-item-title>

          <v-list-item-subtitle>
            <ProjectCardLine :project="project" target="sub"/>
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
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import ProjectCardLine from './ProjectCardLine.vue';

export default {
  name: 'ProjectCard',
  props: ['project', 'projectKey'],
  components: {
    ProjectCardLine,
  },
  methods: {
    removeProjectCard() {
      this.$store.commit('projects/removeProject', this.project.id);
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
