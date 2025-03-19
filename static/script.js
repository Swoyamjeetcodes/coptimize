console.log("Script loaded successfully!");

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded.");

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

                    try {
                        const response = await fetch("https://ml-in-compiler-optimization.onrender.com/upload", {
                            method: "POST",
                            body: formData
                        });

                        if (response.ok) {
                            window.location.href = response.url;
                        } else {
                            console.error("File upload failed:", response.statusText);
                            alert("Failed to upload file. Please try again.");
                        }
                    } catch (error) {
                        console.error("Network error:", error);
                        alert("Network error. Please check your connection.");
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

            const formData = new FormData();
            formData.append("code", code);

            try {
                const response = await fetch("https://ml-in-compiler-optimization.onrender.com/upload", {
                    method: "POST",
                    body: formData
                });

                if (response.ok) {
                    window.location.href = response.url;
                } else {
                    console.error("Code submission failed:", response.statusText);
                    alert("Failed to submit code. Please try again.");
                }
            } catch (error) {
                console.error("Network error:", error);
                alert("Network error. Please check your connection.");
            }
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
