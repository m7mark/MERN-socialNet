import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { login } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/store';
import style from '../common/CommonStyle.module.css'

type FormsValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}

const LoginForm: React.FC = (props) => {

    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isError = useSelector((state: AppStateType) => state.auth.isError)
    const errorLoginMessage = useSelector((state: AppStateType) => state.auth.errorLoginMessage)
    const dispatch = useDispatch()


    const submit = (values: FormsValuesType, { resetForm }: any) => {
        dispatch(login(values.email, values.password, values.rememberMe, values.captcha))
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
                rememberMe: false,
                captcha: null
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
                    <label htmlFor="rememberMe">Remember me </label>
                    <Field
                        id="rememberMe"
                        name="rememberMe"
                        type="checkbox"
                    />
                    <div>{isError && !touched.email ? errorLoginMessage : ""}
                    </div>
                    <br />
                    <div>{captchaUrl &&
                        <img src={captchaUrl} alt="captcha" />}
                    </div>
                    {captchaUrl && <div>
                        <div> <label htmlFor="captcha">Enter captcha text </label>
                        </div>
                        <Field
                            id="captcha"
                            name="captcha"
                            type="text"
                        />
                    </div>}

                    <button type="submit" disabled={isSubmitting}>Sign In</button>
                </Form>
            )}
        </Formik >
    );
};

export const Login: React.FC = (props) => {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    if (isAuth) {
        return <Redirect to={"./profile"} />
    }
    return <div className={style.commonPadding}>
        <h1>Login</h1>
        <LoginForm />
    </div>
}