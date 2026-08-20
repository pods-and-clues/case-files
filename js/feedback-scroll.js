let lastScrollTop = 0;
const feedbackBtn = document.querySelector('.feedback-float');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (!feedbackBtn) return;

  if (scrollTop > lastScrollTop) {
    // scrolling down
    feedbackBtn.classList.add('hide');
  } else {
    // scrolling up
    feedbackBtn.classList.remove('hide');
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);

function openFeedbackModal() {
  document.getElementById("feedbackModal").style.display = "block";
}

function closeFeedbackModal() {
  document.getElementById("feedbackModal").style.display = "none";
}

window.onclick = function(event) {
  const modal = document.getElementById("feedbackModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Auto-fill the hidden page_url input
document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("page-url");
  if (input) {
    input.value = window.location.href;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("feedbackForm");
  const success = document.getElementById("feedbackSuccess");
  const urlField = document.getElementById("page-url");
  const submitBtn = document.getElementById("feedbackSubmitBtn");

  if (urlField) {
    urlField.value = window.location.href;
  }

  if (form && submitBtn) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Update button to show "Submitting..."
      submitBtn.disabled = true;
      submitBtn.textContent = "Submitting...";

      const formData = new FormData(form);

      fetch("https://formsubmit.co/rlinares416@gmail.com", {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json"
        }
      })
        .then(response => {
          if (response.ok) {
            form.style.display = "none";
            success.style.display = "block";
            success.classList.remove("animated");
            void success.offsetWidth;
            success.classList.add("animated");
          } else {
            alert("There was a problem submitting the form.");
          }
        })
        .catch(() => {
          alert("There was a connection error. Please try again.");
        })
        .finally(() => {
          // Reset the button (in case we reopen the modal)
          submitBtn.disabled = false;
          submitBtn.textContent = "Submit Feedback";
        });
    });
  }
});

function closeFeedbackModal() {
  document.getElementById("feedbackModal").style.display = "none";
  document.getElementById("feedbackForm").reset();
  document.getElementById("feedbackForm").style.display = "block";
  document.getElementById("feedbackSuccess").style.display = "none";
}
