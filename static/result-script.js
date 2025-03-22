document.addEventListener("DOMContentLoaded", function() {
    const loaderContainer = document.getElementById("loaderContainer");
    const resultContainer = document.getElementById("resultContainer");
    
    // If we came from form submission, show loader for the full animation
    if (sessionStorage.getItem("resultPending") === "true") {
        // Make sure loader is visible
        loaderContainer.style.opacity = "1";
        loaderContainer.style.visibility = "visible";
        resultContainer.style.display = "none";
        
        // Wait for animation to complete
        setTimeout(() => {
            // Hide loader
            loaderContainer.style.opacity = "0";
            loaderContainer.style.visibility = "hidden";
            
            // Show results after transition
            setTimeout(() => {
                resultContainer.style.display = "flex";
                // Clear pending flag
                sessionStorage.removeItem("resultPending");
            }, 300);
        }, 4000); // Full animation duration
    } else {
        // Direct access to result page - no loader needed
        loaderContainer.style.opacity = "0";
        loaderContainer.style.visibility = "hidden";
        resultContainer.style.display = "flex";
    }
});