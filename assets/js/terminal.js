export function initContactForm() {
  const contactForm = document.querySelector("#contact-form");
  const contactFormStatus = document.querySelector("#contact-form-status");

  if (!contactForm) {
    return;
  }

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const parameters = new URLSearchParams({
      subject: `Project inquiry from ${name}`,
      body: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (contactFormStatus) {
      contactFormStatus.textContent = "Opening your email application...";
    }

    window.location.href = `mailto:mjohnbenedictx@gmail.com?${parameters.toString()}`;
  });
}
