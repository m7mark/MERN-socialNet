import p from './Dialogs.module.css';
import Message from './Message/Message';
import DialogItem from './DialogItem/DialogItem';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../common/FormsControl/MyForms';
import { InitialStateDialogs } from '../../redux/dialog-reducer';
import { Col, Result, Row } from 'antd';


type OwnPropsType = {
    dialogsPage: InitialStateDialogs
    postNewMesageBody: (newText: string) => void
}
type AddMessageFormProps = {
    postNewMesageBody: (newText: string) => void
}
type FormsValuesType = {
    newMessageBodyText: string
}
const Dialogs: React.FC<OwnPropsType> = (props) => {
    let dialogElements =
        props.dialogsPage.dialogsData.map(d => <DialogItem
            key={d.id} name={d.name} id={d.id} />);

    let messagesElements =
        props.dialogsPage.messagesData.map(m => <Message
            key={m.id} text={m.message} />);

    return <div>
        <Row>
            <Col style={{ maxWidth: '500px' }} md={24} sm={24} xs={24}>
                {true
                    ? <Result
                        status="404"
                        title="Maintained"
                        subTitle="Sorry, the page you visited is under development."
                    // extra={<Button type="primary">Back Home</Button>}
                    />
                    : <div>
                        <div>
                            {dialogElements}
                            <AddMessageForm postNewMesageBody={props.postNewMesageBody} />
                        </div>
                        <div className={p.messages}>
                            <div>{messagesElements}</div>
                        </div>
                    </div>}
            </Col>
        </Row>
    </div >
}
export default Dialogs;

const AddMessageForm: React.FC<AddMessageFormProps> = (props) => {
    const submit = (values: FormsValuesType, { resetForm }: any) => {
        props.postNewMesageBody(values.newMessageBodyText)
        resetForm({})
    }
    return (
        <Formik
            initialValues={{
                newMessageBodyText: ''
            }}
            validationSchema={Yup.object({
                newMessageBodyText: Yup.string()
                    .max(100, 'Must be 100 characters or less')
                    .required('Required')
            })}
            onSubmit={submit}
        >
            <Form>
                <MyTextInput
                    id="newMessageBodyText"
                    name="newMessageBodyText"
                    placeholder="Enter your message"
                />
                <br />
                <button type="submit">Send</button>
            </Form>
        </Formik>
    );
};
