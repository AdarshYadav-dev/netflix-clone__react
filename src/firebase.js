import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { 
  getFirestore, 
  addDoc, 
  collection 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyActNGvabENwStnJmioxhqToC8EJP4L_Vo",
  authDomain: "netflix-clone-219f6.firebaseapp.com",
  projectId: "netflix-clone-219f6",
  storageBucket: "netflix-clone-219f6.appspot.com",
  messagingSenderId: "1057027900201",
  appId: "1:1057027900201:web:cfe4a47ed58a5bb70aad38"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email
    });
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, login, signup, logout };
