document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll(".ajax-contact-form");
  const toast = document.getElementById("toast");

  const showToast = (message, type = "success") => {
    toast.className = `toast-notification toast-${type} show`;
    toast.innerText = message;

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  };

  forms.forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;

      // ⚡ Immediate feedback
      showToast("Sending enquiry...", "success");

      try {
        const response = await fetch(`${window.APP_CONFIG.API_BASE_URL}/contact/submit-enquiry/`, {
          method: "POST",
          body: new FormData(form),
          headers: {
            "Accept": "application/json"
          },
          keepalive: true
        });

        const data = await response.json();

        if (data.status === "success") {
          showToast("Your enquiry has been sent successfully");

          const modalEl = document.getElementById("enquiryModal");
          const modal = bootstrap.Modal.getInstance(modalEl);
          modal?.hide();

          form.reset();
        } else {
          showToast("Something went wrong. Please try again.", "error");
        }
      } catch (err) {
        showToast("Server error. Please try later.", "error");
      } finally {
        submitBtn.disabled = false;
      }
    });
  });
});


