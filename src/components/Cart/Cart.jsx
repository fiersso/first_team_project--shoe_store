import { Link } from "react-router-dom";
import styles from "./Cart.module.css";
import { useNavigate } from "react-router-dom";
import deleteIcon from '../../assets/x.svg';

const Cart = (props) => {
    const navigate = useNavigate();
    return (
        <div id="Cart" className={`${styles.Cart} hidden`}>
            <Link to='#' className={styles.item}>
                <h2>BatinOk</h2>
                <img style={{
                    borderRadius: '50%',
                    width: '3rem',
                    aspectRatio: '1/1',
                }} src={deleteIcon}></img>
            </Link>
            <Link to='#' className={styles.item}>
                <h2>BotSa</h2>
                <img style={{
                    borderRadius: '50%',
                    width: '3rem',
                    aspectRatio: '1/1',
                }} src={deleteIcon}></img>
            </Link>
        </div>
    );
}

export default Cart;