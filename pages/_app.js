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
    if (!loading) {
      let user = firebase.auth().currentUser;
      if (user) {
        firebase
          .firestore()
          .collection("customers")
          .doc(user.uid)
          .onSnapshot(function (doc) {
            let obj = doc.data();
            let str = setInterval(() => {
              if (store.userStore.hasOwnProperty("userRegistry")) {
                store.userStore.setUser(obj);
                clearInterval(str);
              }
            }, 3000);
          });
      }
    }
  }, [loading]);

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
