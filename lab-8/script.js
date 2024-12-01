function sanitizeInput(input) {
    return input.replace(/[&<>"']/g, function(match) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[match];
    });
}

function updateLastUpdated() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    const formattedDate = now.toLocaleDateString('en-US', options);
    document.getElementById('lastUpdated').textContent = `Last Updated: ${formattedDate}`;
}

function validateForm() {
    let isValid = true;
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Check for empty fields
    if (firstName === '') {
        document.getElementById('firstNameError').textContent = 'First name is required';
        isValid = false;
    } else {
        document.getElementById('firstNameError').textContent = '';
    }

    if (lastName === '') {
        document.getElementById('lastNameError').textContent = 'Last name is required';
        isValid = false;
    } else {
        document.getElementById('lastNameError').textContent = '';
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Invalid email format';
        isValid = false;
    } else {
        document.getElementById('emailError').textContent = '';
    }

    // Check password match
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
        isValid = false;
    } else {
        document.getElementById('confirmPasswordError').textContent = '';
    }

    // Sanitize inputs to prevent XSS
    if (isValid) {
        document.getElementById('firstName').value = sanitizeInput(firstName);
        document.getElementById('lastName').value = sanitizeInput(lastName);
        document.getElementById('email').value = sanitizeInput(email);

        // Show success popup
        document.getElementById('popup').style.display = 'flex';
    }

    return false; // Prevent form submission
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    updateLastUpdated();
});