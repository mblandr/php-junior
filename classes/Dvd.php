<?php
class Dvd extends Product
{
	function __construct($data)
	{
		parent::__construct($data);
		$this->type = 'dvd';
		try {
			$this->data['size'] = (float)$data->size;
		} catch (Exception $e) {
			$this->data['size'] = -1;
		}
	}

	public function validate(): bool
	{
		if (!parent::validate() || $this->data['size'] <= 0) {
			return false;
		}
		return true;
	}
}
