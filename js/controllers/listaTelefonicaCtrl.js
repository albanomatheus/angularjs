app.controller("listaTelefonicaCtrl", function ($scope, $http) {
	$scope.app = "Lista Telefônica";

	$scope.contatos = [];
	$scope.operadoras = [];

	let carregarContatos = function () {
		$http.get("http://localhost:3000/contatos").then(function (res) {
			$scope.contatos = res.data;
		});
	}

	let carregarOperadoras = function () {
		$http.get("http://localhost:3000/operadoras").then(function (res) {
			$scope.operadoras = res.data;
		});
	}
	
	$scope.addContato = function (contato) {
		contato.data = new Date();

		$http.post("http://localhost:3000/contatos", contato).then(function (res) {
			if (res.data) {	
				delete $scope.contato;
				$scope.contatoForm.$setPristine();
				$scope.contatos.push(contato);	
			}
		});

	};
	
	$scope.apagarContatos = function (contatos) {
		$scope.deletarContatos = contatos.filter(function (contato) {
			if (contato.selecionado) 
				return contato;
		});

		console.log($scope.deletarContatos)

		$.ajax({
			url: "http://localhost:3000/contatos",
			type: "DELETE",
			data: JSON.stringify($scope.deletarContatos),
			contentType: "application/json",
			success: function (data) {
				console.log(data);
			},
			error: function (err) {
				console.log(err);
			}
		});
	}
	
	$scope.isSelecionado = function (contatos) {
		return contatos.some(function (contato) {
			return contato.selecionado;
		});
	}
	
	$scope.ordenarPor = function (campo) {
		$scope.criterioDeOrdenacao = campo;
		$scope.ordem = !$scope.ordem;
	}

	carregarContatos();
	carregarOperadoras();

});
