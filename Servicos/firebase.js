import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: "AIzaSyCBezZEDKxzny_BMq8kKgMW1pfaVMbpG30",
	authDomain: "projetooretorno-4688b.firebaseapp.com",
	databaseURL: "https://projetooretorno-4688b-default-rtdb.firebaseio.com",
	projectId: "projetooretorno-4688b",
	storageBucket: "gs://projetooretorno-4688b.appspot.com",
	messagingSenderId: "976609646777",
	appId: "1:976609646777:web:29fd1113ad9f73f3782368",
	measurementId: "G-DEJTS78P16"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export default firebase;