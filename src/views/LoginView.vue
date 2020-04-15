<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm10 md8 lg6 xl4>
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>{{$t("signin")}}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <validation-provider rules="required|email" v-slot="{ errors }" name="E-Mail">
                <v-text-field prepend-icon="mdi-email" name="email" :label="$t('email')"
                              data-vv-name="email" type="text" v-model="email"
                              :error-messages="errors[0]" :disabled="isAuthenticated">
                </v-text-field>
              </validation-provider>
              <validation-provider rules="required|min:8" v-slot="{ errors }" name="Passwort">
                <v-text-field id="password" prepend-icon="mdi-key" name="password"
                              :label="$t('pwd')" v-model="password"
                              data-vv-name="password"
                              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                              @click:append="show = !show"
                              :type="show ? 'text' : 'password'"
                              :error-messages="errors[0]" :disabled="isAuthenticated">
                </v-text-field>
              </validation-provider>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <!-- Social Media Auth -->
            <v-btn v-for="(item, idx) in socialAuth"
                  :key="idx"
                  :disabled="isAuthenticated"
                  @click="submit(item.name)"
                  icon>
              <v-icon>{{item.icon}}</v-icon>
            </v-btn>

            <v-spacer></v-spacer>
            <v-btn color="primary" :disabled="isAuthenticated" @click="submit()">
              {{$t('hwgo')}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase';
import { ValidationProvider } from 'vee-validate';

export default {
  components: {
    ValidationProvider,
  },
  data: () => ({
    show: false,
    email: '',
    password: '',
    socialAuth: [
      { name: 'google', icon: 'mdi-google-plus-box' },
      { name: 'facebook', icon: 'mdi-facebook-box' },
      { name: 'github', icon: 'mdi-github-box' },
      { name: 'microsoft', icon: 'mdi-windows' },
    ],
  }),
  mounted() {
    firebase.auth().useDeviceLanguage();
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated'];
    },
  },
  methods: {
    submit(provider) {
      switch (provider) {
        case 'google':
          this.socialAuthentication(new firebase.auth.GoogleAuthProvider());
          break;
        case 'facebook':
          this.socialAuthentication(new firebase.auth.FacebookAuthProvider());
          break;
        case 'github':
          this.socialAuthentication(new firebase.auth.GithubAuthProvider());
          break;
        case 'microsoft':
          this.socialAuthentication(new firebase.auth.OAuthProvider('microsoft.com'));
          break;
        default:
          this.soloAuthentication();
          break;
      }
    },
    socialAuthentication(provider) {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => this.$store.commit('auth/setUser', result.user))
        .catch((error) => {
          console.log(error);
        });
    },
    soloAuthentication() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((user) => this.$store.commit('auth/setUser', user))
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<i18n>
{
  "en": {
    "signin": "Login",
    "email": "E-Mail",
    "pwd": "Password",
    "hwgo": "Here we go!"
  },

  "de": {
    "signin": "Einloggen",
    "email": "E-Mail",
    "pwd": "Passwort",
    "hwgo": "Los gehts!"
  }
}
</i18n>
