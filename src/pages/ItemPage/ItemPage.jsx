import { Link, useLocation } from "react-router-dom";
import { jsonList } from "../Catalog/items";
import { useContext, useEffect, useState } from "react";
import styles from './itemPage.module.css';
import { AuthContext } from "../../providers/AuthProvider";
import Message from "../../components/Message/Message";

const ItemPage = () => {
    let itemArticul = String(useLocation().pathname.split('/').pop());
    let [item, setItem] = useState({});
    let [inCart, setInCart] = useState(false)

    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch(`http://localhost:3000/get_item?itemArticul=${itemArticul}`).then(response => {
            return response.json();
        }).then(data => {
            setItem(data);
            if (user) {
                (async function () {
                    let response = await fetch(`http://localhost:3000/get_cart`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ userLogin: String(user.name), }),
                    });
                    if (response.status !== 204) {
                        let cart = await response.json();
                        for (let cartItem of cart) {
                            // console.log(cartItem.articul, data.articul);
                            if (cartItem.articul == data.articul) {
                                setInCart(true);
                            }
                        }
                    }
                })()
            }
        });
    }, [])

    return (
        <>
            <div className={`container`}>
                <div className={styles.container} style={{
                    marginTop: '-2rem',
                }}>
                    <img className={styles.itemImage} src={`/itemImages/${item.articul}.jpg`} />

                    <div className={styles.itemInfo}>
                        {user &&
                            <h2 style={{ marginBottom: '-1.25rem', color: 'rgb(75, 75,75)', }}>{user.name?.toUpperCase()}, крайне вам советуем приобрести</h2>
                        }
                        <h1>{item.name?.toUpperCase()}!</h1>
                        <h2 style={{ fontSize: '2.2rem' }}>{item.price}$</h2>

                        {user ? <div className={styles.actions}>
                            <button className={styles.buyButton}>BUY</button>
                            {(!inCart) ?
                                <Link to='#' className={styles.addToCart} onClick={(event) => {
                                    event.preventDefault();
                                    console.log(user.name, itemArticul, 'addItemTTocART');
                                    fetch(`http://localhost:3000/add_to_cart`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json;charset=utf-8'
                                        },
                                        body: JSON.stringify({ itemArticul: itemArticul, userLogin: user.name }),
                                    }).then((response) => {
                                        setInCart(true);
                                    });
                                }}></Link>
                                : <a style={{
                                    fontSize: '1.4rem',
                                    textDecorationLine: 'underline 2rem',
                                }}
                                    onClick={
                                        async function (event) {
                                            fetch(`http://localhost:3000/delete_item_from_cart`, {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json;charset=utf-8'
                                                },
                                                body: JSON.stringify({ itemArticul: item.articul, userLogin: user.name }),
                                            });
                                            setInCart(false);
                                        }
                                    }>убрать из корзины</a>
                            }
                        </div>
                            : <Message>Чтобы приобрести товар или добавить его в корзину, нужно войти в аккаунт.</Message>
                        }
                    </div>
                </div>

            </div>
        </>
    );
}

export default ItemPage;