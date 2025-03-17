document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const resultArea = document.getElementById("resultArea");
  const copyButton = document.getElementById("copyButton");

  searchButton.addEventListener("click", function () {
    const query = searchInput.value;
    if (query) {
      const apiKey = "AIzaSyBbP4FzJ7OXAG71TcPO2PWyQ6Stb_cNt6k"; // Replace with your valid API key

      fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=AIzaSyBbP4FzJ7OXAG71TcPO2PWyQ6Stb_cNt6k`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: query }],
              },
            ],
          }),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (
            data &&
            data.candidates &&
            data.candidates.length > 0 &&
            data.candidates[0].content &&
            data.candidates[0].content.parts &&
            data.candidates[0].content.parts.length > 0
          ) {
            resultArea.textContent = data.candidates[0].content.parts[0].text;
            copyButton.style.display = "block";
          } else {
            resultArea.textContent = "Error: No response from API.";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          resultArea.textContent = `An error occurred: ${error.message}`;
        });
    }
  });

  copyButton.addEventListener("click", function () {
    navigator.clipboard
      .writeText(resultArea.textContent)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  });
});
