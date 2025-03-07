let generatedOtp = '';

// Send OTP
document.getElementById('sendOtpBtn').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    if (!email) {
        alert('Please enter your email.');
        return;
    }

    const response = await fetch('http://localhost:5000/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, purpose: 'signup' })
    });

    const data = await response.json();
    if (data.message === 'OTP sent successfully') {
        generatedOtp = data.otp;
        alert('OTP sent to your email.');
    } else {
        alert('Failed to send OTP.');
    }
});

// Sign Up Form Submission
document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const staffName = document.getElementById('staffName').value;
    const setPin = document.getElementById('setPin').value;
    const confirmPin = document.getElementById('confirmPin').value;
    const email = document.getElementById('email').value;
    const departmentYear = document.getElementById('departmentYear').value;
    const otp = document.getElementById('otp').value;

    if (setPin !== confirmPin) {
        alert('PINs do not match.');
        return;
    }

    if (otp !== generatedOtp) {
        alert('Invalid OTP.');
        return;
    }

    const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ staffName, pin: setPin, email, departmentYear })
    });

    const data = await response.json();
    if (data.message === 'Signup successful') {
        alert('Signup successful!');
        window.location.href = 'login.html';
    } else {
        alert('Signup failed.');
    }
});