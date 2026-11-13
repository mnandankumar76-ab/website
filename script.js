// ---------- Page switching ----------
function showPage(pageId, linkEl) {
    // Hide all pages, show the chosen one
    document.querySelectorAll('.page').forEach(function (page) {
        page.classList.remove('active');
    });
    var target = document.getElementById(pageId);
    if (!target) return;
    target.classList.add('active');

    // Update the active link in the nav
    document.querySelectorAll('nav a').forEach(function (a) {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + pageId) {
            a.classList.add('active');
        }
    });

    // Keep the URL hash in sync (also covers the buttons that don't pass a link)
    history.replaceState(null, '', '#' + pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Open the right page when the site loads with a hash, e.g. index.html#contact
window.addEventListener('DOMContentLoaded', function () {
    var hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
        showPage(hash);
    }
    document.getElementById('year').textContent = new Date().getFullYear();
});

// Support browser back/forward on hash change
window.addEventListener('hashchange', function () {
    var hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
        showPage(hash);
    }
});

// ---------- Contact form validation ----------
var form = document.getElementById('contactForm');

function setError(fieldId, message) {
    var field = document.getElementById(fieldId);
    document.getElementById(fieldId + 'Error').textContent = message;
    field.classList.toggle('invalid', message !== '');
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var message = document.getElementById('message').value.trim();
    var status = document.getElementById('formStatus');
    var valid = true;

    status.textContent = '';

    if (name === '') {
        setError('name', 'Enter your name.');
        valid = false;
    } else {
        setError('name', '');
    }

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        setError('email', 'Enter a valid email address.');
        valid = false;
    } else {
        setError('email', '');
    }

    if (message.length < 10) {
        setError('message', 'Write a message of at least 10 characters.');
        valid = false;
    } else {
        setError('message', '');
    }

    if (valid) {
        status.textContent = 'Thanks, ' + name + '. Your message is ready to send.';
        form.reset();
    }
});
