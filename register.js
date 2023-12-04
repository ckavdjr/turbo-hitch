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

function signUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Registered successfully
      const user = userCredential.user;
      console.log("User registered:", user);

      // Send email verification
      sendEmailVerification();

      alert(
        "Registration successful. A verification email has been sent to your email address."
      );
      // Optionally redirect to the sign-in page
      // window.location.href = 'login.html';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Registration error (${errorCode}): ${errorMessage}`);
      alert("Registration failed. Please try again.");
    });
}

function sendEmailVerification() {
  const user = firebase.auth().currentUser;

  user
    .sendEmailVerification()
    .then(() => {
      console.log("Email verification sent.");
    })
    .catch((error) => {
      console.error("Error sending email verification:", error.message);
    });
}
