export default function RowItem(props) {
	return <div className="form-row">
		<label htmlFor={props.id}>{props.title}</label>
		<div className="form-item">
			{props.error && <div className="error">{props.error}</div>}
			<input type="text" id={props.id} name={props.id} onChange={props.onChange} />
		</div>
	</div>
}
RowItem.defaultProps = {
	id: "",
	title: "<Not Set>",
	error: "",
	onChange: () => console.log("onChange doesn't passed in RowItem")

}