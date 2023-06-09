import { Link } from "react-router-dom";
import styles from "./Menu.module.css";
import { useNavigate } from "react-router-dom";

const Menu = (props) => {
    const navigate = useNavigate();
    return (
        <div id="Menu" className={`${styles.Menu} hidden`}>
            <div className={styles.UserData}>
                <p>Welcome,</p>
                <h1>{props.user.name.toUpperCase()}!</h1>
            </div>

            <hr />
            <Link to="#">Settings</Link>
            <hr />
            <Link to="#">New account</Link>
            <hr />
            <Link to="#">Switch theme</Link>
            
            <Link to="#" onClick={() => {
                props.logout();
            }}>Logout</Link>
            {props.user.name === 'admin' && <><hr /><Link to="http://localhost:3000/admin"><button>ADMIN PAGE</button></Link></>}
            
        </div>
    );
}

export default Menu;