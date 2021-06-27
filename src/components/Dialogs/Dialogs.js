import p from './Dialogs.module.css';
import Message from './Message/Message';
import DialogItem from './DialogItem/DialogItem';
import { Redirect } from 'react-router-dom';

const Dialogs = (props) => {
    let dialogElements =
        props.dialogsPage.dialogsData.map(d => <DialogItem name={d.name} id={d.id} />);

    let messagesElements =
        props.dialogsPage.messagesData.map(m => <Message text={m.message} />);

    let newMessageBody =
        props.dialogsPage.newMessageBody;

    let onSendClick = () => {
        props.SendClick();
    }
    let onNewMessageChange = (e) => {
        let body = e.target.value;
        props.updateNewMessage(body)
    }
   
    return <div className={p.dialogs}>
        <div className={p.dialogsItems}>
            {dialogElements}
        </div>
        <div className={p.messages}>
            <div>{messagesElements}</div>
            <div>
                <div>
                    <textarea value={newMessageBody}
                        onChange={onNewMessageChange}
                        placeholder='Enter your message'></textarea>
                </div>
                <div>
                    <button onClick={onSendClick}>Send</button>
                </div>
            </div>
        </div>
    </div>
}
export default Dialogs;