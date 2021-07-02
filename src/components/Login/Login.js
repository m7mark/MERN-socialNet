import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';



const LoginForm = ({ }) => {
    const submit = (values, { resetForm }) => {
        console.log(values)
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
                <button type="submit">Send</button>
            </Form>
        </Formik>
    );
};

const Login = (props) => {
    return <>
        <h1>Login</h1>
        <LoginForm />
    </>
}
export default Login