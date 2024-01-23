import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';//getAuth is function from libaray firebase
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  
  apiKey: "AIzaSyAe13hSpfzXNLYEH84DAy8_DU3yg7RmksU",
  authDomain: "task-management-1f942.firebaseapp.com",
  projectId: "task-management-1f942",
  storageBucket: "task-management-1f942.appspot.com",
  messagingSenderId: "289902955628",
  appId: "1:289902955628:web:b72a6b0072931c8d3f1c49",
  measurementId: "G-L4M3ZHEBFT",
  databaseURL: "https://task-management-1f942-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app =  initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export for use in other files
export { app, auth,db};