// Handle the small-screen navigation menu on the portfolio page.
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Show the initials placeholder until a personal profile photo is added.
const profileImage = document.querySelector('#profile-image');
if (profileImage) {
  const usePlaceholder = () => { profileImage.hidden = true; };
  profileImage.addEventListener('error', usePlaceholder);
  if (profileImage.complete && profileImage.naturalWidth === 0) usePlaceholder();
}

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the menu after choosing a section or page.
  navLinks.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      navLinks.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
    }
  });
}

// Demo-only frontend login. A real site must verify credentials on a server.
const loginForm = document.querySelector('#login-form');
if (loginForm) {
  // Keep an already signed-in demo user from seeing the login form again.
  if (localStorage.getItem('portfolioLoggedIn') === 'true') {
    window.location.replace('dashboard.html');
  }

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value;
    const message = document.querySelector('#login-message');

    if (!username || !password) {
      message.textContent = 'Please enter both your username and password.';
      return;
    }

    if (username === 'admin' && password === '1234') {
      localStorage.setItem('portfolioLoggedIn', 'true');
      localStorage.setItem('portfolioUsername', username);
      window.location.href = 'dashboard.html';
      return;
    }

    message.textContent = 'Incorrect username or password. Please try again.';
  });
}

// Protect the dashboard with the same browser-only demo state.
if (document.body.dataset.page === 'dashboard') {
  const isLoggedIn = localStorage.getItem('portfolioLoggedIn') === 'true';
  const username = localStorage.getItem('portfolioUsername');

  if (!isLoggedIn || !username) {
    window.location.replace('login.html');
  } else {
    document.querySelector('#welcome-message').textContent = `Welcome, ${username}!`;
  }

  document.querySelector('#logout-button').addEventListener('click', () => {
    localStorage.removeItem('portfolioLoggedIn');
    localStorage.removeItem('portfolioUsername');
    window.location.href = 'login.html';
  });
}
