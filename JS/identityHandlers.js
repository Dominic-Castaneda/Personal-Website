function setLoginState(isLoggedIn) {
    let authControl = document.getElementById('authControl');
    if (authControl) {
        if (isLoggedIn) {
            localStorage.setItem('isLoggedIn', 'true');
            authControl.innerHTML = `<a href="#" onclick="event.preventDefault(); netlifyIdentity.logout();">Logout</a>`;
        } else {
            localStorage.removeItem('isLoggedIn');
            authControl.innerHTML = `<a href="#" onclick="event.preventDefault(); netlifyIdentity.open();">Login</a>`;
        }
    }
}

window.netlifyIdentity.on('init', function(user) {
    if (user || localStorage.getItem('isLoggedIn') === 'true') {
        setLoginState(true);
    } else {
        setLoginState(false);
    }
});

window.netlifyIdentity.on('login', function(user) {
    console.log('User has logged in:', user);
    setLoginState(true);
});

window.netlifyIdentity.on('logout', function() {
    console.log('User has logged out.');
    setLoginState(false);
});

// Call this function in the loadNavbar.js after loading the navbar
function initializeIdentityHandlers() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        setLoginState(true);
    } else {
        setLoginState(false);
    }
}
