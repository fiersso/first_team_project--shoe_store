import { AuthContext } from '../../providers/AuthProvider'
import { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import LogoSectionImage from '../../assets/light_boot.png';
import styles from './HomePage.module.css';


const Home = (props) => {

	const { user, logout } = useContext(AuthContext)
	const navigate = useNavigate()

	document.title = props.PageTitle;

	return (
		<>
			<header className={styles.LogoScreen}>
				<div className="container">
					<div className={styles.LogoInfo}>
						<h1>Enjoy life</h1>
						<h2>by buying good shoes</h2>
						<button className={styles.GoShopping} onClick={() => { navigate('/catalog'); }}>To shopping</button>
						<button className={styles.SecondButton} onClick={() => { console.log('clicked'); }}>Try your luck</button>
					</div>
					<img src={LogoSectionImage} />
				</div>
			</header>

			<section className={styles.variations}>
				<div className='container'>
					<a onClick={() => {  navigate('/catalog', {state: {filters: {fors: 'мужское',} }})}} className={styles.man}>
						<h1>for<br/>men</h1>
					</a>
					<a onClick={() => {  navigate('/catalog', {state: {filters: {fors: 'детское',} }})}} className={styles.child}>
						<h1>for<br/>children</h1>
					</a>
					<a onClick={() => {  navigate('/catalog', {state: {filters: {fors: 'женское',} }}) }} className={styles.women}>
						<h1>for<br/>women</h1>
					</a>
				</div>
			</section>
		</>
	);
}

export default Home;