const name = () => {  }; export default ({ isAuth, values, errors }) => {
    
    const rules = {
        email: (value) => {
            if (!value) {
                errors.email = 'Input email address';
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                errors.email = "Invalid email address";
            }
        },
        password: (value) => {
            if (!value) { 
                errors.password = "Enter password";
            }
            else if (!isAuth && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/i.test(value)) {
                errors.password = "Too easy password";
            }  
        },
        password_2: (value) => {
            if (!isAuth && value !== values.password) { 
                errors.password_2 = "Passwords do not match";
            }
        },
        fullname: (value) => {
            if (!isAuth && !value) {
                errors.fullname = 'Input your name';
            }
        }
    }

    Object.keys(values).forEach(key => rules[key] && rules[key](values[key]));

};