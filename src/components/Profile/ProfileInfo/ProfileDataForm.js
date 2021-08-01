import { useFormik } from 'formik';

const ProfileDataForm = ({ setEditMode, saveProfileInfo, profile }) => {
    const formik = useFormik({
        initialValues: { ...profile },
        onSubmit: values => {
            saveProfileInfo(values);
            setEditMode(false);
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
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
            <label htmlfor="lookingForAJob">Looking for a job </label>
            <input
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
            <button type="submit">Save</button>
        </form>
    );
}

export default ProfileDataForm