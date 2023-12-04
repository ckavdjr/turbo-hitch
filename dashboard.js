const firebaseConfig = {
  apiKey: "AIzaSyCy30cUUTIhtbbRbRruarGWIM2iLTaPmoE",
  authDomain: "turbo-hitch.firebaseapp.com",
  databaseURL: "https://turbo-hitch-default-rtdb.firebaseio.com",
  projectId: "turbo-hitch",
  storageBucket: "turbo-hitch.appspot.com",
  messagingSenderId: "231162029129",
  appId: "1:231162029129:web:b200185fe3e0a165f84b98",
  measurementId: "G-K93ESWTX34",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Check if the user is signed in on page load
firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    // Redirect to login page if not signed in
    window.location.href = "login.html";
  }
});

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("User signed out");
      window.location.href = "login.html"; // Redirect to login page
    })
    .catch((error) => {
      console.error("Sign out error:", error.message);
    });
}
