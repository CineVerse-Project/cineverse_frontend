import { initializeApp } from "firebase/app";
import { getDatabase, ref, serverTimestamp } from "firebase/database";
import { getStorage } from "firebase/storage";

// Thay thế với thông tin cấu hình Firebase của bạn
const firebaseConfig = {
    apiKey: "AIzaSyC0r1kGrDzrIl8kzsg5ffZ7Xxoy8KYXkUA",
    authDomain: "cineverse-32d55.firebaseapp.com",
    projectId: "cineverse-32d55",
    storageBucket: "cineverse-32d55.appspot.com",
    messagingSenderId: "454216782561",
    appId: "1:454216782561:web:338cbaab2c3a6a8e6c1da0",
    measurementId: "G-812RP2DRDE",
    databaseURL:
        "https://cineverse-32d55-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

export { database, ref, serverTimestamp, storage };
