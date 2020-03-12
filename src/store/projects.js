import * as faker from 'faker';
import { v4 as uuidv4 } from 'uuid';

export default {
  namespaced: true,

  state: {
    projects: [],
  },

  mutations: {
    addProject(state) {
      state.projects.unshift({
        id: uuidv4(),
        oline: faker.date.recent(),
        head: `${faker.address.state()} Project`,
        sub: faker.lorem.sentence(),
      });
    },

    removeProject(state, id) {
      const idx = state.projects.findIndex((item) => item.id === id);
      state.projects.splice(idx, 1);
    },

    editProject(state, payload) {
      const idx = state.projects.findIndex((item) => item.id === payload.oldProject.id);
      state.projects.splice(idx, 1);
      state.projects.unshift(payload.newProject);
    },
  },

  getters: {
    currentProjects: (state) => state.projects,
  },
};
