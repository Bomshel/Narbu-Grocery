function validation(values) {
    let errors = {};
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$/;
  
    if (!values.full_name.trim()) {
      errors.full_name = "Name can't be empty.";
    }
  
    if (!values.email.trim()) {
      errors.email = "Email should not be empty.";
    } else if (!emailPattern.test(values.email)) {
      errors.email = "Invalid email format.";
    }
  
    if (!values.password.trim()) {
      errors.password = "Password should not be empty.";
    } else if (!passwordPattern.test(values.password)) {
      errors.password = "Password must contain at least one digit, one lowercase, one uppercase letter, and 6 or more characters.";
    }
  
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
  
    return errors;
  }
  
  export default validation;
  