<?php
class ProductsManager
{

	private function return_error(string $err)
	{
		die(json_encode(
			['error' => $err]
		));
	}
	private function return_data($data)
	{
		die(json_encode(
			['data' => $data]
		));
	}
	private PDO $conn;
	function __construct($host, $dbname, $user, $password)
	{
		$opt = [
			PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
			PDO::ATTR_EMULATE_PREPARES   => false,
		];
		$dsn = "mysql:host=$host;dbname=$dbname;charset=utf8";
		try {
			$this->conn = new PDO($dsn, $user, $password, $opt);
		} catch (PDOException $e) {
			$this->return_error($e->getMessage());
		}
	}

	public function get_all()
	{
		$result = $this->conn->query('SELECT * FROM products');
		if ($result === false) {
			$this->return_error('Error loading products data');
		}
		$this->return_data($result->fetchAll());
	}
	public function add()
	{
		$data = json_decode(file_get_contents('php://input'));
		$product_type = $data->productType;

		$product_chooser = ['book' => 'Book', 'furniture' => 'Furniture', 'dvd' => 'Dvd'];
		if (!array_key_exists($product_type, $product_chooser)) {
			$this->return_error('Wrong product type ' . $product_type);
		}
		try {

			$product = new $product_chooser[$product_type]($data);
			$data = $product->get_data();
			$columns = implode(',', array_keys($data));
			$placeholders = '';
			$values = [];
			foreach ($data as $key => $value) {
				$placeholders .= ':' . $key . ',';
				$values[] = $value;
			}
			$placeholders = substr($placeholders, 0, strlen($placeholders) - 1);

			$statement = $this->conn->prepare('insert into products (' . $columns . ') values (' . $placeholders . ')');
			$result = $statement->execute($data);
		} catch (Exception $e) {
			$this->return_error($e->getMessage());
		}
		if (!$result) {
			$this->return_error($statement->errorInfo()[2]);
		}
		$this->return_data('success');
	}
	public function del()
	{
		$data = json_decode(file_get_contents('php://input'));
		if (count($data) == 0) {
			$this->return_error('Empty list to delete');
		}
		$placeholders = str_repeat('?, ',  count($data) - 1) . '?';

		try {
			$statement = $this->conn->prepare("delete from products  where sku in ($placeholders)");
			$result = $statement->execute($data);
		} catch (Exception $e) {
			$this->return_error($e->getMessage());
		}
		if (!$result) {
			$this->return_error($statement->errorInfo()[2]);
		}
		$this->return_data('success');
	}
}
