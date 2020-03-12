<template>
    <span>
        <span v-if="isEditLineShowed==false" @click="showEditLine"
              @mouseover="setEditButtonShowed(true)" @mouseleave="setEditButtonShowed(false)">
            {{ getOldValue }}
            <v-btn color="primary" text icon x-small v-if="isEditButtonShowed==true"
                   @click="showEditLine">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </span>
        <v-text-field solo class="p-0 m-0" :placeholder="getOldValue" v-model="newValue" v-else>
            <v-btn slot="append" text icon small color="success" @click="changeToEdit">
                <v-icon>mdi-check</v-icon>
            </v-btn>
            <v-btn slot="append" text icon small color="error" @click="changeToEdit">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-text-field>
    </span>
</template>

<script>
export default {
  name: 'ProjectCardLine',
  props: ['project', 'target'],
  data: () => ({
    isEditLineShowed: false,
    isEditButtonShowed: false,
    newValue: null,
  }),
  methods: {
    setEditButtonShowed(isShowed) {
      this.isEditButtonShowed = isShowed;
    },
    changeToEdit() {
      this.isEditButtonShowed = false;
      this.isEditLineShowed = false;
      const otherProject = this.project;
      otherProject[this.target] = this.newValue;
      this.$store.commit('projects/editProject', { oldProject: this.project, newProject: otherProject });
    },
    showEditLine() {
      this.isEditButtonShowed = false;
      this.isEditLineShowed = true;
    },
  },
  beforeCreate() {
    this.newValue = this.getOldValue;
  },
  computed: {
    getOldValue() {
      return this.project[this.target];
    },
  },
};
</script>
