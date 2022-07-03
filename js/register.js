const form = document.querySelector("#form");

form.onsubmit = (e) => {
  e.preventDefault();
  const fName = e.target.fname.value;
  const lName = e.target.lname.value;
  const password = e.target.password.value;
  const email = e.target.email.value;
  const cPassword = e.target.cpassword.value;
  const username = e.target.username.value;
  console.log(fName, lName, password, email, cPassword, username);
  const regE = new RegExp(
    "/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:. [a-zA-Z0-9-]+)*$/"
  );
  const regP = new RegExp(
    "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$"
  );
  const emailCorrect = regE.test(email);
  const passwordCorrect = regP.text(password);
  alert(
    (password !== cPassword || password.length !== cPassword.length) &&
      "password and confirm password do not match"
  );
  alert("password :", +passwordCorrect ? "correct" : "invalid");
  alert("email : " + emailCorrect ? "correct" : "invalid");
};
