const form = document.getElementById('user-form');
const alertBox = document.getElementById('alert');
const submitBtn = document.getElementById('submit-btn');
const postSubmit = document.getElementById('post-submit');

function showAlert(message, type) {
    alertBox.textContent = message;
    alertBox.className = `alert show ${type}`;
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value,
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Adding…';

    try {
        const res = await fetch('/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            throw new Error('Failed to add user');
        }

        showAlert(`User "${payload.name}" added successfully.`, 'success');
        form.reset();
        postSubmit.classList.add('show');
    } catch (err) {
        showAlert(err.message || 'Something went wrong', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Add User';
    }
});
