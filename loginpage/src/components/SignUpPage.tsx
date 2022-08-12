import { SignUpForm } from './SignUpForm'

export const SignUpPage = () => {
  return (
    <>
      <div className="header"></div>
      <div className="signupWrapper">
        <div className="signupContainer">
          <SignUpForm />
          <div>
            <a
              href="https://documenter.getpostman.com/view/17550384/UV5f7Dvw"
              className="link"
            >
              Open API documentation
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
