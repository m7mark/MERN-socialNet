import React from 'react';
import { Form, Input, Select, Checkbox } from "antd";


const { Search } = Input;
const FormItem = Form.Item;
const { Option }: any = Select;

type PropsType = {
  field: HTMLInputElement
  form: HTMLFormElement
  hasFeedback: boolean
  label: string
  selectOptions: string[]
  submitCount: number
  type: string | null | undefined
  onBlur: () => void
}

const CreateAntField = (AntComponent: any): React.FC<PropsType> => React.memo(({
  field,
  form,
  hasFeedback,
  label,
  selectOptions,
  submitCount,
  type,
  ...props
}) => {
  const touched = form.touched[field.name];
  const submitted = submitCount > 0;
  const hasError = form.errors[field.name];
  const submittedError = hasError && submitted;
  const touchedError = hasError && touched;
  const onInputChange = ({ target: { value } }: React.BaseSyntheticEvent<HTMLInputElement>) =>
    form.setFieldValue(field.name, value);
  const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked
    form.setFieldValue(field.name, value);
  }
  const onChange = (value: string) => form.setFieldValue(field.name, value);
  const onBlur = () => form.setFieldTouched(field.name, true);
  return (
    <div className="field-container">
      <FormItem
        label={label}
        hasFeedback={
          (hasFeedback && submitted) || (hasFeedback && touched) ? true : false
        }
        help={submittedError || touchedError ? hasError : false}
        validateStatus={submittedError || touchedError ? "error" : "success"}
      >
        <AntComponent
          {...field}
          {...props}
          onBlur={onBlur}
          onChange={!type
            ? onChange
            : type === 'checkbox' ? onCheckboxChange : onInputChange}
        >
          {selectOptions &&
            selectOptions.map(name => <Option key={name}>{name}</Option>)}
        </AntComponent>
      </FormItem>
    </div>
  );
});

export const AntSelect = CreateAntField(Select);
export const AntSearch = CreateAntField(Search);
export const AntInputText = CreateAntField(Input);
export const AntInputPassword = CreateAntField(Input.Password);
export const AntCheckbox = CreateAntField(Checkbox);
