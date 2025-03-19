const API_URL = window.location.hostname.includes("vercel.app") 
    ? "https://coptimize.vercel.app/upload"
    : "https://ml-in-compiler-optimization.onrender.com/upload";

document.addEventListener("DOMContentLoaded", function () {
    const uploadBtn = document.querySelector(".upload-button");
    const enterBtn = document.querySelector(".animated-button");

    if (uploadBtn) {
        uploadBtn.addEventListener("click", function () {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = ".c";

            input.onchange = async (event) => {
                const file = event.target.files[0];
                if (file) {
                    const formData = new FormData();
                    formData.append("file", file);

                    try {
                        const response = await fetch(API_URL, {
                            method: "POST",
                            body: formData
                        });

                        if (response.ok) {
                            window.location.href = response.url;
                        } else {
                            alert("Failed to upload file. Please try again.");
                        }
                    } catch (error) {
                        alert("Network error. Please check your connection.");
                    }
                }
            };
            input.click();
        });
    }

    if (enterBtn) {
        enterBtn.addEventListener("click", async function () {
            const code = document.querySelector("textarea").value;
            if (!code.trim()) {
                alert("Please enter some C code.");
                return;
            }

            const formData = new FormData();
            formData.append("code", code);

            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    body: formData
                });

                if (response.ok) {
                    window.location.href = response.url;
                } else {
                    alert("Failed to submit code. Please try again.");
                }
            } catch (error) {
                alert("Network error. Please check your connection.");
            }
        });
    }
});
