function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");
    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

function validateCreateAccountForm(form) {
    const firstNameInput = form.querySelector("input[placeholder='First Name']");
    const lastNameInput = form.querySelector("input[placeholder='Last Name']");
    const emailInput = form.querySelector("input[placeholder='Email']");
    const passwordInput = form.querySelector("input[placeholder='Password']");

    let isValid = true;

    // Clear all previous errors
    clearInputError(firstNameInput);
    clearInputError(lastNameInput);
    clearInputError(emailInput);
    clearInputError(passwordInput);

    if (!firstNameInput.value) {
        setInputError(firstNameInput, "First Name is required");
        isValid = false;
    }

    if (!lastNameInput.value) {
        setInputError(lastNameInput, "Last Name is required");
        isValid = false;
    }

    if (!emailInput.value) {
        setInputError(emailInput, "Email is required");
        isValid = false;
    }

    if (!passwordInput.value) {
        setInputError(passwordInput, "Password is required");
        isValid = false;
    }

    return isValid;
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();
    
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;
    
        auth.login(email, password, true)
            .then(response => {
                console.log("Logged in as:", response.user.email);
                // You can redirect the user or show a success message
            })
            .catch(error => {
                console.log("Failed to log in:", error);
                setFormMessage(loginForm, "error", error.message || "An error occurred. Please try again.");
            });
    });    

    createAccountForm.addEventListener("submit", e => {
        e.preventDefault();
    
        if (validateCreateAccountForm(createAccountForm)) {
            const email = document.getElementById("signupEmail").value;
            const password = document.getElementById("signupPassword").value;
    
            auth.signup(email, password)
                .then(response => {
                    console.log("Signup success for:", response.user.email);
                    // You can redirect the user or show a success message
                })
                .catch(error => {
                    console.log("Failed to sign up:", error);
                    setFormMessage(createAccountForm, "error", error.message || "An error occurred. Please try again.");
                });
        } else {
            console.log("Form is invalid.");
        }
    });    

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.placeholder === "First Name" && e.target.value.length > 0 && e.target.value.length < 3) {
                setInputError(inputElement, "First Name must be at least 3 characters in length");
            }
            // Additional validations for other fields can go here
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});
