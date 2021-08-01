import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { login } from '../../redux/auth-reducer';
import style from '../common/CommonStyle.module.css'


const LoginForm = (props) => {
    const submit = (values, { resetForm }) => {
        props.login(values.email, values.password, values.rememberMe)
        resetForm({})
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Required'),
        password: Yup.string()
            .required('Required'),
    })

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                rememberMe: false
            }}
            validationSchema={validationSchema}
            onSubmit={submit}
        >
            {({ errors, isSubmitting, touched }) => (
                <Form>
                    <Field
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        type="email"
                    />
                    {errors.email}
                    <br />
                    <Field
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        type="password"
                        autocomplete="on"
                    />
                    {errors.password}
                    <br />
                    <label htmlfor="rememberMe">Remember me </label>
                    <Field
                        id="rememberMe"
                        name="rememberMe"
                        type="checkbox"
                    />
                    <div>{props.isError && !touched.email ? props.errorLoginMessage : ""}
                    </div>
                    <br />
                    <button type="submit" disabled={isSubmitting}>Sign In</button>
                </Form>
            )}
        </Formik >
    );
};

const Login = (props) => {
    if (props.isAuth) {
        return <Redirect to={"./profile"} />
    }
    return <div className={style.commonPadding}>
        <h1>Login</h1>
        <LoginForm
            errorLoginMessage={props.errorLoginMessage}
            isError={props.isError}
            login={props.login} />
    </div>
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    isError: state.auth.isError,
    errorLoginMessage: state.auth.errorLoginMessage
})
export default connect(mapStateToProps, { login })(Login);