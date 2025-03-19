console.log("Script loaded successfully!");

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded.");

    const apiUrl = "https://ml-in-compiler-optimization-main.onrender.com/upload";

    const uploadBtn = document.querySelector(".upload-button");
    if (uploadBtn) {
        console.log("Upload button found.");
        uploadBtn.addEventListener("click", function () {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = ".c";
            input.onchange = async (event) => {
                const file = event.target.files[0];
                if (file) {
                    const formData = new FormData();
                    formData.append("file", file);

                    const response = await fetch("/upload", {
                        method: "POST",
                        body: formData
                    });

                    if (response.redirected) {
                        window.location.href = response.url;
                    }
                }
            };
            input.click();
        });
    } else {
        console.error("Upload button (.upload-button) not found.");
    }

    const enterBtn = document.querySelector(".animated-button");
    if (enterBtn) {
        console.log("Enter button found.");
        enterBtn.addEventListener("click", async function () {
            const code = document.querySelector("textarea").value;
            if (code.trim() === "") {
                alert("Please enter some C code.");
                return;
            }

            const features = extractFeaturesFromCode(code); // Implement this function
            const prediction = await getPrediction(features);

            alert(`Best Optimization Flag: ${prediction}`);
        });
    } else {
        console.error("Enter button (.animated-button) not found.");
    }

    const textarea = document.getElementById("codeInput");
    if (textarea) {
        textarea.addEventListener("input", function () {
            this.style.height = "auto";
            const maxHeight = 200;

            if (this.scrollHeight <= maxHeight) {
                this.style.height = `${this.scrollHeight}px`;
                this.style.overflowY = "hidden";
            } else {
                this.style.height = `${maxHeight}px`;
                this.style.overflowY = "auto";
            }
        });
    }
});

async function getPrediction(features) {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({features: features})
    });
    const result = await response.json();
    return result.prediction;
}

function extractFeaturesFromCode(code) {
    // Dummy feature extraction for demonstration
    return [code.length, (code.match(/for|while/g) || []).length];
}
