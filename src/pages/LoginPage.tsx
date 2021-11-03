import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { actions, login } from '../redux/auth-reducer';
import { AppStateType } from '../redux/store';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export type FormsValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}

const LoginForm: React.FC = () => {

    const initialValues: FormsValuesType = {
        email: '',
        password: '',
        rememberMe: false,
        captcha: null
    }
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const errorLoginMessage = useSelector((state: AppStateType) => state.auth.errorLoginMessage)
    const dispatch = useDispatch()
    const onFinish = (values: FormsValuesType) => {
        dispatch(login(values.email, values.password, values.rememberMe, values.captcha))
    };
    const cleaErrorLoginMessage = () => dispatch(actions.errorLogin(''))

    return (
        <Form
            name="loginForm"
            className="login-form"
            style={{ maxWidth: 'max-content' }}
            initialValues={initialValues}
            onFinish={onFinish}
            onValuesChange={cleaErrorLoginMessage}
        >
            <Form.Item
                {...errorLoginMessage && {
                    help: errorLoginMessage,
                    validateStatus: 'error',
                }}
            >
                <Form.Item
                    name="email"
                    rules={[
                        { type: 'email', message: 'The input is not valid E-mail!' },
                        { required: true, message: 'Please input your E-mail!' },
                    ]}
                >
                    <Input prefix={<UserOutlined
                        className="site-form-item-icon" />}
                        placeholder="E-mail" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
            </Form.Item>
            <Form.Item>
                <Form.Item name="rememberMe" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
            </Form.Item>
            <div>{captchaUrl &&
                <img src={captchaUrl} alt="captcha" />}
            </div>
            <Form.Item
                hidden={!captchaUrl}
                name="captcha"
                rules={[{
                    required: !!captchaUrl,
                    message: 'Please input captcha!'
                }]}
            >
                <Input
                    type="text"
                    placeholder="Captcha"
                />
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    style={{ width: '100%' }}
                >
                    Log in
                </Button>
                Or <a href="https://snoapi.herokuapp.com"
                    rel="noreferrer" target="_blank">register now!</a>
            </Form.Item>
        </Form>
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