import { getCurrentPage, getPageSize, getTotalUsersCount } from '../../redux/users-selector';
import { Pagination } from 'antd';
import { useSelector } from 'react-redux';


type PropsType = {
    setPage: React.Dispatch<React.SetStateAction<number>>
    setPageSize: React.Dispatch<React.SetStateAction<number>>
}
export const UserPaginator: React.FC<PropsType> = ({ setPage, setPageSize }) => {
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPageState = useSelector(getCurrentPage)
    const pageSizeState = useSelector(getPageSize)
    const onChange = (pageNumber: number, pageSize?: number) => {
        setPage(pageNumber)
        pageSize && setPageSize(pageSize)
    }

    return (
        <Pagination
            pageSize={pageSizeState}
            current={currentPageState}
            total={totalUsersCount}
            onChange={onChange}
            responsive={true}
        />
    );
}