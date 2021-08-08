import { useFormik } from 'formik';
import { useState } from 'react';
import { ContactsType, ProfileType } from '../../../types/types';
import p from './ProfileInfo.module.css'


type ProfileDataFormProps = {
    saveProfileInfo: (profile: ProfileType) => Promise<void>
    profile: ProfileType
    setEditMode: (arg0: boolean) => void
}
// type ProfileDataFormValues = {
//     value: ProfileType
// }
const ProfileDataForm: React.FC<ProfileDataFormProps> =
    ({ setEditMode, saveProfileInfo, profile, ...props }) => {
        const [errorMessage, setErrorMessage] = useState();
        const formik = useFormik({
            initialValues: { ...profile },
            onSubmit: values => {
                // todo: remove then
                saveProfileInfo(values)
                    .then(() => {
                        setEditMode(false);
                    })
                    .catch(error => {
                        setErrorMessage(error);
                    })
            },
        });
        return (
            <form onSubmit={formik.handleSubmit}>
                <div className={p.error}><b>
                    {errorMessage && errorMessage}
                </b></div>
                <br />
                <label htmlFor="fullName">Full Name </label>
                <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.fullName}
                />
                <br />
                <label htmlFor="aboutMe">About Me </label>
                <input
                    id="aboutMe"
                    name="aboutMe"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.aboutMe}
                />
                <br />
                <label htmlFor="lookingForAJob">Looking for a job </label>
                <input {...props}
                    id="lookingForAJob"
                    name="lookingForAJob"
                    type="checkbox"
                    onChange={formik.handleChange}
                    checked={formik.values.lookingForAJob}
                    value={formik.values.lookingForAJob}
                />
                <br />
                <label htmlFor="lookingForAJobDescription">Looking job description </label>
                <input
                    id="lookingForAJobDescription"
                    name="lookingForAJobDescription"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.lookingForAJobDescription}
                />
                <br />
                <div><b>Contacts:</b>
                    {Object.keys(profile.contacts).map(key => {
                        return <div>
                            <div><label htmlFor={key}>{key}</label></div>
                            <input key={key}
                                id={key}
                                name={"contacts." + key}
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.contacts[key as keyof ContactsType]} /> </div>
                    })}
                </div>
                <br />
                <button type="submit">Save</button>
            </form>
        );
    }

export default ProfileDataForm