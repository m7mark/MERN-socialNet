import p from './../Dialogs.module.css';

const Message = (props) => {
    return (
        <div className={p.message}>{props.text}</div>
    );
}

export default Message;