import { withFormik } from 'formik';
import RegisterForm from '../components/RegisterForm';
import validateForm from '../../../utils/validate';
import { userActions } from '../../../redux/actions';
import { useNavigate } from 'react-router-dom';
import store from '../../../redux/store';

export default withFormik({
  mapPropsToValues: () => ({
    email: "",
    fullname: "",
    password: "",
    password_2: "",
  }),
    validate: values => {
      const errors = {};
      
      validateForm({ isAuth: false, values, errors });
      return errors;
    },  
    handleSubmit: (values, { setSubmitting }) => {
      store.dispatch(userActions.fetchUserRegister(values)).then(({ status }) => {
        if (status === 'success') {
          const history = useNavigate();
          history('/');
        }
        setSubmitting(false);
      }).catch((e) => {
        setSubmitting(false);
        throw e;
      });
    },
    displayName: 'RegisterForm',
  })(RegisterForm);