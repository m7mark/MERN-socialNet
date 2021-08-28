import Text from 'antd/lib/typography/Text';
import { Form, Input, Switch } from 'antd';
import { getUsersFilter } from '../../redux/users-selector';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const { Search } = Input;
type PropsType = {
    setFilter: React.Dispatch<React.SetStateAction<{
        term: string;
        friend: boolean | null;
    }>>
}
export const UsersSearchForm: React.FC<PropsType> = ({ setFilter }) => {
    const filterState = useSelector(getUsersFilter)
    const [searchText, setSearchText] = useState(filterState.term)
    const [isOnlyFriends, setIsOnlyFriends] = useState<boolean | null>(filterState.friend)
    const friendsSelectParams = (e: boolean) => {
        if (e === false) { setIsOnlyFriends(null) }
        if (e === true) { setIsOnlyFriends(true) }
    }
    useEffect(() => {
        setFilter({ term: searchText, friend: isOnlyFriends })
    }, [searchText, isOnlyFriends, setFilter]);
    return (
        <Form
            initialValues={filterState}
            layout='horizontal'
            className="form-container"
        >
            <Form.Item name="term">
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    onSearch={(value) => setSearchText(value)}
                />
            </Form.Item>
            <div className='form-item-switch'>
                {filterState.friend
                    ? <Switch defaultChecked={false}
                        checked={filterState.friend} onChange={friendsSelectParams} />
                    : <Switch defaultChecked={false}
                        onChange={friendsSelectParams} />}
                <Text type="secondary"> Only Friends</Text>
            </div>
        </Form>
    )
}

