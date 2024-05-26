import { reactive } from "vue";
import axios from "axios";

export const store = reactive({
  loading: false,
});

export const user = reactive({
  name: null,
  mail: null,
  isLogged: false,
  fillUser: () => {
    return new Promise((resolve) => {
      axios.defaults.withCredentials = true;
      axios.defaults.withXSRFToken = true;

      axios
        .get(api.uri + api.user)
        .then((res) => {
          user.name = res.data.name;
          user.mail = res.data.email;
          user.isLogged = true;
          resolve(true);
        })
        .catch((err) => {
          user.name = null;
          user.mail = null;
          user.isLogged = false;
          resolve(false);
        });
    });
  },
  clearUser: () => {
    user.name = null;
    user.mail = null;
    user.isLogged = false;
  },
});

export const api = {
  // base api uri
  uri: "http://localhost:8000",
  login: "/login",
  register: "/register",
  logout: "/logout",
  user: "/api/user",
  csrf: "/sanctum/csrf-cookie",
  initLions: "/api/lions",
  destroyUnchoosed: "/api/destroy",
  recalcAll: "/api/recalc",
};

export const auth = reactive({
  loginError: null,

  login: (email, password) => {
    return new Promise(async (resolve) => {
      // includes csrf token in the request
      axios.defaults.withCredentials = true;
      axios.defaults.withXSRFToken = true;

      // start loading
      store.loading = true;

      // get csrf token
      await axios.get(api.uri + api.csrf);

      // call login route
      await axios
        .post(api.uri + api.login, {
          email,
          password,
        })
        .then(async (res) => {
          // on sucess fill user fields
          await user.fillUser();
          auth.loginError = null;
        })
        .catch((err) => {
          // on error fill errors fields
          auth.loginError = err.response.data.errors;
        })
        .finally(() => {
          // stop loading and resolve
          store.loading = false;
          resolve();
        });
    });
  },

  register: (name, email, password, password_confirmation) => {
    return new Promise(async (resolve) => {
      // includes csrf token in the request
      axios.defaults.withCredentials = true;
      axios.defaults.withXSRFToken = true;

      // start loading
      store.loading = true;

      // get csrf token
      await axios.get(api.uri + api.csrf);

      // call login route
      await axios
        .post(api.uri + api.register, {
          name,
          email,
          password,
          password_confirmation,
        })
        .then(async (res) => {
          // on sucess fill user fields
          await user.fillUser();
          auth.loginError = null;
        })
        .catch((err) => {
          // on error fill errors fields
          auth.loginError = err.response.data.errors;
        })
        .finally(() => {
          // stop loading and resolve
          store.loading = false;
          resolve();
        });
    });
  },

  logout: () => {
    return new Promise(async (resolve) => {
      // includes csrf token in the request
      axios.defaults.withCredentials = true;
      axios.defaults.withXSRFToken = true;

      // start loading
      store.loading = true;

      // call login route
      await axios
        .post(api.uri + api.logout)
        .then(async (res) => {
          // on sucess clear user fields
          user.clearUser();
          auth.loginError = null;
        })
        .catch((err) => {
          // on error fill errors fields
          auth.loginError = err.response.data.errors;
        })
        .finally(() => {
          // stop loading and resolve
          store.loading = false;
          resolve();
        });
    });
  },
});
