console.log("Script loaded successfully!");

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded.");

    const loaderContainer = document.getElementById("loaderContainer");
    
    // Check if we should show loader or results
    if (sessionStorage.getItem("resultPending") !== "true") {
        // On index page, hide loader initially
        if (loaderContainer) {
            loaderContainer.style.opacity = "0";
            loaderContainer.style.visibility = "hidden";
        }
    }

    const showLoader = () => {
        if (loaderContainer) {
            loaderContainer.style.opacity = "1";
            loaderContainer.style.visibility = "visible";
        }
    };

    const handleSubmission = async (data) => {
        // Show loader before submission
        showLoader();
        
        // Set flag indicating we're expecting results
        sessionStorage.setItem("resultPending", "true");
        
        let response;
        try {
            response = await fetch("/upload", {
                method: "POST",
                body: data
            });
            
            if (response.redirected) {
                window.location.href = response.url;
            }
        } catch (error) {
            console.error("Error during submission:", error);
            // Hide loader if there's an error
            loaderContainer.style.opacity = "0";
            loaderContainer.style.visibility = "hidden";
            // Clear pending flag
            sessionStorage.removeItem("resultPending");
        }
    };

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
                    await handleSubmission(formData);
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
            await handleSubmission(formData);
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