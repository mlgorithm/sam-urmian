(() => {
  const emailLink = document.getElementById("email-link");

  if (!emailLink) {
    return;
  }

  // Build the address from character codes so it is not present in plain HTML.
  const email = [
    115, 97, 109, 46, 117, 114, 109, 105, 97, 110, 64, 117, 105, 98, 46, 110,
    111,
  ]
    .map((code) => String.fromCharCode(code))
    .join("");

  emailLink.href = `mailto:${email}`;
  emailLink.textContent = email;
})();
