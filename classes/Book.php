<?php
class Book extends Product
{
	function __construct($data)
	{
		parent::__construct($data);
		$this->type = 'book';
		try {
			$this->data['weight'] = (float)$data->weight;
		} catch (Exception $e) {
			$this->data['weight'] = -1;
		}
	}

	public function validate(): bool
	{
		if (!parent::validate() || $this->data['weight'] <= 0) {
			return false;
		}
		return true;
	}
}
