import { reactive } from "vue";
import axios from "axios";

export const api = {
  // base api uri
  uri: "http://127.0.0.1:8000/api/",

  // called for login
  login: (mail, password) => {
    return new Promise((resolve, reject) => {
      let data = new FormData();
      data.append("name", "kwarriors");
      data.append("email", mail);
      data.append("password", password);

      axios
        .postForm(api.uri + "auth/login", data)
        .then((res) => {
          resolve(res.data.token);
        })
        .catch((err) => {
          reject(err.response.data);
        });
    });
  },

  // called for register
  register: (mail, password) => {
    return new Promise((resolve, reject) => {
      let data = new FormData();
      data.append("name", "kwarriors");
      data.append("email", mail);
      data.append("password", password);

      axios
        .postForm(api.uri + "auth/register", data)
        .then((res) => {
          resolve(res.data.token);
        })
        .catch((err) => {
          reject(err.response.data);
        });
    });
  },
};

export const store = reactive({
  // authorization token
  authToken: null,
  loginError: null,

  // loading status
  loading: false,

  // call for signIn a user and fetch token
  signIn: async (mail, password) => {
    (store.loading = true),
      api
        .login(mail, password)
        // on success fill authToken
        .then((res) => {
          store.loginError = null;
          store.authToken = res;
        })
        // on reject fill loginError
        .catch((err) => {
          store.loginError = err.errors;
          store.authToken = null;
        })
        .finally(() => {
          store.loading = false;
        });
  },

  // call for signUp a user and fetch token
  signUp: async (mail, password) => {
    (store.loading = true),
      api
        .register(mail, password)
        // on success fill authToken
        .then((res) => {
          console.log("then");
          store.loginError = null;
          store.authToken = res;
        })
        // on reject fill loginError
        .catch((err) => {
          console.log("catch");
          store.loginError = err.errors;
          store.authToken = null;
        })
        .finally(() => {
          store.loading = false;
        });
  },
});
