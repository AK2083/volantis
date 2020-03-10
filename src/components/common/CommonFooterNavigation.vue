<template>
    <v-footer
    color="primary lighten-1" class="py-0"
  >
    <v-row
      justify="center"
    >
      <v-btn
        color="white"
        text
        rounded
        class="my-2"
      >
        {{$t('cmmnt')}}
      </v-btn>
      <v-btn
        color="white"
        text
        rounded
        class="my-2"
      >
        {{$t('cntct')}}
      </v-btn>
      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" color="white"
        text
        rounded
        class="my-2">
            <span>{{$t('lnges')}}</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="changeLocale('de')">
            <v-list-item-title>{{$t('grm')}}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="changeLocale('en')">
            <v-list-item-title>{{$t('engl')}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: 'CommonFooterNavigation',
  methods: {
    changeLocale(locale) {
      this.$root.$i18n.locale = locale;
      localStorage.locale = locale;
    },
  },
};
</script>

<i18n>
{
  "en": {
    "lnges": "Change Language",
    "cntct": "Mail us",
    "cmmnt": "Your Feedback",
    "grm": "German",
    "engl": "English"
  },

  "de": {
    "lnges": "Sprache ändern",
    "cntct": "Kontaktiere uns",
    "cmmnt": "Deine Meinung",
    "grm": "Deutsch",
    "engl": "Englisch"
  }
}
</i18n>
