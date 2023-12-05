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

// Set persistence and handle authentication state
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => {
    // Check the user's authentication state
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        // Redirect to the login page if not signed in
        window.location.href = 'index.html';
      } else {
        // Optionally, you might perform other actions here
      }
    });
  })
  .catch((error) => {
    console.error('Error setting persistence:', error);
  });

function registerVehicle() {
  const vehicleType = document.getElementById("vehicle-type").value;
  const seatingCapacity = document.getElementById("seating-capacity").value;
  const numberPlate = document.getElementById("number-plate").value;

  // Get the current user
  const user = firebase.auth().currentUser;

  if (user) {
    const userUid = user.uid;

    // Store vehicle information under the user's UID in the Realtime Database
    firebase
      .database()
      .ref("users/" + userUid + "/vehicle")
      .push({
        vehicleType: vehicleType,
        seatingCapacity: seatingCapacity,
        numberPlate: numberPlate,
      });

    alert("Vehicle registered successfully!");
    // Optionally, redirect to another page
    // window.location.href = "dashboard.html";
  } else {
    // Handle the case when the user is not authenticated
    alert("User not authenticated. Please sign in.");
  }
}