import { withFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import validateForm from '../../../utils/validate';

import {userActions} from '../../../redux/actions';
import store from '../../../redux/store';

const LoginFormContainer = withFormik({
    mapPropsToValues: () => ({
        email: "",
        password: "",
    }),
    validate: values => {
        const errors = {};
        
        validateForm({ isAuth: true, values, errors });
        
        return errors;
    },  
    handleSubmit: (values, { setSubmitting }) => {
      store.dispatch(userActions.fetchUserLogin(values)).then(({ status }) => {
        if (status === 'success') {
          const history = useNavigate();
          history('/');
        }
        setSubmitting(false);
      }).catch(() => {
        setSubmitting(false);
      });
    },
    displayName: 'LoginForm',
  })(LoginForm);

export default LoginFormContainer;