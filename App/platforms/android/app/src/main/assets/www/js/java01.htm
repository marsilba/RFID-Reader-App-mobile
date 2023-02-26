document.addEventListener("deviceready", onDeviceReady, false);
		function onDeviceReady() {
			
			var valorContagem = 50;
			//$( "#assentos" ).html(valorContagem);
			
			var myDB = window.sqlitePlugin.openDatabase({name: "controleAcesso.db", location: 'default'});
			
			//myDB.transaction(function(transaction) {
				//transaction.executeSql('CREATE TABLE IF NOT EXISTS dados (id integer primary key autoincrement, rfid varchar(50), nome varchar(100), condominio varchar(250), foto text, situacao varchar(5))', [],
				
				//transaction.executeSql('CREATE TABLE IF NOT EXISTS contagem (id integer primary key)', [],
									   
					//function(tx, result) {
						//alert("Table created successfully");
					//},
					//function(error) {
						//alert("Error occurred while creating the table.");
					//});
			//});
						
			//myDB.transaction(function(transaction) {
				//var executeQuery = "INSERT INTO dados (rfid, nome, condominio, foto, situacao) VALUES (?, ?, ?, ?, ?)";
				//transaction.executeSql(executeQuery, ['82125456456', 'Carla', 'Condomínio Barra Bali', 'f78545f4gf5d4greter86tr', 'b'], function(tx, result) {
						//alert('Inserted');
					//},
					//function(error) {
						//alert('Error occurred');
					//});
			//});
						
		
			
			myDB.transaction(function(transaction) {
			var executeQuery = "UPDATE dados SET rfid=?, nome=?, condominio=?, foto=?, situacao=? WHERE id=?";
			transaction.executeSql(executeQuery, ['0777991266', 'Arnaldo', 'Barra Golden', '/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABQAAD/4QNhaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9IkIyNTkxOEZGQkE2RjYxQUMwQUEyNzk3RUU4RTdBMTNFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjg3QUQzMjczMTMzMDExRTdCQzk0QTFBRkZBNjlCNDVGIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjg3QUQzMjcyMTMzMDExRTdCQzk0QTFBRkZBNjlCNDVGIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGRTdGMTE3NDA3MjA2ODExODIyQUZENTREMTA4RjEzQiIgc3RSZWY6ZG9jdW1lbnRJRD0iQjI1OTE4RkZCQTZGNjFBQzBBQTI3OTdFRThFN0ExM0UiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBh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', 'l', '1'],
				////On Success
				function(tx, result) {
					/alert('Updated successfully');
				},
				////On Error
				function(error) {
					alert('Something went Wrong');
				});
			});
			
			
			//myDB.transaction(function(transaction) {
			//var executeQuery = "UPDATE dados SET rfid=? WHERE id=?";
			//transaction.executeSql(executeQuery, ['0777991266', '3'],
				////On Success
				//function(tx, result) {
					//alert('Updated successfully');
				//},
				////On Error
				//function(error) {
					//alert('Something went Wrong');
				//});
			//});


				
			
			
			//myDB.transaction(function(transaction) {
			//transaction.executeSql('SELECT * FROM dados WHERE rfid=', [], function(tx, results) {
				//var len = results.rows.length,
					//i;
				//$("#rfid").append(len);
				//for (i = 0; i < len; i++) {
					//$("#lista").append("<tr><td>" + results.rows.item(i).id + " / </td><td>" + results.rows.item(i).rfid + " / </td><td>" + results.rows.item(i).nome + "</td></tr>");
					
					//$("#foto").attr('src', "data:image/jpg;base64," + results.rows.item(i).foto)
					
				//}
			//}, null);
		//});
			
			
		//$("#rfid").html(valorContagem);	
			
		webserver.onRequest(
			function(request) {
				if(request.body == "saida"){
					
					valorContagem -= 1;
					$("#rfid").html(valorContagem);
					
				}else{
					
								
					
					
					
					
					
					
//<preference name="KeyboardDisplayRequiresUserAction" value="false" />
var audioOk = new Audio('sounds/beepOk.m4a');
var audioErro = new Audio('sounds/beepErro.m4a');
var audioOk1 = new Audio('sounds/beepOk.m4a');



	if(valor == '0777991266'){ // homem
		
		audioOk.play();
		
		montaTela = '<div id="box-image" style="background-image:url(images/user.jpg); margin-top:120px;"></div><div id="message-user"><span style="font-size:3em; margin-top:30px;">Carlos M. Antunes</span><span style="font-size:2em;">Cond. Barra Village Lorem Ipsum<br>bloco 2 - apt. 1204</span></div><div id="seta" style="width:100%; font-size:8em; margin-top:5px;"><i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i></div>';
	
		$( "#dentro" ).load( montaTela );
		
		setTimeout(function(){	
			$( "#dentro" ).load( "index01.html" );
			
			valorContagem -= 1;
			
			$( "#assentos" ).html(valorContagem);
		
		}, 3000);
		
		
	}else{
		// erro
			
			audioErro.play();
		
		montaTelaErro = '<div id="box-image" style="background-image:url(images/user4.jpg); margin-top:120px;"><div id="box-denied" style="width:500px; height:500px; border-radius:10%; background-color: rgba(255, 44, 44, 0.5);"></div></div><div id="message-user"><span style="font-size:3em; margin-top:30px;">Ricardo Almeida</span><span style="font-size:2em;">Cond. Green Barra Village<br>bloco 5 - apt. 304</span></div><div id="seta" style="width:100%; font-size:8em; margin-top:5px;"><i class="fa fa-times-circle-o" aria-hidden="true"></i></div>';

			$( "#dentro" ).load( montaTelaErro );
			
			setTimeout(function(){	
				$( "#dentro" ).load( "index01.html" );
			}, 3000);
					

		}		
		

					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
				}
				
				//console.log(request.body);
				//$("#rfid").html('RFID: '+request.body);
				//console.log("O MA GAWD! This is the request: ", request);

				webserver.sendResponse(
					request.requestId,
					{
						status: 200,
						body: '<html>Ok</html>',
						headers: {
							'Content-Type': 'text/html'
						}
					}
				);
			}
		);

		webserver.start();

		//... after a long long time
		// stop the server
		//webserver.stop();
	
	
			
		
	


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

$('.date').html('<i class="fa fa-calendar" aria-hidden="true"></i>&nbsp;'+dataFormat);

//setTimeout(function(){	
	//	criaData();
	//}, 100);

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

	$('.time').html('<i class="fa fa-clock-o" aria-hidden="true"></i>&nbsp;'+horaImprimivel);
		
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
