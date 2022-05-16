<?php
class Furniture extends Product
{
	function __construct($data)
	{
		parent::__construct($data);
		$this->type = 'furniture';
		try {
			$this->data['height'] = (float)$data->height;
			$this->data['width'] = (float)$data->width;
			$this->data['length'] = (float)$data->length;
		} catch (Exception $e) {
			$this->data['height'] = $this->data['width'] = $this->data['length'] = -1;
		}
	}

	public function validate(): bool
	{
		if (!parent::validate() || $this->data['height'] <= 0 || $this->data['width'] <= 0 || $this->data['length'] <= 0) {
			return false;
		}
		return true;
	}
}
