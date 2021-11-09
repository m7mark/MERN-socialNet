import React, { useEffect, useState } from 'react';
import { BackTop } from 'antd';
import { CurrentUsers } from '../components/Users/CurrentUsers';
import { useDispatch, useSelector } from 'react-redux';
import { UserPaginator } from '../components/Users/UserPaginate';
import { UsersSearchForm } from '../components/Users/UsersSearchForm';
import { useSearchParams } from 'react-router-dom';
import {
  FilterType,
  getUsers,
} from '../redux/users-reducer';
import {
  getCurrentPage,
  getPageSize,
  getUsersFilter,
} from '../redux/users-selector';


type PropsType = {
  pageTitle: string
}
export const UsersPage: React.FC<PropsType> = (props) => {
  const currentPageState = useSelector(getCurrentPage)
  const pageSizeState = useSelector(getPageSize)
  const filterState = useSelector(getUsersFilter)

  const [query, setQuery] = useSearchParams();
  const [queryObj, setQueryObj] = useState({
    // page: '1',
    // count: '',
    // term: '',
    // friend: ''
  });

  const [filter, setFilter] = useState<FilterType>(filterState)
  const [page, setPage] = useState<number>(currentPageState)
  const [pageSize, setPageSize] = useState<number>(pageSizeState)

  const dispatch = useDispatch()
  useEffect(() => {
    if (JSON.stringify(filter) === JSON.stringify(filterState)) {
      pageSize && dispatch(getUsers(page, pageSize, filter))
    }
    else {
      pageSize && dispatch(getUsers(1, pageSize, filter))
      setPage(1)
    }
  }, [pageSize, page, filter, dispatch, filterState]);

  useEffect(() => {
    setQueryObj(prev => ({ ...prev, page: `${page}` }))
    setQueryObj(prev => ({ ...prev, count: `${pageSize}` }))
    setQueryObj(prev => ({ ...prev, term: filter.term }))
    if (!filter.friend) setQueryObj(prev => ({ ...prev, friend: '0' }))
    else { setQueryObj(prev => ({ ...prev, friend: '1' })) }
  }, [pageSize, page, filter]);
  useEffect(() => {
    setQuery(queryObj)
  }, [queryObj, setQuery]);


  return <div>
    <BackTop />
    <h2>{props.pageTitle}</h2>
    <UserPaginator setPage={setPage} setPageSize={setPageSize} />
    <br />
    <UsersSearchForm
      setFilter={setFilter} />
    <CurrentUsers />
  </div>
}