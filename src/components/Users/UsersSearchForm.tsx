import { Form, Input } from 'antd';
import { FilterType } from "../../redux/users-reducer";

const { Search } = Input;
export type FormPropsType = {
    queryParams: string
    // querySelector: string
}
type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
const UsersSearchForm: React.FC<PropsType> = (props) => {

    const initialValues: FormPropsType = { queryParams: '' }
    // querySelector: 'All'

    // const querySelector = [
    //     { label: 'All', value: 'All' },
    //     { label: 'Followed', value: 'Followed' },
    //     { label: 'Unfollowed', value: 'Unfollowed' },
    // ]
    const handleSubmit = (queryParams: string) => {
        let friendFilter = null
        // switch (querySelector) {
        //     case 'Followed':
        //         friendFilter = true
        //         break
        //     case 'Unfollowed':
        //         friendFilter = false
        //         break
        // }
        let filter = {
            term: queryParams,
            friend: friendFilter
        }
        props.onFilterChanged(filter)
    };
    return (
        <Form
            initialValues={initialValues}
            layout='horizontal'
            className="form-container"
        >
            <Form.Item
                name="queryParams"
            >
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    onSearch={handleSubmit}
                />
            </Form.Item>
            {/* <Form.Item name="querySelector" >
                <Select
                    style={{ minWidth: '120px' }}
                    defaultValue="All"
                    options={querySelector}
                    // onChange={handleChange}
                     />
            </Form.Item> */}
        </Form>
    )
}

export default UsersSearchForm;


