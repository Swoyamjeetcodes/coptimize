console.log("Script loaded successfully!");

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded.");

    // Select the correct Upload button
    const uploadBtn = document.querySelector(".upload-button"); // Fixed class name
    if (uploadBtn) {
        console.log("Upload button found.");
        uploadBtn.addEventListener("click", function () {
            alert("Upload functionality will be added soon!");
        });
    } else {
        console.error("Upload button (.upload-button) not found.");
    }

    // Select the correct Enter button
    const enterBtn = document.querySelector(".animated-button"); // Fixed class name
    if (enterBtn) {
        console.log("Enter button found.");
        enterBtn.addEventListener("click", function () {
            const code = document.querySelector("textarea");
            if (!code || code.value.trim() === "") {
                alert("Please enter some C code.");
            } else {
                alert("Code submitted successfully!");
            }
        });
    } else {
        console.error("Enter button (.animated-button) not found.");
    }
});
