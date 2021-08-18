import { Formik } from "formik";
import { FilterType } from "../../../redux/users-reducer";
import SearchFormDisplay from "./SearchFormDisplay";


export type FormPropsType = {
    text: string
    selected: string
}
type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
const UsersSearchForm: React.FC<PropsType> = (props) => {

    const initialValues = {
        text: '',
        selected: 'All',
        selectFollowedOptions: ["All", "Followed", "Unfollowed"]
    };
    const handleSubmit = (formProps: FormPropsType) => {
        const { selected, text } = formProps;
        let friendFilter = null
        switch (selected) {
            case 'Followed':
                friendFilter = true
                break
            case 'Unfollowed':
                friendFilter = false
                break
        }
        let filter = {
            term: text,
            friend: friendFilter
        }
        props.onFilterChanged(filter)
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            render={SearchFormDisplay}
        />
    );
}

export default UsersSearchForm;


