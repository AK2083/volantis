<template>
  <nav>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item link
          v-for="(item, idx) in getNavigationList"
          :key="'drawer-' + idx"
          @click="routing(item.label)">
          <v-list-item-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{$t(item.label)}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div v-for="(item, idx) in getLoginNavigationItems"
          :key="'sidenav-login-' + idx">
          <v-btn text block @click="routing(item.label)" :color="item.color">
            {{ $t(item.label) }}
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app dark flat clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title>Yggdrasil</v-toolbar-title>

      <v-btn v-for="(item, idx) in getNavigationList"
        :key="'commonnav-' + idx"
        :class="item.commonClass"
        @click="routing(item.label)"
        tile text>
        {{$t(item.label)}}
      </v-btn>

      <div class="flex-grow-1"></div>

      <span v-for="(item, idx) in getLoginNavigationItems" :key="'commonnav-icn-' + idx">
        <v-btn text icon :color="item.color" @click="routing(item.label)">
          <v-icon>{{ item.icon }}</v-icon>
        </v-btn>
      </span>
    </v-app-bar>
  </nav>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'CommonNavigation',
  data: () => ({
    // side navigation status (open, close)
    drawer: false,
    // main navigation items
    commonNavigationItems: [
      {
        id: 'common',
        // Label to specify i18n
        label: 'featrs',
        // Icon for navigation drawer
        icon: 'mdi-settings-box',
        // Var to filter list (user or visitor)
        needLogin: false,
        commonClass: 'ma-2 d-none d-sm-flex',
      },
      {
        label: 'dash',
        icon: 'mdi-view-dashboard',
        needLogin: true,
        commonClass: 'd-none d-sm-flex',
      },
    ],
    userLoginNavigationItems: [
      {
        label: 'lgIn',
        icon: 'mdi-login',
        color: 'success',
        needLogin: false,
      },
      {
        label: 'sgnIn',
        icon: 'mdi-account-plus',
        color: 'orange',
        needLogin: false,
      },
      {
        label: 'lgout',
        icon: 'mdi-logout',
        color: 'error',
        needLogin: true,
      },
    ],
  }),
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then((user) => this.$store.commit('auth/setUser', user))
        .catch((error) => {
          console.log(error);
        });
    },
    routing(target) {
      switch (target) {
        case 'lgIn':
          this.$router.push('/login');
          break;
        case 'dash':
          this.$router.push('/dashboard');
          break;
        case 'featrs':
          this.$router.push('/');
          break;
        default:
          this.logout();
          this.$router.push('/');
      }
    },
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated'];
    },
    getNavigationList() {
      if (this.isAuthenticated) return this.commonNavigationItems;
      return this.commonNavigationItems.filter((item) => item.needLogin === this.isAuthenticated);
    },
    getLoginNavigationItems() {
      return this.userLoginNavigationItems
        .filter((item) => item.needLogin === this.isAuthenticated);
    },
  },
};
</script>

<i18n>
{
  "en": {
    "featrs": "Features",
    "dash": "Dashboard",
    "feed": "Feedback",
    "cnt": "Contact",
    "lgIn": "Login",
    "sgnIn": "Signin",
    "lgout": "Logout",

    "grm": "German",
    "engl": "English"
  },

  "de": {
    "featrs": "Features",
    "dash": "Dashboard",
    "feed": "Bewertung",
    "cnt": "Kontakt",
    "lgIn": "Einloggen",
    "sgnIn": "Registrieren",
    "lgout": "Ausloggen",

    "grm": "Deutsch",
    "engl": "Englisch"
  }
}
</i18n>
