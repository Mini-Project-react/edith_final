import { createContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
firebase.initializeApp({
  apiKey: "AIzaSyD0W3JcMV8qC1lNpdh5jNrSkpt-Lqy89nc",
  authDomain: "firbasebasic-cd494.firebaseapp.com",
  projectId: "firbasebasic-cd494",
  storageBucket: "firbasebasic-cd494.appspot.com",
  messagingSenderId: "687461870149",
  appId: "1:687461870149:web:e8a4785e99992d9bdd512c",
});
export const FirebaseContext = createContext();

export const FirebaseProvider = (props) => (
  <FirebaseContext.Provider value={{ firebase }}>
    {props.children}
  </FirebaseContext.Provider>
);
