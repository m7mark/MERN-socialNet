import { Form, Field } from "formik";
import { useEffect } from "react";
import { AntSearch, AntSelect, } from "../../UI/formAnt/CreateAntFields";
// import { isRequired } from "./ValidateFields";

type PropsType ={
  values: {
    selected: string
    selectFollowedOptions: string[]
  }
  submitCount: number
  handleSubmit: () => void
}

const SearchFormDisplay:React.FC<PropsType> = ({ handleSubmit, values, submitCount }) => {
  useEffect(() => {
    handleSubmit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.selected]);
  return (
    <Form className="form-container" onSubmit={handleSubmit}>
      <Field
        component={AntSearch}
        name="text"
        type="text"
        // label="Find"
        submitCount={submitCount}
        // hasFeedback
        placeholder="Search text"
        allowClear
        enterButton="Search"
        size="middle"
        onSearch={handleSubmit}
      />
      <Field
        component={AntSelect}
        name="selected"
        label={false}
        defaultValue={values.selected}
        selectOptions={values.selectFollowedOptions}
        // validate={isRequired}
        submitCount={submitCount}
        tokenSeparators={[","]}
        style={{ width: 130 }}
        // hasFeedback
      />
      {/* <div className="submit-container">
        <button className="ant-btn ant-btn-primary" type="submit">
          Submit
        </button>
      </div> */}
    </Form>
  )
}

export default SearchFormDisplay