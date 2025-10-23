document
  .getElementById("createSessionForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const sessionName = document.getElementById("sessionName").value;
    const webhookUrl = document.getElementById("webhookUrl").value;
    const errorDiv = document.getElementById("errorMessage");
    const successDiv = document.getElementById("successMessage");

    errorDiv.classList.add("hidden");
    successDiv.classList.add("hidden");

    try {
      const response = await fetch("/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionName, webhookUrl }),
      });

      if (!response.ok) {
        let errorMsg = "Failed to create session";
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
        } catch (jsonError) {}
        throw new Error(errorMsg);
      }

      const data = await response.json();
      successDiv.textContent = "Session created successfully! Redirecting...";
      successDiv.classList.remove("hidden");

      setTimeout(() => {
        window.location.href = `/sessions/${sessionName}/qr`;
      }, 1500);
    } catch (error) {
      errorDiv.textContent = error.message || "An error occurred";
      errorDiv.classList.remove("hidden");
    }
  });
