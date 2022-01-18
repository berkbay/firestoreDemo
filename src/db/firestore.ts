import * as firebase from "firebase";
import "firebase/firestore";
import {TaskType} from "../Types";

const configuration= {
     apiKey: "AIzaSyBlAzg0NQnu7xeNRWFwtdebH2f86ojd2bo",
     authDomain: "usefirestoredemo.firebaseapp.com",
     projectId: "usefirestoredemo",
     storageBucket: "usefirestoredemo.appspot.com",
     messagingSenderId: "244147343006",
     appId: "1:244147343006:web:dc2687ec67e67896ba358f",
     measurementId: "G-3YYKHGHDBX"
};

firebase.initializeApp(configuration)

const db = firebase.firestore();

export const getTasks = (): Promise<TaskType[]> => {
     return db.collection('tasks')
         .get()
         .then((result) => result.docs)
         .then(docs => docs.map(doc => ({
              id: doc.id,
              name: doc.data().name,
              createdAt: doc.data().createdAt,
              completedAt: doc.data().completedAt
         })))
}

export const streamTasks = (observer) => {
    db.collection('tasks').onSnapshot(observer)
}

export default db;