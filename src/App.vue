<template>
  <v-app>
    <common-navigation />

    <v-content>
      <v-alert type="error" border="left" v-if="isAlertDisplayed">
        I'm an error alert.
      </v-alert>

      <router-view/>
    </v-content>

    <common-footer-navigation />
  </v-app>
</template>

<script>
import CommonNavigation from './components/common/CommonNavigation.vue';
import CommonFooterNavigation from './components/common/CommonFooterNavigation.vue';

export default {
  name: 'App',
  components: {
    CommonNavigation,
    CommonFooterNavigation,
  },
  data: () => ({
    isAlertDisplayed: false,
  }),
  created() {
    this.$vuetify.theme.dark = true;
    if (process.env.NODE_ENV === 'development') {
      this.$store.commit('auth/setUser', { test: true });
    }
  },
};
</script>
