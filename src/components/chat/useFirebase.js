import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/database";

const useFirebase = () => {
    const [firebaseApp, setFirebaseApp] = useState(null);
    const [messagesRef, setMessagesRef] = useState(null);

    useEffect(() => {
        const firebaseConfig = {
            apiKey: "AIzaSyC0r1kGrDzrIl8kzsg5ffZ7Xxoy8KYXkUA",
            authDomain: "cineverse-32d55.firebaseapp.com",
            databaseURL:
                "https://cineverse-32d55-default-rtdb.asia-southeast1.firebasedatabase.app",
            projectId: "cineverse-32d55",
            storageBucket: "cineverse-32d55.appspot.com",
            messagingSenderId: "454216782561",
            appId: "1:454216782561:web:338cbaab2c3a6a8e6c1da0",
            measurementId: "G-812RP2DRDE",
        };

        const app = firebase.initializeApp(firebaseConfig);
        setFirebaseApp(app);

        const db = app.database();
        const ref = db.ref("messages");
        setMessagesRef(ref);

        return () => {
            app.delete();
        };
    }, []);

    const sendMessage = (name) => {
        messagesRef.push({ name });
    };

    return { messagesRef, sendMessage };
};

export { useFirebase };
