import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { LoginPageForm } from '../components/LoginPageForm';
import { login } from '../redux/auth-reducer';
import { AppStateType } from '../redux/store';

export type FormsValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}

const LoginForm: React.FC = () => {
    const initialValues = {
        email: '',
        password: '',
        rememberMe: false,
        captcha: null
    }
    const dispatch = useDispatch()
    const handleSubmit = (values: FormsValuesType, { resetForm }: any) => {
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
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            {LoginPageForm}
        </Formik >
    );
};

export const Login: React.FC = () => {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    if (isAuth) {
        return <Redirect to={"./profile"} />
    }
    return <div>
        <h1>Login</h1>
        <LoginForm />
    </div>
}