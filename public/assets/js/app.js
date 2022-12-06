

const signOut = document.getElementById("sign-out");


signOut.addEventListener("click", function () {
  fetch("/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((response) => {
      if (!response.success) return console.log("API ERROR: ", response.error);

      window.location = "/view/login";
    })
    .catch((e) => console.log("ERROR: ", e));
});

