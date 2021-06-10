import { NavLink } from 'react-router-dom';
import p from './../Dialogs.module.css';

const DialogItem = (props) => {
    let path = "/messages/" + props.id;
    return (
        <div className={p.dialog}>
            <NavLink to={path} activeClassName={p.active}>{props.name}</NavLink>
        </div>
    );
}

export default DialogItem;