import React from 'react';
import { useField } from 'formik';
import styles from './MyForms.module.css'


type Props = {
    id: string
    name: string
    label?: string
    type?:string
}
const MyTextInput: React.FC<Props> = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <div className={meta.error ? (
                styles.formControl + " " + styles.error
            ) : undefined}>
                <input {...field} {...props} />
            </div>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

export default MyTextInput;