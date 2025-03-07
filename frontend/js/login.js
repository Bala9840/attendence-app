let generatedOtp = '';

// Login Form
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const pin = document.getElementById('pin').value;

    const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
    });

    const data = await response.json();
    if (data.message === 'Login successful') {
        window.location.href = 'attendance.html';
    } else {
        alert('Invalid PIN');
    }
});

// Forgot Password Modal
const modal = document.getElementById('forgotPasswordModal');
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const closeBtn = document.querySelector('.close');

forgotPasswordLink.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Send OTP
document.getElementById('sendOtpBtn').addEventListener('click', async () => {
    const email = document.getElementById('forgotEmail').value;
    if (!email) {
        alert('Please enter your email.');
        return;
    }

    const response = await fetch('http://localhost:5000/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, purpose: 'forgot-password' })
    });

    const data = await response.json();
    if (data.message === 'OTP sent successfully') {
        generatedOtp = data.otp;
        alert('OTP sent to your email.');
    } else {
        alert('Failed to send OTP.');
    }
});

// Reset Password
document.getElementById('forgotPasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('forgotEmail').value;
    const otp = document.getElementById('forgotOtp').value;
    const newPin = document.getElementById('newPin').value;

    if (otp !== generatedOtp) {
        alert('Invalid OTP.');
        return;
    }

    const response = await fetch('http://localhost:5000/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPin })
    });

    const data = await response.json();
    if (data.message === 'Password reset successful') {
        alert('Password reset successful!');
        modal.style.display = 'none';
    } else {
        alert('Password reset failed.');
    }
});