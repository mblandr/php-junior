export default function Product(props) {

	return <article className="product">
		<input type="checkbox" className="delete-checkbox" onClick={() => props.checkItem(props.sku)} />
		<div>{props.sku}</div>
		<h2>{props.name} {props.productType == 'dvd' && 'DISC'}</h2>
		<div>{props.price} $</div>
		{props.productType == 'dvd' && <div>Size: {props.size} MB</div>}
		{props.productType == 'book' && <div>Weight: {props.weight} KG</div>}
		{props.productType == 'furniture' && <div>Dimension: {props.height}x{props.width}x{props.length}</div>}
	</article>
}

Product.defaultProps = {
	checkItem: () => console.log('checkItem not passed to Product'),
	sku: '<Not Defined>',
	name: '<Not Defined>',
	price: 0,
	productType: 'dvd',
	weight: 0,
	size: 0,
	width: 0,
	length: 0,
	height: 0,

}