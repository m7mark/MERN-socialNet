import React from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Profile from '../components/Profile/Profile';


const ProilePage: React.FC = () => {
    const history = useParams();
    console.log(history);
    return (
        <Profile/>
    )
}

export default ProilePage