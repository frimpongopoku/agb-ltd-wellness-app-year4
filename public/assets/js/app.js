//NOT IN USE ANYMORE, USING MUSTACHE TO TRANSFER THE USER OBJECT NOW

// const signOut = document.getElementById("sign-out");

// console.log("This is the signout button init", signOut);

// signOut.addEventListener("click", function () {
//   fetch("/logout", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//   })
//     .then((response) => response.json())
//     .then((response) => {
//       console.log("RESPONSNE OBJECT: ", response);
//       if (!response.success) return console.log("API ERROR: ", response.error);

//       window.location = "/view/login";
//     })
//     .catch((e) => console.log("ERROR: ", e));
// });

// /**
//  * When the App loads, this function will be fired to fetch the currently
//  * Authenticated user
//  */
// const fetchAuthenticatedUser = () => {
//   fetch("/whoami", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//   })
//     .then((response) => response.json())
//     .then((response) => {
//       if (!response.success) return console.log("API ERROR: ", response.error);
//       console.log("Here is the response", response);
//       const user = response.data?.user;
//       const nameBox = document.getElementById("user-name");
//       if (nameBox) nameBox.innerHTML = user.firstName;
//     })
//     .catch((e) => console.log("ERROR: ", e));
// };

// fetchAuthenticatedUser();
