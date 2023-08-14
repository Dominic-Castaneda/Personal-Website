function initializeIdentityHandlers() {
    let authControl = document.getElementById('authControl');
    if (authControl) {
        authControl.addEventListener('click', function(event) {
            event.preventDefault();
            if (window.netlifyIdentity.currentUser()) {
                netlifyIdentity.logout();
            } else {
                netlifyIdentity.open();
            }
        });
    }
    
    window.netlifyIdentity.on('login', function(user) {
        console.log('User has logged in:', user);
        if (authControl) {
            authControl.innerHTML = `<a href="#" onclick="event.preventDefault();">Logout</a>`;
        }
    });

    window.netlifyIdentity.on('logout', function() {
        console.log('User has logged out.');
        if (authControl) {
            authControl.innerHTML = `<a href="#" onclick="event.preventDefault();">Login</a>`;
        }
    });
}

// If you're using an asynchronous method in loadNavbar.js, 
// make sure to call initializeIdentityHandlers() after loading the navbar there.
// For now, I'll call it here to handle cases when navbar is loaded without asynchronous methods.
initializeIdentityHandlers();

