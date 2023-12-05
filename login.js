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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function signIn() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      // Check if the user's email is verified
      if (user.emailVerified) {
        console.log("User signed in:", user);
        window.location.href = "dashboard.html"; // Redirect to a new page
      } else {
        // User's email is not verified
        alert("Please verify your email before signing in.");
        firebase.auth().signOut(); // Sign out the user
      }
    })

    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Sign in error (${errorCode}): ${errorMessage}`);
      alert("Invalid email or password. Please try again.");
    });
}
