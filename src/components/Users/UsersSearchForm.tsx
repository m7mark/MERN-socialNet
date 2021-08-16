import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { FilterType } from "../../redux/users-reducer";
import { getUsersFilter } from "../../redux/users-selector";

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
export const UsersSearchForm: React.FC<PropsType> = (props) => {

    const filter = useSelector(getUsersFilter)
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            term: filter.term,
            friend: String(filter.friend)
        },
        onSubmit: (values) => {
            const filter: FilterType = {
                term: values.term,
                friend: values.friend === 'null' ?
                    null : values.friend === 'true' ? true : false
            }
            props.onFilterChanged(filter)
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="term">Find people</label>
            <input
                id="term"
                name="term"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.term}
            />
            <select
                id="friend"
                name="friend"
                onChange={formik.handleChange}
                value={formik.values.friend}
            >
                <option value={'null'}>All</option>
                <option value={'true'}>Only followed</option>
                <option value={'false'}>Only unfollowed</option>
            </select>
            <button type="submit">Find</button>
        </form>
    )
}