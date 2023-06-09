import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import styles from './CartPage.module.css';
import { jsonCategories, jsonList } from './../Catalog/items';
import { useNavigate } from "react-router-dom";


const CartPage = (props) => {

    document.title = props.PageTitle;

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    let [items, setItems] = useState([]);

    useEffect(() => {
        if (user) {
            (async function () {
                let response = await fetch(`http://localhost:3000/get_cart`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userLogin: String(user.name), }),
                });
                if (response.status != 204) {
                    let cart = await response.json();
                    setItems(cart, 'SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
                    console.log(cart);
                }
            })()
        }

        if (!user) {
            navigate('/');
        }

    }, [user])
    return (<div className={`container`} style={{
        textAlign: 'center',
    }}>
        <h1 style={{
            fontSize: '4rem',
            fontWeight: 'bold',
            margin: '1rem 0rem 4rem 0rem',
        }}>{(items.length !== 0) ? 'В вашей корзине находятся:' : 'В вашей корзине отсутствует обувь.'}</h1>

        {(items.length !== 0) ? <div className={`${styles.main}`}>
            {(items.length !== 0) && items.map((item) => {
                return (<>
                    <div className={styles.item}>
                        <h1>{item.name}</h1>
                        <img className={styles.itemImage} src={`/itemImages/${item.articul}.jpg`} />
                        <button onClick={(e) => {
                            fetch(`http://localhost:3000/delete_item_from_cart`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json;charset=utf-8'
                                },
                                body: JSON.stringify({ itemArticul: item.articul, userLogin: user.name }),
                            }).then((response) => {
                                return response.json();
                            }).then((data) => {
                                setItems(data)
                            });

                            if (items.length == 1) {
                                setItems([]);
                            }
                        }
                        }>Delete</button>
                    </div>
                </>
                )
            })}
        </div> : <div style={{ opacity: '0%', }}>
            <img style={{
                width: '100%',
                height: '100%',
                maxHeight: '28rem',
                borderRadius: '1rem',
            }} src="https://ic.pics.livejournal.com/yael_shoshany/78673305/1100363/1100363_900.jpg" />
            <h1>Грустно.</h1>
        </div>}


    </div>);
}

export default CartPage;