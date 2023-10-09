import "./App.css";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyApIa7VlHXM6MDIR6f0JhnJR-7-h6cJJk8",
    authDomain: "vote-testing-app.firebaseapp.com",
    projectId: "vote-testing-app",
    storageBucket: "vote-testing-app.appspot.com",
    messagingSenderId: "501590580393",
    appId: "1:501590580393:web:93bef419f3d5afd4c8ddb8",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  const colRef = collection(db, "candidates");

  getDocs(colRef).then((Snapshot) => {
    console.log(Snapshot.docs);
  });
  return (
    <div className="App">
      <h1>Hello world</h1>
    </div>
  );
}

export default App;
