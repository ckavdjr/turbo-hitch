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

firebase
  .auth()
  .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => {
    // Check the user's authentication state
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        // Redirect to login page if not signed in
        window.location.href = "login.html";
      } else {
        // Load and display the user's data or perform other actions
        loadVehicles();
      }
    });
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

// // Check if the user is signed in on page load
// firebase.auth().onAuthStateChanged((user) => {
//   if (!user) {
//     // Redirect to login page if not signed in
//     window.location.href = "login.html";
//   } else {
//     // Load and display the user's vehicles
//     loadVehicles();
//   }
// });

// Function to load and display the user's vehicles
function loadVehicles() {
  const userUid = firebase.auth().currentUser.uid;

  const vehiclesRef = firebase.database().ref("users/" + userUid + "/vehicles");

  // Listen for changes in the vehicles data
  vehiclesRef.on("value", (snapshot) => {
    const vehiclesList = document.getElementById("vehicles-list");

    // Clear the existing list
    vehiclesList.innerHTML = "";

    // Display each vehicle in the list
    snapshot.forEach((childSnapshot) => {
      const vehicleData = childSnapshot.val();
      const vehicleKey = childSnapshot.key;

      // Create a list item for each vehicle
      const listItem = document.createElement("li");
      listItem.textContent = `${vehicleData.vehicleType} - ${vehicleData.numberPlate}`;

      // Optionally, you can add buttons for more actions (edit, view details, etc.)

      // Append the list item to the vehicles list
      vehiclesList.appendChild(listItem);
    });
  });
}

function openAddVehicleModal() {
  // Redirect to a new page for vehicle registration
  window.location.href = "add_vehicle.html";
}

function openDeleteVehicleModal() {
  // You can implement a modal or redirect to a new page for deleting a vehicle
  // Example: window.location.href = 'delete_vehicle.html';
  alert("Implement your logic to delete a vehicle");
}

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
