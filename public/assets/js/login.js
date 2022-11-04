const submitButton = document.getElementById("submit-button");
const emailBox = document.getElementById("email");
const passwordBox = document.getElementById("password");
const error = document.getElementById("error-msg");

submitButton.addEventListener("click", function () {
  error.style.display = "none";
  const email = emailBox.value;
  const password = passwordBox.value;
  if (!email || !password) {
    error.innerHTML = "Please provide email and password";
    return (error.style.display = "block");
  }

  console.log("Started running request");
  fetch("/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((response) => {
      const user = response.data;
      const isManager = user.roles?.find(
        (r) => r.key === "xxx-manager-uni-key-xxx"
      );
      if (isManager) return (window.location = "/view/manager/categories");
      window.location = "/view/staff/goals";
    })
    .catch((e) => console.log("ERROR: ", e));
});
