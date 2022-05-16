<?php
abstract class Product
{
	protected array $data = [];
	function __construct($data)
	{
		$this->data['sku'] = trim($data->sku);
		$this->data['name'] = trim($data->name);
		try {
			$this->data['price'] = (float)$data->price;
		} catch (Exception $e) {
			$this->data['price'] = -1;
		}
		$this->data['productType'] = trim($data->productType);
		$this->type = '';
	}

	public function get_data(): array
	{
		return $this->data;
	}

	public function validate(): bool
	{
		$d = $this->data;
		if (!$d['sku'] || !$d['name'] || $d['price'] <= 0 || $d['productType'] != $this->type)
			return false;
		return true;
	}
}
