document.addEventListener("deviceready", onDeviceReady, false);
		function onDeviceReady() {
			
			var valorContagem = 50;
			$( "#assentos" ).html(valorContagem);			
			
		$('#botaoMais').click(function(){
		
			valorContagem += 1;
			$( "#assentos" ).html(valorContagem);

		})			
		
		$('#botaoMenos').click(function(){
		
			valorContagem -= 1;
			$( "#assentos" ).html(valorContagem);

		})
					
		var myDB = null;
				
	var i = 0;
	var buscaUsuario = 0;
	var rfidCartao = '';
	var passouPrimeira = 0;
			
	function buscaAtualizacao(){
				
		$("#atualiza").html('Buscando <i class="fa fa-cloud-download-alt"></i>');					
		
		$.ajax({
		type: 'POST',
		url: 'http://www.busonline.com.br/passageiros/ObterAtualizacoes',
			success: function (obj) {

				console.log(obj);
				console.log(obj.length);					
				if(obj.length != 0){
					
					//alert('entrou');
					$("#atualiza").html('Atualizando');					
					gravaDados(obj);
																				
				}else{					
					console.log('nenhum registro no array');
					$("#atualiza").html('Atualizado <i class="fa fa-check"></i>');
					if(passouPrimeira == 0){
						contaUsuarioPrimeira();	
					}
					buscando();

				}				
				
			},			

			error: function (error) {
				console.log(error);
				$("#atualiza").html('Sem sinal <i class="fa fa-exclamation-circle"></i>');
				buscando();
			}

		})
				
	}
		
	buscaAtualizacao();
			

//////////////////////////////////////////////////////////////////////////////////////////////////////////////// grava dados			
			
			
	function buscando(){
		
		setTimeout(function(){
			buscaAtualizacao();				
		}, 10000);
		
	}
			
			
//////////////////////////////////////////////////////////////////////////////////////////////////////////////// grava dados						
			
			
	function contaUsuarioPrimeira(){
		
		myDB = window.sqlitePlugin.openDatabase({name: "controleAcesso.db", location: 'default', createFromLocation: 1, androidDatabaseProvider: 'system', androidLockWorkaround: 1});
			
		myDB.transaction(function(transaction) {
			transaction.executeSql('SELECT id FROM dados', [], function(tx, results) {
			totalUsuarios = results.rows.length;
			console.log(totalUsuarios);				
			$( "#quantUsuario" ).html(totalUsuarios);				
		});
		}, function(error) {
		  // OK to close here:
		  console.log('transaction error: ' + error.message);
		  myDB.close();
		}, function() {
		  // OK to close here:
		  console.log('conta usuario ok');
		  myDB.close(function() {
			  passouPrimeira = 1;
			//console.log('conta usuario closed ok');
		  });
		});
		
	}
						 
			
//////////////////////////////////////////////////////////////////////////////////////////////////////////////// grava dados			
	
	
			
	function gravaDados(obj){
			
		myDB = window.sqlitePlugin.openDatabase({name: "controleAcesso.db", location: 'default', createFromLocation: 1, androidDatabaseProvider: 'system', androidLockWorkaround: 1});	
		
				for (i = 0;  i < obj.length; i++) {
				
				rfidCartao = obj[i].Cartao;
				consultaRegistro(obj,rfidCartao,i);
				console.log(rfidCartao);
				console.log(i);	
										
			}				
								
	}
				
					
	function consultaRegistro(obj,rfidCartao,i){		
		
		myDB.transaction(function(transaction) {
				var executeQuery = "SELECT id FROM dados WHERE rfid=?";
				console.log(rfidCartao);
				console.log(i);					
				transaction.executeSql(executeQuery, [rfidCartao],
					////On Success					
					function(tx, result) {
						buscaUsuario = result.rows.length;
						console.log(buscaUsuario);						
					
						if(buscaUsuario == 0){							
							insertUsuario(obj,i);
						}else{
							updateUsuario(obj,i);							
						}					
					
					},
					////On Error
					function(error) {
						console.log(error);
						//alert('Something went Wrong');
					});
				});
		
	}
					
			
//////////////////////////////////////////////////////////////////////////////////////////////////////////////// confirma atualizacao					
	
	function insertUsuario(obj,i){		
			
		console.log('não achou usuario');
		console.log(i);
		var rfidCartao = obj[i].Cartao;
		var nomeUsuario = obj[i].Nome;						
		var statusUsuario = obj[i].Ativo;
		var statusUsuario1 = statusUsuario.toString();
		var fotoUsuario = obj[i].Foto;
		var condominio = obj[i].Condominio;
				
		myDB.transaction(function(transaction) {
		var executeQuery = "INSERT INTO dados (rfid, nome, condominio, foto, situacao) VALUES (?, ?, ?, ?, ?)";
		transaction.executeSql(executeQuery, [rfidCartao, nomeUsuario, condominio, fotoUsuario, statusUsuario1], function(tx, result) {
		console.log('Insert atualiza');
		confirmaAtualizacao();
		},
			function(error) {
				console.log('Error occurred');
			});
		});		
			
	}
			

//////////////////////////////////////////////////////////////////////////////////////////////////////////////// confirma atualizacao					
			
			
		function updateUsuario(obj,i){			
			
			console.log('achou usuario');										
			console.log(i);
					
			console.log(obj[i].Cartao);
			console.log(obj[i].Nome);
					
			var rfidCartao = obj[i].Cartao;
			var nomeUsuario = obj[i].Nome;					
			var statusUsuario = obj[i].Ativo;
			var statusUsuario1 = statusUsuario.toString();					
			var fotoUsuario = obj[i].Foto;
			var condominio = obj[i].Condominio;			
			
			myDB = window.sqlitePlugin.openDatabase({name: "controleAcesso.db", location: 'default', createFromLocation: 1, androidDatabaseProvider: 'system', androidLockWorkaround: 1});					
		
			myDB.transaction(function(transaction2) {
			var executeQuery = "UPDATE dados SET nome=?, condominio=?, foto=?, situacao=? WHERE rfid=?";
			transaction2.executeSql(executeQuery, [nomeUsuario, condominio, fotoUsuario, statusUsuario1, rfidCartao],
			////On Success
			function(tx, result) {
				console.log('Updated atualiza');
				confirmaAtualizacao();				
			},
			////On Error
			function(error) {
				console.log(error);
			});
		});
			
						
		}
			
			
			
//////////////////////////////////////////////////////////////////////////////////////////////////////////////// confirma atualizacao							
			
			
	function confirmaAtualizacao(){		
		
		$.ajax({
			type: 'POST',
			url: 'http://www.busonline.com.br/passageiros/ConfirmarAtualizacao',
			success: function (obj) {
							
				console.log('confirmado enviado');
				contaUsuario();
				$("#atualiza").html('Atualizado <i class="fa fa-check-double"></i>');	
					
			},			

			error: function (error) {

				console.log('erro confirmando');
				console.log(error);
						
			}

			})

		}
			
			
//////////////////////////////////////////////////////////////////////////////////////////////////////////////// conta usuarios do banco						
			
	function contaUsuario(){
		
		myDB = window.sqlitePlugin.openDatabase({name: "controleAcesso.db", location: 'default', createFromLocation: 1, androidDatabaseProvider: 'system', androidLockWorkaround: 1});
			
		myDB.transaction(function(transaction) {
			transaction.executeSql('SELECT id FROM dados', [], function(tx, results) {
			totalUsuarios = results.rows.length;				
			$( "#quantUsuario" ).html(totalUsuarios);
		});
		}, function(error) {
		  // OK to close here:
		  console.log('transaction error: ' + error.message);
		  //myDB.close();
		}, function() {
		  // OK to close here:
		  console.log('conta usuario ok');
		  //myDB.close(function() {
			//console.log('conta usuario closed ok');
		  //});
		});
		
		setTimeout(function(){
			buscaAtualizacao();				
		}, 10000);
		
	}
			
	//contaUsuario();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
			
			
	webserver.onRequest(
	function(request) {
		//console.log(request.body);
		
		if(request.body == 'saida'){
			
			somOk();			
			valorContagem += 1;
			$( "#assentos" ).html(valorContagem);
			
		}else{
			
		console.log('entrou request');
		
		myDB = window.sqlitePlugin.openDatabase({name: "controleAcesso.db", location: 'default', createFromLocation: 1, androidDatabaseProvider: 'system', androidLockWorkaround: 1});
	
		$( "#numTelaRfid" ).html(request.body.toUpperCase());
		var valor = request.body.toUpperCase();
		leRfid(valor);
			
		webserver.sendResponse(
			request.requestId,
			{
				status: 200,
				body: '<html>Hello World</html>',
				headers: {
					'Content-Type': 'text/html'
				}
			}
		);
		
	 }		
		
	}
);

webserver.start();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

			
	$('#logoTela').click(function(){
		
		navigator.notification.confirm(
		'Apagar DB?', // message
		 apagaBanco,            // callback to invoke with index of button pressed
		'Deletar',           // title
		['Não','Sim']     // buttonLabels
	);
		
						
	})			
						
	function apagaBanco(buttonIndex){
		
		//alert(buttonIndex);
		if(buttonIndex == 2){
			
		window.sqlitePlugin.deleteDatabase({name: 'controleAcesso.db', location: 'default'}, successcb, errorcb);
		function successcb(){
				
			alert('DB apagado com sucesso');
		}
		function errorcb(){
				
			alert('erro ao apagar DB');
		}
			
		myDB = window.sqlitePlugin.openDatabase({name: "controleAcesso.db", location: 'default', createFromLocation: 1, androidDatabaseProvider: 'system', androidLockWorkaround: 1});
		
		myDB.transaction(function(tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS dados (id integer primary key autoincrement, rfid varchar(50), nome varchar(100), condominio varchar(250), foto text, situacao varchar(5))');				
				 
		}, function(error) {
				console.log('Transaction ERROR: ' + error.message);
				//myDB.close();
			}, function() {
				console.log('Populated database OK');
				alert('Populated database OK');
				//myDB.close();
			});
		
			
			
			
			
		}
		
	}
			
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
			
var valorRfid = [];
			
function leRfid(valor){
	
	console.log('entrou leRfid');
	console.log(valor);	
	
	myDB.transaction(function(transaction) {
		transaction.executeSql('SELECT * FROM dados WHERE rfid=?', [valor], function(tx, results) {
		var len = results.rows.length;
			console.log(len);
			
			if(len == 0){ // cartao nao existe				

				somNo();				
				
				montaTelaErro = '<div id="box-image" style="background-image:url(images/x04.fw.png); margin-top:30px;"><div id="box-denied" style="width:100%; height:400px; border-radius:10%; background-color: rgba(255, 44, 44, 0.3);"></div></div><div id="message-user"><span style="font-size:1.4em; margin-top:30px;">Cartão Inválido</span><span style="font-size:1.1em; margin-top:-10px;">Não cadastrado</span></div></br><i class="far fa-times-circle" style="font-size:4em;"></i>';
								
				retornaTela = '<div id="number"><span style="font-size:0.5em; padding-top:20px;">Linha</span><span style="font-size:1em; padding-top:20px;">Barra X Centro</span><span style="font-size:0.5em; padding-top:10px;">Via Alto da Boa Vista</span></div><div id="box"><div id="assentos" style="font-size:8em; padding-top:30px;"></div><div style="font-size:1em;">assentos</div><div style="font-size:1em;">disponíveis</div></div><div id="message" style="margin-top:40px;"><div id="tela2"><span style="font-size:1.5em;">passe seu cartão</span></div><div id="tela3"><i class="fa fa-chevron-down" aria-hidden="true" style="font-size:4em;"></i></div></div>';


					$( "#dentro" ).html( montaTelaErro );
					$( "#botaoMais" ).hide();
					$( "#botaoMenos" ).hide();					

					setTimeout(function(){	
						$( "#dentro" ).html( retornaTela );
						$( "#botaoMais" ).show();
						$( "#botaoMenos" ).show();						
						$( "#assentos" ).html(valorContagem);
						closeDB();
					}, 3000);
					
				
			}else{
				
				if(results.rows.item(0).situacao == 'true'){ // cartao liberado
					
					somOk();					
					
					var nome = results.rows.item(0)['nome'];
					var condominio = results.rows.item(0)['condominio'];
					var foto = results.rows.item(0)['foto'];
					var situacao = results.rows.item(0)['situacao'];

					//alert(nome);

					//audioOk.play();

					montaTela = '<div id="box-image" style="background-image:url(data:image/jpg;base64,'+foto+'); margin-top:30px;"></div><div id="message-user"><span style="font-size:1.4em; margin-top:30px;">'+nome+'</span><span style="font-size:1em; margin-top:-10px;"><i class="fas fa-hotel" style="font-size:1em;"></i>&nbsp;'+condominio+'</span></div></br><i class="far fa-check-circle" style="font-size:4em;"></i>';

					retornaTela = '<div id="number"><span style="font-size:0.5em; padding-top:20px;">Linha</span><span style="font-size:1em; padding-top:20px;">Barra X Centro</span><span style="font-size:0.5em; padding-top:10px;">Via Alto da Boa Vista</span></div><div id="box"><div id="assentos" style="font-size:8em; padding-top:30px;"></div><div style="font-size:1em;">assentos</div><div style="font-size:1em;">disponíveis</div></div><div id="message" style="margin-top:40px;"><div id="tela2"><span style="font-size:1.5em;">passe seu cartão</span></div><div id="tela3"><i class="fa fa-chevron-down" aria-hidden="true" style="font-size:4em;"></i></div></div>';

					$( "#dentro" ).html( montaTela );
					$( "#botaoMais" ).hide();
					$( "#botaoMenos" ).hide();
										
					
					console.log('final leRfid');

					setTimeout(function(){	
						$( "#dentro" ).html( retornaTela );
						$( "#botaoMais" ).show();
						$( "#botaoMenos" ).show();
						
										
					valorRfid.unshift(valor);
					
						if(valorRfid.length >= 2){
							rfidAtual = valorRfid[0];
							rfidAntigo = valorRfid[1];
							
							if(rfidAtual != rfidAntigo){
								
								valorContagem -= 1;
								valorRfid.pop();
								
							}
						}else{
							
							valorContagem -= 1;
						}
									

						$( "#assentos" ).html(valorContagem);
						closeDB();

					}, 3000);
															
					
					
				}else{ // cartao bloqueado
					
					somNo();
					
					var nome = results.rows.item(0)['nome'];
					var condominio = results.rows.item(0)['condominio'];
					var foto = results.rows.item(0)['foto'];
					var situacao = results.rows.item(0)['situacao'];
					
					//audioErro.play();
							
					//alert('bloqueado');

					montaTelaErro = '<div id="box-image" style="background-image:url(data:image/jpg;base64,'+foto+'); margin-top:30px;"><div id="box-denied" style="width:100%; height:400px; border-radius:10%; background-color: rgba(255, 44, 44, 0.5);"></div></div><div id="message-user"><span style="font-size:1.4em; margin-top:30px;">'+nome+'</span><span style="font-size:1em; margin-top:-10px;"><i class="fas fa-hotel" style="font-size:1em;"></i>&nbsp;'+condominio+'</span></div></br><i class="far fa-times-circle" style="font-size:4em;"></i>';
										
					retornaTela = '<div id="number"><span style="font-size:0.5em; padding-top:20px;">Linha</span><span style="font-size:1em; padding-top:20px;">Barra X Centro</span><span style="font-size:0.5em; padding-top:10px;">Via Alto da Boa Vista</span></div><div id="box"><div id="assentos" style="font-size:8em; padding-top:30px;"></div><div style="font-size:1em;">assentos</div><div style="font-size:1em;">disponíveis</div></div><div id="message" style="margin-top:40px;"><div id="tela2"><span style="font-size:1.5em;">passe seu cartão</span></div><div id="tela3"><i class="fa fa-chevron-down" aria-hidden="true" style="font-size:4em;"></i></div></div>';


					$( "#dentro" ).html( montaTelaErro );
					$( "#botaoMais" ).hide();
					$( "#botaoMenos" ).hide();
										

					setTimeout(function(){	
						$( "#dentro" ).html( retornaTela );
						$( "#botaoMais" ).show();
						$( "#botaoMenos" ).show();						
						$( "#assentos" ).html(valorContagem);
						closeDB();
					}, 3000);									
					
				}				
				
			}
			
			//closeDB();
		
				
	}, null);
});
	
}	
	
			
/////////////////////////////////////////////////////////////////////////////////////////

			
function somOk() {
    
    var my_media = new Media("/android_asset/www/sounds/beepOk.m4a",        
        function () {
            console.log("playAudio():Audio Success");
        },        
        function (err) {
            console.log("playAudio():Audio Error: " + err);
        }
    );    
    my_media.play();
}
				
						
/////////////////////////////////////////////////////////////////////////////////////////
			
			
function somNo() {
    
    var my_media = new Media("/android_asset/www/sounds/beepErro.m4a",        
        function () {
            console.log("playAudio():Audio Success");
        },        
        function (err) {
            console.log("playAudio():Audio Error: " + err);
        }
    );    
    my_media.play();
}
				
						
/////////////////////////////////////////////////////////////////////////////////////////
			
			
function closeDB() {
    myDB.close(function () {
        console.log("DB closed!");
    }, function (error) {
        console.log("Error closing DB:" + error.message);
    });
}
			
/////////////////////////////////////////////////////////////////////////////////////////
			
function cartaoInvalido(){
	
	
	montaTelaErro = '<div id="box-image" style="background-image:url(data:image/jpg;base64,'+foto+'); margin-top:30px;"><div id="box-denied" style="width:100%; height:400px; border-radius:10%; background-color: rgba(255, 44, 44, 0.5);"></div></div><div id="message-user"><span style="font-size:1.2em; margin-top:30px;">'+nome+'</span><span style="font-size:1em; margin-top:-10px;">'+condominio+'<br>bloco 5 - apt. 304</span></div><div id="seta" style="width:100%; font-size:4em; margin-top:5px;"><i class="fa fa-times-circle-o" aria-hidden="true"></i></div>';

	retornaTela = '<div id="number"><span style="font-size:0.5em; padding-top:20px;">Linha</span><span style="font-size:1em; padding-top:20px;">Barra X Centro</span><span style="font-size:0.5em; padding-top:10px;">Via Alto da Boa Vista</span></div><div id="box"><div id="assentos" style="font-size:8em; padding-top:30px;"></div><div style="font-size:1em;">assentos</div><div style="font-size:1em;">disponíveis</div></div><div id="message" style="margin-top:40px;"><div id="tela2"><span style="font-size:1.5em;">passe seu cartão</span></div><div id="tela3"><i class="fa fa-chevron-down" aria-hidden="true" style="font-size:4em;"></i></div></div>';


	$( "#dentro" ).html( montaTelaErro );

	setTimeout(function(){	
		$( "#dentro" ).html( retornaTela );
		$( "#assentos" ).html(valorContagem);
	}, 3000);

	
}
			

/////////////////////////////////////////////////////////////////////////////////////////
			

/////////////////////////////////////////////////////////////////////////////////////////
			
			
/////////////////////////////////////////////////////////////////////////////////////////
		
			
function criaData(){ 
    var data = new Date();
    var dia = data.getDate();
    if (dia.toString().length == 1)
      dia = "0"+dia;
    var mes = data.getMonth()+1;
    if (mes.toString().length == 1)
      mes = "0"+mes;
    var ano = data.getFullYear();  
    var dataFormat = dia+"/"+mes+"/"+ano;

$('.date').html('<i class="fa fa-calendar-alt" aria-hidden="true"></i>&nbsp;'+dataFormat);

}

criaData();

//////////////////////////////////////////////////////////////////////////////////////////

function moveRelogio(){ 
   	momentoAtual = new Date(); 
   	hora = momentoAtual.getHours(); 
   	minuto = momentoAtual.getMinutes(); 
   	segundo = momentoAtual.getSeconds();
	
	if(hora < 10){
		
	hora1 = '0'+hora;
	}else{
	hora1 = hora;	
	}
	
	if(minuto < 10){
		
	minuto1 = '0'+minuto;
	}else{
	minuto1 = minuto;	
	} 

   	horaImprimivel = hora1 + ":" + minuto1; 

	$('.time').html('<i class="fa fa-clock" aria-hidden="true"></i>&nbsp;'+horaImprimivel);
		
	setTimeout(function(){	
		moveRelogio();
	}, 1000);
		
} 

moveRelogio();

/////////////////////////////////////////////////////////////////////////////////////////

		
}


//0777991266
//0423595804
//0777597554
	