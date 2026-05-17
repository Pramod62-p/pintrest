// Tab Switching
function switchTab(tab) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const tabLogin = document.getElementById('tab-login');
    const tabSignup = document.getElementById('tab-signup');

    if (tab === 'login') {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        tabLogin.classList.add('active');
        tabSignup.classList.remove('active');
    } else {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        tabLogin.classList.remove('active');
        tabSignup.classList.add('active');
    }
}

// Password Toggle
function togglePassword(icon) {
    const input = icon.previousElementSibling;
    if (input.type === "password") {
        input.type = "text";
        icon.textContent = "🙈";
    } else {
        input.type = "password";
        icon.textContent = "👁️";
    }
}

// Fake Login / Signup Action
function fakeAction(method) {
    let message = "";
    if (method === "google") message = "Redirecting to Google...";
    else if (method === "login") message = "Logging in...";
    else if (method === "signup") message = "Creating your account...";

    const btn = event.currentTarget;
    const originalText = btn.innerHTML;

    btn.style.opacity = "0.7";
    btn.innerHTML = message;

    setTimeout(() => {
        alert(`✅ ${message}\n\n(This is a frontend demo only)`);
        btn.style.opacity = "1";
        btn.innerHTML = originalText;
    }, 1000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Enter key support
    document.addEventListener('keypress', (e) => {
        if (e.key === "Enter") {
            const loginVisible = document.getElementById('login-form').style.display !== 'none';
            if (loginVisible) {
                document.querySelector('#login-form .login-btn').click();
            } else {
                document.querySelector('#signup-form .login-btn').click();
            }
        }
    });
});
