import p from './../Dialogs.module.css';

const Message: React.FC<{text: string}> = (props) => {
    return (
        <div className={p.message}>{props.text}</div>
    );
}

export default Message;