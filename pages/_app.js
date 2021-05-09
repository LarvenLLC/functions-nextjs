import "../public/css/main.css";
import firebase from "../firebase";

import { useEffect, useState } from "react";

import { withMobx } from "next-mobx-wrapper";
import { configure } from "mobx";
import { Provider, useStaticRendering } from "mobx-react";

import * as getStores from "../stores";

const isServer = !process.browser;

configure({ enforceActions: "observed" });
useStaticRendering(isServer); // NOT `true` value

function MyApp({ Component, pageProps, store }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        store.userStore.setUser(user);
      } else {
        // User is signed out / no user
        // anonymous sign in
        firebase
          .auth()
          .signInAnonymously()
          .catch((error) => console.error(error));
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Provider {...store}>
        <Component key="app" {...pageProps} />
      </Provider>
    </>
  );
}
export default withMobx(getStores)(MyApp);

export const defaultTitle = "Default Title";

export const colors = {
  primary: "#174A41",
  secondary: "",
  dark: "#D7C629",
  white: "#FFFFFF",
  success: "#A91E15",
  danger: "#A91E15",
  transparent: "rgba(255, 255, 255, 0)",
};
