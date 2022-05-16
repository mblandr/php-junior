import ProductsList from './ProductsList'
import ProductAdd from './ProductAdd'
import { useEffect, useState } from 'react'
// const serverUrl = 'http://task.test/';
const serverUrl = 'https://test.progulkipodnepru.dp.ua/';

import Loader from './Loader'
export default function App() {
	let checkedItems = []
	const [state, setState] = useState({
		isLoading: false,
		products: [],
		error: false,
		isAdding: false
	})

	const checkItem = sku => {
		if (checkedItems.includes(sku))
			checkedItems = checkedItems.filter(item => item == sku)
		else
			checkedItems.push(sku)
	}

	const massDelete = () => {
		document.title = "Product List"
		if (checkedItems.length) {
			setState(state => ({ ...state, isLoading: true, error: false }));
			fetch(`${serverUrl}app.php/del`, {
				method: 'POST',
				body: JSON.stringify(checkedItems),
				credentials: "include"
			})
				.then((res) => res.json()
				)
				.then((result) => {
					if (result.error)
						setState(state => ({ ...state, isLoading: false, error: result.error }))
					else {
						fetch(`${serverUrl}app.php`, {
							credentials: "include"
						})
							.then((res) => res.json()
							)
							.then((result) => {
								if (result.error)
									setState(state => ({ ...state, isLoading: false, error: result.error }))
								else
									setState(state => ({ ...state, isLoading: false, products: result.data }))
							})
					}

				}

				)
				.catch(error => setState(state => ({ ...state, isLoading: false, error: error.message })));
		}
	}

	const addProduct = () => {
		document.title = "Product Add"
		setState(state => ({ ...state, isAdding: true, error: false }));
	}

	const saveProduct = (product) => {
		setState(state => ({ ...state, error: false, isLoading: true }));
		fetch(`${serverUrl}app.php/add-product`, {
			method: 'POST',
			body: JSON.stringify(product),
			credentials: "include"
		})
			.then((res) => res.json()
			)
			.then((result) => {
				if (result.error)
					setState(state => ({ ...state, isAdding: false, isLoading: false, error: result.error }))
				else
					fetch(`${serverUrl}app.php`, {
						credentials: "include"
					})
						.then((res) => res.json()
						)
						.then((result) => {
							if (result.error)
								setState(state => ({ ...state, isLoading: false, isAdding: false, error: result.error }))
							else
								setState(state => ({ ...state, isLoading: false, isAdding: false, products: result.data }))
						})
			}

			)
			.catch(error => setState(state => ({ ...state, isAdding: false, isLoading: false, error: error.message })));

	}

	const cancel = () => {
		document.title = "Product List"
		setState(state => ({ ...state, error: false, isLoading: false, isAdding: false }));
	}


	useEffect(() => {
		setState({ isLoading: true, isAdding: false, error: false });
		fetch(`${serverUrl}app.php`, {
			credentials: "include"
		})
			.then((res) => res.json()
			)
			.then((result) => {
				if (result.error)
					setState({ isLoading: false, isAdding: false, error: result.error })
				else
					setState({
						isLoading: false, isAdding: false, products: result.data
					})
			})
			.catch(error => setState(state => ({ ...state, isAdding: false, isLoading: false, error: error.message })))
	}, [setState]);

	return <>
		{state.isLoading && <Loader />}
		{state.error && <div className="error">{state.error}</div>}
		{state.isAdding && <ProductAdd saveProduct={saveProduct} cancel={cancel} />}
		{!state.isAdding && <><header className="header-main">
			<h1>Product List</h1>
			<button id="add-product-btn" className="btn" onClick={addProduct}>Add</button>
			<button id="delete-product-btn" className="btn" onClick={massDelete}>Mass delete</button>

		</header>
			<main className="products-grid">
				<ProductsList products={state.products} checkItem={checkItem} />
			</main>
		</>
		}
		<footer className="footer-main">
			Scandiweb Test assignment
		</footer>

	</ >
}