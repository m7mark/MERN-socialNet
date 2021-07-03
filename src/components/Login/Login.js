import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { login } from '../../redux/auth-reducer';


const LoginForm = (props) => {
    const submit = (values, { resetForm }) => {
        props.login(values.email, values.password, values.rememberMe)
        resetForm({})
    }
    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                rememberMe: false
            }}
            validationSchema={Yup.object({
                email: Yup.string()
                    .required('Required'),
                password: Yup.string()
                    .required('Required')
            })}
            onSubmit={submit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        type="email"
                    />
                    <br />
                    <Field
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        type="password"
                    />
                    <br />
                    <label htmlfor="rememberMe">Remember me </label>
                    <Field
                        id="rememberMe"
                        name="rememberMe"
                        type="checkbox"
                    />
                    <br />
                    <button type="submit" disabled={isSubmitting}>Sign In</button>
                </Form>
            )}
        </Formik>
    );
};

const Login = (props) => {
    if (props.isAuth) {
        return <Redirect to={"./profile"} />
    }
    return <>
        <h1>Login</h1>
        <LoginForm login={props.login} />
    </>
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, { login })(Login);