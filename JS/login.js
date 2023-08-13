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

        const email = loginForm.querySelector('input[placeholder="Email"]').value;
        const password = loginForm.querySelector('input[placeholder="Password"]').value;

        if (!/\S+@\S+\.\S+/.test(email)) {
            setInputError(loginForm.querySelector('input[placeholder="Email"]'), "Please enter a valid email address.");
            return;
        }

        // Continue with AJAX/Fetch login
        // Example error message:
        setFormMessage(loginForm, "error", "Invalid email/password combination");
    });

    createAccountForm.addEventListener("submit", e => {
        e.preventDefault();

        const firstName = createAccountForm.querySelector('input[placeholder="First Name"]').value;
        const lastName = createAccountForm.querySelector('input[placeholder="Last Name"]').value;
        const email = createAccountForm.querySelector('input[placeholder="Email"]').value;
        const password = createAccountForm.querySelector('input[placeholder="Password"]').value;

        if (firstName.length < 3) {
            setInputError(createAccountForm.querySelector('input[placeholder="First Name"]'), "First Name must be at least 3 characters.");
            return;
        }

        if (lastName.length < 3) {
            setInputError(createAccountForm.querySelector('input[placeholder="Last Name"]'), "Last Name must be at least 3 characters.");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setInputError(createAccountForm.querySelector('input[placeholder="Email"]'), "Please enter a valid email address.");
            return;
        }

        // Continue with AJAX/Fetch registration
        // Example error message:
        setFormMessage(createAccountForm, "error", "Failed to create an account.");
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});
