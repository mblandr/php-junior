import Product from './Product'
export default function ProductsList(props) {	
	return <>
		{props.products.map(product => <Product {...product} key={product.sku} checkItem={props.checkItem} />)}
	</>
}
ProductsList.defaultProps = {
	products: [],
	checkItem: () => {
		console.log("checkItem don't passed to ProductsList")
	}
}
