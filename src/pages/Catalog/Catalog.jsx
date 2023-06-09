import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Catalog.module.css";

import { jsonCategories, jsonList } from "./items";

const Catalog = (props) => {
	let [list, setList] = useState([]);
	let [categories, setCategories] = useState({});
	let [filters, setFilters] = useState(useLocation()?.state?.filters ? useLocation()?.state?.filters : {});
	let [inputSearch, setInputSearch] = useState('');
	let [priceFilter, setPriceFilter] = useState(0);

	useEffect(() => {
		fetch('http://localhost:3000/all_items').then((response) => {
			return response.json();
		}).then((data) => {
			setList(data);
		});

		fetch('http://localhost:3000/all_category').then((response) => {
			return response.json();
		}).then((data) => {
			setCategories(data);
		});

	}, [])

	document.title = props.PageTitle;

	let items = list.filter(item => {			//FILTER ITEMS DISPLAY
		let matchingTags = true;
		for (let categoryName of Object.keys(filters)) {
			if (!(Object.keys(item).includes(categoryName) && item[categoryName] === filters[categoryName])) { matchingTags = false }
		}
		return ((matchingTags) && (item.price <= priceFilter || priceFilter == 0) && ((item.name.slice(0, inputSearch.trim().length).toLowerCase() === inputSearch.trim().toLowerCase()) || (inputSearch.trim() === '')));
	})

	let maxPrice = Math.max(...[...(() => {
		let prices = [];
		list.forEach((elem) => {
			prices.push(elem.price + 50)
		})
		return prices;
	})()])

	return (
		<>
			<section className={styles.Catalog}>
				<div style={{
					display: 'flex',
					gap: '1.8rem',
					padding: '0 0 2rem 0',
				}} className="container">

					<div id="editTags" className={styles.EditTags}>

						<input type="text" value={inputSearch} onChange={() => setInputSearch(event.target.value)} className={styles.NameSeach} />

						<hr />

						<p>price: <h2>{priceFilter != 0 ? `max ${priceFilter}$` : 'any price'}</h2></p>
						<input type="range" max={`${maxPrice}`} value={priceFilter} onChange={() => setPriceFilter(event.target.value)} min={0} step={50}></input>

						<hr />

						{/* MAPPING CATEGORIES SELECTS */}
						{(Object.keys(filters).length !== 0 || inputSearch || priceFilter != 0) &&
							<><button className={styles.resetsButton} onClick={() => { setFilters({}); setInputSearch(''); setPriceFilter(0); }}>Clear all filters</button><hr /></>}


						{Object.keys(categories).map((categoryName, i) => {
							return <>
								<p key={`p-${i}`}>{categoryName}:</p>
								<select
									name={categoryName}
									key={i}
									className={`${styles.filters} ${Object.keys(filters).includes(categoryName) && styles.activeFilter}`}
									value={Object.keys(filters).includes(categoryName) ? filters[categoryName] : 'any'}
									onChange={(event) => {
										let filterObject = { ...filters };
										delete filterObject[categoryName];
										(event.target.value !== 'any') ?
											setFilters({ ...filters, [categoryName]: event.target.value })
											: setFilters(filterObject);
									}}>

									<option value='any'>any</option>

									{categories[categoryName].map((value, j) => {
										return <option key={j}>{value}</option>;
									})}

								</select>
							</>;
						})}

					</div>

					<div className={styles.items}>			{/* MAPPING PRODUCT_ITEMS  */}
						{items.map((item) => {
							return (
								<Link to={`/item/${item.articul}`} className={styles.item} key={item.id} onClick={(event) => {
									// event.preventDefault();
								}}>

									<img src={`/itemImages/` + `${item.articul}` + `.jpg`} alt={`Изображение либо отсутствует, либо произошла ошибка при его загрузке.`} />
									{/* <img src={`/itemImages/${item.articul}`} alt={`Изображение либо отсутствует, либо произошла ошибка при его загрузке.`}/> */}
									<h1>{item.name}</h1>
									<h3>{item.articul}</h3>

									<h2 style={{ color: 'rgb(200, 140, 70)', }}>{item.price}$</h2>

									{/* <svg className={styles.basket} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 4H5.62563C6.193 4 6.47669 4 6.70214 4.12433C6.79511 4.17561 6.87933 4.24136 6.95162 4.31912C7.12692 4.50769 7.19573 4.7829 7.33333 5.33333L7.51493 6.05972C7.616 6.46402 7.66654 6.66617 7.74455 6.83576C8.01534 7.42449 8.5546 7.84553 9.19144 7.96546C9.37488 8 9.58326 8 10 8V8" stroke="#f2f3f4" strokeWidth="2" strokeLinecap="round"></path> <path d="M18 17H7.55091C7.40471 17 7.33162 17 7.27616 16.9938C6.68857 16.928 6.28605 16.3695 6.40945 15.7913C6.42109 15.7367 6.44421 15.6674 6.49044 15.5287V15.5287C6.54177 15.3747 6.56743 15.2977 6.59579 15.2298C6.88607 14.5342 7.54277 14.0608 8.29448 14.0054C8.3679 14 8.44906 14 8.61137 14H14" stroke="#f2f3f4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14.5279 14H10.9743C9.75838 14 9.15042 14 8.68147 13.7246C8.48343 13.6083 8.30689 13.4588 8.15961 13.2825C7.81087 12.8652 7.71092 12.2655 7.51103 11.0662C7.30849 9.85093 7.20722 9.2433 7.44763 8.79324C7.54799 8.60536 7.68722 8.44101 7.85604 8.31113C8.26045 8 8.87646 8 10.1085 8H16.7639C18.2143 8 18.9395 8 19.2326 8.47427C19.5257 8.94854 19.2014 9.59717 18.5528 10.8944L18.1056 11.7889C17.5677 12.8647 17.2987 13.4026 16.8154 13.7013C16.3321 14 15.7307 14 14.5279 14Z" stroke="#f2f3f4" strokeWidth="2" strokeLinecap="round"></path> <circle cx="17" cy="20" r="1" fill="#f2f3f4"></circle> <circle cx="9" cy="20" r="1" fill="#f2f3f4"></circle> </g></svg> */}

								</Link>
							)
						})}
					</div>

				</div>
			</section>
		</>
	);
}

export default Catalog;