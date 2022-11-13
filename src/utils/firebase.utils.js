import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDanC1s8W9YJ2SH7Ga8Z7ahyyYijs5mNDw",
    authDomain: "crwn-clothing-db-11e18.firebaseapp.com",
    projectId: "crwn-clothing-db-11e18",
    storageBucket: "crwn-clothing-db-11e18.appspot.com",
    messagingSenderId: "701144272188",
    appId: "1:701144272188:web:05eb231586069691a06239",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
// login with popup google account
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
// login with redirect google account
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

// firebase firestore
export const db = getFirestore();

// add SHOP_DATA to firestore
// export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
//     const batch = writeBatch(db);
//     const collectionRef = collection(db, collectionKey);

//     objectsToAdd.forEach((object) => {
//         const docRef = doc(collectionRef, object.title.toLowerCase());
//         batch.set(docRef, object);
//     });

//     await batch.commit();
//     console.log("done");
// };

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, "categories");
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((accumulator, docsSnapshot) => {
        const { title, items } = docsSnapshot.data();
        accumulator[title.toLowerCase()] = items;
        return accumulator;
    }, {});

    // categoryMap result expected
    // {
    //     hats: {
    //         title: "Hats";
    //         items: [{}, {}];
    //     },
    //     sneakers: {
    //         title: "Sneakers";
    //         items: [{}, {}];
    //     },
    // }
    return categoryMap;
};

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    // parameter additionalInformation diatas berguna untuk createUserWithEmailAndPassword, dimana kita tidak bisa mengambil displayName untuk dikirimkan ke firestore
    if (!userAuth) return;
    // untuk mengambil database/document pada firestore
    const userDocRef = doc(db, "users", userAuth.uid);

    // untuk cek apakah user sudah terdaftar di firestore
    const userSnapshot = await getDoc(userDocRef);

    // checking is user not exists
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            // menggunakan spread operator ...additionalInformation untuk menaruh displayName yang diperoleh dari komponen sign-up, lalu meng-assign nya kedalam objek baru dan akan menyimpannya di firestore
            await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInformation });
            console.log("success creating user firestore database");
        } catch (error) {
            console.log("error while creating the user: ", error.message);
        }
    }

    console.log("login success, user already have firestore database");
    return userDocRef;
};

export const createUserWithEmailPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInUserWithEmailPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};
export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback);
};
