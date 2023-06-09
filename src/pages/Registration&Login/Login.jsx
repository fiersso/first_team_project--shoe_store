import { AuthContext } from "../../providers/AuthProvider";
import { useContext, useState } from 'react';
import { Link, Navigate } from "react-router-dom";
import styles from './Registration&LoginPages.module.css';
import Message from "../../components/Message/Message";


const Login = (props) => {

    const { user, login } = useContext(AuthContext)

    document.title = props.PageTitle;

    if (user) {
        return <Navigate to='/' />
    }

    const buttonHeandler = (event) => {
        event.preventDefault();

        // if (name === 'admin' && password === '000') {
        //     login({ name: String(name), password: String(name) });
        //     return;
        // }

        if (name != '' && name.length >= 3 && password != '' && password.length >= 6) {
            fetch('http://127.0.0.1:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: String(name), password: String(password) }),
            }).then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data);
                if ('error' in data) {
                    setMessage(data.error);
                } else {
                    login(data);
                }
            }).catch(error => {
                setMessage('Пользователя с таким именем не существует.');
            });
        }
    }

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    let [message, setMessage] = useState('');

    return (
        <div className={styles.loginAndRegistrationPage}>

            <form className={styles.form}>
                <h1>Authentication</h1>
                <div className={styles.textInputs}>
                    <input type="text" value={name} onChange={event => setName(event.target.value)} />
                    <input type="password" value={password} onChange={event => setPassword(event.target.value)} />
                </div>
                <button onClick={buttonHeandler}>Login</button>
                <p>or <Link to='/Registration'>registration</Link></p>
                {(message !== '') && <Message>{message}</Message>}
            </form>
        </div>
    );
}

export default Login;