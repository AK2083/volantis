<template>
  <v-container fluid>
    <v-row class="mb-6">
      <v-col xl="3">
        <v-card outlined>
          <v-list-item class="ma-0 pa-0">
            <v-list-item-title class="headline" style="text-align:center">
              <v-btn block text color="success"
                     style="min-height:210px;min-width:300px" @click="addProject">
                <v-icon x-large>mdi-plus</v-icon>
              </v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col v-for="(card, key) in getProjects" :key="card.id" :xs="12" :sm="6" :lg="4" :xl="3">
        <project-card :project="card" :projectKey="key"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as faker from 'faker';
import { v4 as uuidv4 } from 'uuid';
import ProjectCard from '../components/ProjectCard.vue';

export default {
  name: 'DashboardView',

  components: {
    ProjectCard,
  },

  methods: {
    addProject() {
      this.$store.dispatch('projects/insert', {
        id: uuidv4(),
        oline: new Date().toLocaleString(),
        head: `${faker.address.state()} Project`,
        sub: faker.lorem.sentence(),
      });
    },
  },

  created() {
    const where = [];
    const orderBy = ['oline'];

    this.$store.dispatch('projects/openDBChannel', { clauses: { where, orderBy } });
  },

  computed: {
    getProjects() {
      return this.$store.state.projects.data;
    },
  },
};
</script>
