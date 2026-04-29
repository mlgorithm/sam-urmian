(() => {
  const emailLink = document.getElementById("email-link");

  if (!emailLink) {
    return;
  }

  // Email is split into reversed, character-coded halves so it does not
  // appear in plain text anywhere in the HTML or JS source.
  const decode = (codes) =>
    codes
      .slice()
      .reverse()
      .map((code) => String.fromCharCode(code))
      .join("");

  // Reversed character codes for the local part ("sam.urmian") and the
  // domain ("uib.no"). Joined with an "@" built from a code, never as a
  // literal in source.
  const localPart = decode([110, 97, 105, 109, 114, 117, 46, 109, 97, 115]);
  const domainPart = decode([111, 110, 46, 98, 105, 117]);
  const at = String.fromCharCode(64);

  let revealed = false;

  const reveal = (event) => {
    if (revealed) {
      return;
    }
    if (event) {
      event.preventDefault();
    }
    const address = `${localPart}${at}${domainPart}`;
    emailLink.setAttribute("href", `mailto:${address}`);
    emailLink.textContent = address;
    emailLink.setAttribute("aria-label", `Email ${address}`);
    revealed = true;
  };

  // Reveal on any genuine human interaction. Bots that only parse static
  // HTML (or that strip JS) never see the address.
  emailLink.addEventListener("click", reveal);
  emailLink.addEventListener("mouseenter", reveal);
  emailLink.addEventListener("focus", reveal);
  emailLink.addEventListener("touchstart", reveal, { passive: true });
})();
