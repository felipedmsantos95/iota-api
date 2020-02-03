module.exports = {
	CREATE_ADDRESS: {
		seed: { type: 'string' }
	},

	//To use in Logvacinas app example, this is a practical aplication
	LOGVACINAS_APP_TRANSACTION: {
		nurse: { presence: { allowEmpty: false, message: '^ Informe o nome do enfermeiro'}, type: 'string'},
		nurseCpf: { presence: { allowEmpty: false, message: '^ Informe o CPF do enfermeiro'}, type: 'string'},
		patient: { presence: { allowEmpty: false, message: '^ Informe o nome do paciente'}, type: 'string'},
		patientCpf: { presence: { allowEmpty: false, message: '^ Informe o CPF do paciente'}, type: 'string'},
		typeVaccine: { presence: { allowEmpty: false, message: '^ Informe o tipo da vacina'}, type: 'string'},
		batchVaccine: { presence: { allowEmpty: false, message: '^ Informe o lote da vacina'}, type: 'string'},
		hospital: { presence: { allowEmpty: false, message: '^ Informe o hosptal da aplicação'}, type: 'string'},
	},

	TRANSACTION:{

	},

	FIND_ALL: {
		address: { type: 'string' }
	}

}