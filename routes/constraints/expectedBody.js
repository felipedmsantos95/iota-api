module.exports = {
	CREATE_ADDRESS: {
		
	},

	TRANSACTION: {
		nurse: { presence: { allowEmpty: false, message: '^ Informe o nome do enfermeiro'}, type: 'string'},
		patient: { presence: { allowEmpty: false, message: '^ Informe o nome do paciente'}, type: 'string'},
		typeVaccine: { presence: { allowEmpty: false, message: '^ Informe o tipo da vacina'}, type: 'string'},
		batchVaccine: { presence: { allowEmpty: false, message: '^ Informe o lote da vacina'}, type: 'string'},
		hospital: { presence: { allowEmpty: false, message: '^ Informe o hosptal da aplicação'}, type: 'string'},
	},

	FIND_ALL: {

	}

}