import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation} from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

import menuButtonSVG from "../../assets/menu_button.svg";
import basketSVG from "../../assets/basket.svg";

import styles from "./Navbar.module.css";
import Menu from "./Menu";
import Cart from "../Cart/Cart";


const Navbar = () => {

    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    let [MenuVisibility, setMenuVisibility] = useState(false);
    let [CartVisibility, setCartVisibility] = useState(false);

    document.querySelector('#root').addEventListener('click', (event) => {
        if (!event.target.closest('#Menu') && event.target.id !== 'MenuButton') {
            setMenuVisibility(false);
        }
        if (!event.target.closest('#Cart') && event.target.id !== 'CartButton') {
            setCartVisibility(false);
        }
    });

    useEffect(() => {
        if (!document.querySelector('#Menu')) {return}
        if (MenuVisibility) {
            document.querySelector('#Menu').classList.remove('hidden');
        } else {
            document.querySelector('#Menu').classList.add('hidden');
        }
    }, [MenuVisibility]);

    useEffect(() => {
        if (!document.querySelector('#Cart')) {return}
        if (CartVisibility) {
            document.querySelector('#Cart').classList.remove('hidden');
        } else {
            document.querySelector('#Cart').classList.add('hidden');
        }
    }, [CartVisibility]);

    return (
        <div id="Navbar" className={styles.Navbar}>
            <div className="container">
                <nav>
                    <Link to="/" className={styles.logo}>Logofise</Link>
                    <div>
                        {!user ? <button onClick={() => navigate('/registration', {path: '/catalog'})} id="registrationButton">registration</button>
                            : <>
                                <Link to="#">
                                    <img onClick={() => { setMenuVisibility(true); }}
                                    id="MenuButton"
                                    src={menuButtonSVG}/>
                                </Link>
                                <Link to="/cart" style={{padding: '0', margin: '0'}}>
                                    <img onClick={(event) => { setCartVisibility(true); }}
                                        id='CartButton'
                                        src={basketSVG}/>
                                </Link>
                            </>
                        }
                        <Link to="/">support</Link>
                        <Link to="/">information</Link>
                    </div>
                </nav>

                {user && <Menu user={user} logout={logout}/>}
                {/* {user && <Cart user={user}/>} */}
            </div>
        </div>
    );
}

export default Navbar;