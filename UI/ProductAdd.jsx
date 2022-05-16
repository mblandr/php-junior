import { useState } from 'react'
import RowItem from './RowItem'
export default function ProductAdd(props) {
	const [state, setState] = useState({
		sku: '',
		name: '',
		price: '',
		productType: '',
		size: 0,
		height: 0,
		width: 0,
		length: 0,
		weight: 0,
		errors: {}
	})



	const handleChange = e => {
		const name = e.target.name;
		const value = e.target.value.trim();
		setState(state => ({ ...state, [name]: value }))

	}

	const handleSelect = (e) => {
		const value = e.target.value;
		setState(state => ({ ...state, productType: value, errors: { ...state.errors, type: '' } }))


	}

	const validateData = () => {
		const requireError = "Please sumbit required data"
		const validateError = "Please, provide the data of indicated type"
		const errors = {};
		let isValid = true;

		if (!state.sku) {
			isValid = false;
			errors["sku"] = requireError;
		} else if (state.sku.indexOf(' ') >= 0) {
			isValid = false;
			errors["sku"] = validateError;
		}
		if (!state.name) {
			isValid = false;
			errors["name"] = requireError;
		}
		if (!state.price) {
			isValid = false;
			errors["price"] = requireError;
		} else if (isNaN(parseFloat(state.price))) {
			isValid = false;
			errors["price"] = validateError;
		}

		if (state.productType == 'book') {
			if (!state.weight) {
				isValid = false;
				errors["weight"] = requireError;
			} else if (isNaN(parseFloat(state.weight))) {
				isValid = false;
				errors["weight"] = validateError;
			}
		}
		else if (state.productType == 'furniture') {
			if (!state.width) {
				isValid = false;
				errors["width"] = requireError;
			} else if (isNaN(parseFloat(state.width))) {
				isValid = width;
				errors["width"] = validateError;
			}
			if (!state.height) {
				isValid = false;
				errors["height"] = requireError;
			} else if (isNaN(parseFloat(state.height))) {
				isValid = height;
				errors["height"] = validateError;
			}
			if (!state.length) {
				isValid = false;
				errors["length"] = requireError;
			} else if (isNaN(parseFloat(state.length))) {
				isValid = false;
				errors["length"] = validateError;
			}
		}
		else if (state.productType == 'dvd') {
			if (!state.size) {
				isValid = false;
				errors["size"] = requireError;
			} else if (isNaN(parseFloat(state.size))) {
				isValid = false;
				errors["size"] = validateError;
			}
		}
		else {
			errors["type"] = requireError;
			isValid = false;
		}
		setState(state => ({ ...state, errors }))
		return isValid;
	}

	const saveProduct = (e) => {

		if (validateData()) {
			props.saveProduct(state)
		}

	}
	return <>
		<header className="header-main">
			<h1>Product Add</h1>
			<button className="btn btn-edit" onClick={saveProduct}>Save</button>
			<button className="btn btn-edit" onClick={props.cancel}>Cancel</button>

		</header>
		<main>



			<form id="product_form">
				<RowItem id="sku" title="SKU" error={state.errors && state.errors.sku} onChange={handleChange} />
				<RowItem id="name" title="Name" error={state.errors && state.errors.name} onChange={handleChange} />
				<RowItem id="price" title="Price ($)" error={state.errors && state.errors.price} onChange={handleChange} />
				<div className="form-row">
					<label htmlFor="productType">Type Switcher </label>
					{state.errors && state.errors.type && <div className='error'>{state.errors.type}</div>}
					<select id="productType" name="productType" onChange={handleSelect}>
						<option value=""></option>
						<option value="dvd">DVD</option>
						<option value="book">Book</option>
						<option value="furniture">Furniture</option>
					</select>
				</div>
				{state.productType == 'dvd' && <>
					<p className='item-descr'>Please, provide size </p>
					<RowItem id="size" title="Size (MB)" error={state.errors && state.errors.size} onChange={handleChange} />
				</>}
				{state.productType == 'furniture' && <>
					<p className='item-descr'>Please, provide dimensions</p>
					<RowItem id="height" title="Height (CM)" error={state.errors && state.errors.height} onChange={handleChange} />
					<RowItem id="width" title="Width (CM)" error={state.errors && state.errors.width} onChange={handleChange} />
					<RowItem id="length" title="Length (CM)" error={state.errors && state.errors.length} onChange={handleChange} />
				</>}
				{state.productType == 'book' && <>
					<p className='item-descr'>Please, provide weight</p>
					<RowItem id="weight" title="Weight (KG)" error={state.errors && state.errors.weight} onChange={handleChange} />
				</>
				}


			</form>
		</main>
	</>
}