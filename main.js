document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('awesomeForm');
    const fields = {
      name: {
        input: document.getElementById('name'),
        validator: (val) => /^[a-zA-Z\s]{3,30}$/.test(val),
        error: 'Please enter a valid name (3-30 letters only).'
      },
      email: {
        input: document.getElementById('email'),
        validator: (val) => /^\S+@\S+\.\S+$/.test(val),
        error: 'Please enter a valid email address.'
      },
      phone: {
        input: document.getElementById('phone'),
        validator: (val) => /^\+?\d{10,15}$/.test(val),
        error: 'Enter a valid phone number (10–15 digits).'
      },
      password: {
        input: document.getElementById('password'),
        validator: (val) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(val),
        error: 'Password must be at least 8 characters and include a number.'
      },
      confirmPassword: {
        input: document.getElementById('confirmPassword'),
        validator: () => fields.confirmPassword.input.value === fields.password.input.value,
        error: 'Passwords do not match.'
      }
    };
  
    const showError = (field, message) => {
      const input = field.input;
      const errorMsg = input.nextElementSibling;
      input.classList.add('error');
      errorMsg.textContent = message;
      errorMsg.style.display = 'block';
    };
  
    const clearError = (field) => {
      const input = field.input;
      const errorMsg = input.nextElementSibling;
      input.classList.remove('error');
      errorMsg.textContent = '';
      errorMsg.style.display = 'none';
    };
  
    const validateField = (key) => {
      const field = fields[key];
      const value = field.input.value.trim();
      if (!field.validator(value)) {
        showError(field, field.error);
        return false;
      } else {
        clearError(field);
        return true;
      }
    };
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
  
      Object.keys(fields).forEach((key) => {
        if (!validateField(key)) {
          isValid = false;
        }
      });
  
      if (isValid) {
        alert('Form submitted successfully!');
        form.reset();
      }
    });
  
    Object.keys(fields).forEach((key) => {
      const field = fields[key];
      field.input.addEventListener('input', () => validateField(key));
    });
  });
  