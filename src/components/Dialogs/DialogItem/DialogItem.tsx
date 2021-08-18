import { NavLink } from 'react-router-dom';
import p from './../Dialogs.module.css';


type PropsType = {
    name: string 
    id: number
}
const DialogItem:React.FC<PropsType> = (props) => {
    let path = "/messages/" + props.id;
    return (
        <div className={p.dialog}>
            <NavLink to={path} replace activeClassName={p.active}>{props.name}</NavLink>
        </div>
    );
}

export default DialogItem;