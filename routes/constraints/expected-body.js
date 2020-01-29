module.exports = {
	CREATE_ADDRESS: {
		seed: { presence: { allowEmpty: false, message: '^ Digite o seguinte comando em um terminal baseado em unix para gerar um 81 tryte seed:' 
		+ '\' cat /dev/urandom |LC_ALL=C tr -dc \'A-Z9\' | fold -w 81 | head -n 1 \''
		+ ', após, cole saída gerada no corpo da requisição, no campo chamado \'seed\''
		 }, type: 'string'}
	},

	TRANSACTION: {
		nurse: { presence: { allowEmpty: false, message: '^ Informe o nome do enfermeiro'}, type: 'string'},
		nurseCpf: { presence: { allowEmpty: false, message: '^ Informe o CPF do enfermeiro'}, type: 'string'},
		patient: { presence: { allowEmpty: false, message: '^ Informe o nome do paciente'}, type: 'string'},
		patientCpf: { presence: { allowEmpty: false, message: '^ Informe o CPF do paciente'}, type: 'string'},
		typeVaccine: { presence: { allowEmpty: false, message: '^ Informe o tipo da vacina'}, type: 'string'},
		batchVaccine: { presence: { allowEmpty: false, message: '^ Informe o lote da vacina'}, type: 'string'},
		hospital: { presence: { allowEmpty: false, message: '^ Informe o hosptal da aplicação'}, type: 'string'},
	},

	FIND_ALL: {

	}

}