import { Form, Field } from "formik";
import { useSelector } from "react-redux";
import { FormsValuesType } from "../pages/LoginPage";
import { AppStateType } from "../redux/store";
import { isRequired, validateEmail } from "../utils/validate/ValidateFields";
import { AntCheckbox, AntInputPassword, AntInputText } from "./UI/formAnt/CreateAntFields";

type PropsType = {
  values: FormsValuesType
  submitCount: number
  handleSubmit: () => void
}

export const LoginPageForm: React.FC<PropsType> = ({ handleSubmit, submitCount }) => {

  const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
  const isError = useSelector((state: AppStateType) => state.auth.isError)
  const errorLoginMessage = useSelector((state: AppStateType) => state.auth.errorLoginMessage)
  return (
    <Form className="form-container" style={{ display: 'block', maxWidth: 'max-content' }} onSubmit={handleSubmit}>
      <Field
        component={AntInputText}
        name="email"
        type="email"
        label="E-mail"
        placeholder="Enter your email"
        submitCount={submitCount}
        validate={validateEmail}
        hasFeedback
      />
      <Field
        component={AntInputPassword}
        name="password"
        type="password"
        label="Password"
        placeholder="Enter your password"
        autoComplete="on"
        submitCount={submitCount}
        validate={isRequired}
      />
      <Field
        component={AntCheckbox}
        name="rememberMe"
        label="Remember me"
        type='checkbox'
        submitCount={submitCount}
      />
      <div>{isError && errorLoginMessage}
      </div>
      <div>{captchaUrl &&
        <img src={captchaUrl} alt="captcha" />}
      </div>
      {captchaUrl && <div>
        <Field
          component={AntInputText}
          name="captcha"
          type="text"
          label="Captcha"
          placeholder="captcha"
          submitCount={submitCount}
          validate={isRequired}
        />
      </div>}
      <div className="submit-container">
        <button className="ant-btn ant-btn-primary" type="submit">
          Login
        </button>
      </div>
    </Form>
  )
}
