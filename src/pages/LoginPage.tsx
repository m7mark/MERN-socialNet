import { actions, login } from '../redux/auth-reducer';
import { AppStateType } from '../redux/store';
import {
  Button,
  Checkbox,
  Form,
  Input
} from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
      size='large'
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
          rules={[{ required: true, message: 'Please input your E-mail!' },]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="E-mail"
          />
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
  const navigate = useNavigate()
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
  useEffect(() => {
    if (isAuth) { navigate("/profile") }
  }, [isAuth, navigate])

  return <div>
    <h1>Login</h1>
    <LoginForm />
  </div>
}