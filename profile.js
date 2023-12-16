function editProfile() {
    const userDetails = document.getElementById("userDetails");
    const editForm = document.getElementById("editForm");

    // Display the editing form
    userDetails.style.display = "none";
    editForm.style.display = "block";

    // Populate the editing form with current details
    document.getElementById("editName").value = userDetails.querySelector("h2").innerText;
    document.getElementById("editEmail").value = userDetails.querySelector("p:nth-child(2)").innerText.split(": ")[1];
    document.getElementById("editLocation").value = userDetails.querySelector("p:nth-child(3)").innerText.split(": ")[1];
    
    // About Me and Interests
    const aboutMe = userDetails.nextElementSibling.querySelector("p");
    const interests = userDetails.nextElementSibling.nextElementSibling.querySelector("ul").innerText;
    document.getElementById("editAboutMe").value = aboutMe ? aboutMe.innerText : "";
    document.getElementById("editInterests").value = interests ? interests.split(", ").join(",") : "";
}

function saveChanges() {
    const editForm = document.getElementById("profileEditForm");
    const formData = new FormData(editForm);

    // Use AJAX for asynchronous form submission
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "profile.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Handle the server response (e.g., display a success message)
            console.log(xhr.responseText);
        }
    };
    xhr.send(formData);

    // Update the UI (optional)
    const userDetails = document.getElementById("userDetails");
    const aboutMe = document.getElementById("editAboutMe").value;
    const interests = document.getElementById("editInterests").value;

    userDetails.querySelector("h2").innerText = formData.get("editName");
    userDetails.querySelector("p:nth-child(2)").innerText = "Email: " + formData.get("editEmail");
    userDetails.querySelector("p:nth-child(3)").innerText = "Location: " + formData.get("editLocation");

    const aboutMeSection = userDetails.nextElementSibling.querySelector("p");
    if (aboutMe) {
        if (!aboutMeSection) {
            const newAboutMeSection = document.createElement("p");
            newAboutMeSection.innerText = aboutMe;
            userDetails.parentNode.insertBefore(newAboutMeSection, userDetails.nextElementSibling);
        } else {
            aboutMeSection.innerText = aboutMe;
        }
    } else {
        if (aboutMeSection) {
            aboutMeSection.remove();
        }
    }

    const interestsSection = userDetails.nextElementSibling.nextElementSibling.querySelector("ul");
    if (interests) {
        interestsSection.innerHTML = "<li>" + interests.split(",").join("</li><li>") + "</li>";
    } else {
        interestsSection.innerHTML = "";
    }

    // Hide the editing form and display the updated user details
    editForm.style.display = "none";
    userDetails.style.display = "block";
}
