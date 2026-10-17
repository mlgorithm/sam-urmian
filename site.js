(() => {
  // Email addresses are split into reversed, character-coded halves so they
  // do not appear in plain text anywhere in the HTML or JS source.
  const decode = (codes) =>
    codes
      .slice()
      .reverse()
      .map((code) => String.fromCharCode(code))
      .join("");

  // Reversed character codes for the shared local part and each domain.
  // Joined with an "@" built from a code, never as a literal in source.
  const localPart = [110, 97, 105, 109, 114, 117, 46, 109, 97, 115];
  const addresses = [
    { id: "email-link", domain: [111, 110, 46, 98, 105, 117] },
    { id: "gmail-link", domain: [109, 111, 99, 46, 108, 105, 97, 109, 103] },
  ];
  const at = String.fromCharCode(64);

  addresses.forEach(({ id, domain }) => {
    const link = document.getElementById(id);

    if (!link) {
      return;
    }

    let revealed = false;

    const reveal = (event) => {
      if (revealed) {
        return;
      }
      if (event) {
        event.preventDefault();
      }
      const address = `${decode(localPart)}${at}${decode(domain)}`;
      link.setAttribute("href", `mailto:${address}`);
      link.textContent = address;
      link.setAttribute("aria-label", `Email ${address}`);
      revealed = true;
    };

    // Reveal on any genuine human interaction. Bots that only parse static
    // HTML (or that strip JS) never see the address.
    link.addEventListener("click", reveal);
    link.addEventListener("mouseenter", reveal);
    link.addEventListener("focus", reveal);
    link.addEventListener("touchstart", reveal, { passive: true });
  });
})();
