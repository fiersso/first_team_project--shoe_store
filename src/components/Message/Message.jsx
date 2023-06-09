import styles from './Message.module.css';
import icon from '../../assets/messageIcon.svg';

const Message = ({children}) => {
    return (<div className={styles.message}>
        <h2>{children}</h2>
        <img src={icon}></img>
    </div>);
}
 
export default Message;