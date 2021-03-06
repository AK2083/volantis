import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from 'vee-validate/dist/locale/en.json';
import de from 'vee-validate/dist/locale/de.json';

Vue.use(VueI18n);

const x = {
  de: {
    fields: {
      email: 'E-Mail',
      password: 'Passwort',
    },
    validation: de.messages,
  },

  en: {
    fields: {
      email: 'E-mail',
      password: 'Password',
    },
    validation: en.messages,
  },
};

function loadLocaleMessages() {
  const locales = require.context('../locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);

      messages[locale].fields = x[locale].fields;
      messages[locale].validation = x[locale].validation;
    }
  });
  return messages;
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages(),
});
