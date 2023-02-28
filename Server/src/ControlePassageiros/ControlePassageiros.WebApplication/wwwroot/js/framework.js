framework = {
    redirect: function (rota) {
        var url = 'http://' + window.location.host + '/' + rota;
        window.location.replace(url);
    },

    validarForm: function (seletor) {
        var form = $(seletor);
        $.validator.unobtrusive.parseDynamicContent(seletor);
        return form.valid();
    },

    submeterForm: function (seletor, url, callback) {
        if (framework.validarForm(seletor)) {
            var form = $(seletor);
            var dados = form.serialize();

            if (!url)
                url = form.attr('action');

            $.ajax({
                url: url,
                type: 'POST',
                data: dados,
                error: function (jqXHR, textStatus, errorThrown) {
                    $.notifyError(jqXHR.responseText);
                }
            }).done(function (response) {
                if (callback)
                    callback(response);
            });
        }
        else {
            if (callback)
                callback({ success: false, message: 'Existem dados inválidos ou não preenchidos' });
        }
    },

    submeterFormData: function (seletor, url, callback) {
        var form = $(seletor);
        var dados = form.serialize();

        if (!url)
            url = form.attr('action');

        $.ajax({
            url: url,
            type: 'POST',
            data: dados,
            processData: false,
            contentType: false,
            error: function (jqXHR, textStatus, errorThrown) {
                $.notifyError(jqXHR.responseText);
            }
            //statusCode: {
            //    401: function (response) {
            //        $.notifyWarning(response.responseText);
            //    },
            //    403: function (response) {
            //        $.notifyWarning(response.responseText);
            //    },
            //    404: function (response) {
            //        $.notifyError(response.responseText);
            //    },
            //    500: function (response) {
            //        $.notifyError('Ocorreu um erro ao realizar a operação.');
            //    }
            //}
        }).done(function (response) {
            if (callback)
                callback(response);
        });
    },

    requisicao: function (options, callback) {
        $.ajax({
            url: options.url,
            type: options.type,
            data: options.dados,
            error: function (jqXHR, textStatus, errorThrown) {
                $.notifyError(jqXHR.responseText);
            }
        }).done(function (response) {
            if (callback)
                callback(response);
        });
    },

    carregarGrid: function (options) {

        $('#gridDados').DataTable({
            language: { "url": "/js/datatables/portuguese-brasil.json" },
            processing: false,
            serverSide: true,
            sDom: "<'row'<'col-md-3'l><'col-md-5 text-right'B><'col-md-4'f>><'row'<'col-md-12'tr>><'row'<'col-md-5'i><'col-md-7'p>>",
            buttons: [
                {
                    extend: 'print',
                    text: 'Imprimir',
                    exportOptions: {
                        modifier: {
                            selected: null
                        },
                        columns: 'th:not(:last-child)'
                    }
                },
                {
                    extend: 'excelHtml5',
                    text: 'Excel',
                    exportOptions: {
                        modifier: {
                            selected: null
                        },
                        columns: 'th:not(:last-child)'
                    }
                },
                /*'excelHtml5',*/
                /*'pdfHtml5'*/
            ],
            sPaginationType: "full_numbers",
            iDisplayLength: 10,
            lengthMenu: [[10, 50, 100], [10, 50, 100]],
            bDestroy: true,
            searchDelay: 200,
            autoWidth: false,
            ajax: {
                type: "POST",
                url: options.url,
                data: function (d) {
                    _jsonDataTables = JSON.stringify(d);
                    _jsonFiltro = JSON.stringify(options.filtro);

                    return { jsonDataTables: _jsonDataTables, jsonFiltro: _jsonFiltro };
                },
                complete: function () {
                    $('#pnlConteudo').removeClass('d-none');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $('#pnlConteudo').addClass('d-none');
                    $.notifyError(jqXHR.responseText);
                }
            },
            columns: options.colunas,
            order: [[1, 'asc']],
        });
    },

    valorValido: function (valor) {
        return (typeof (valor) !== 'undefined' && valor !== null && valor !== '');
    },

    getDateTimeNow: function () {
        var now = new Date();
        var dia = (("0" + now.getDate().toString()).substr(-2));
        var mes = (("0" + (now.getMonth() + 1).toString()).substr(-2));

        return (dia + '/' + mes + '/' + now.getFullYear() + " " + now.getHours() + ':'
            + ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + ':' + ((now.getSeconds() < 10) ? ("0" + now
                .getSeconds()) : (now.getSeconds())));
    },

    getDateNow: function () {
        var now = new Date();
        var dia = (("0" + now.getDate().toString()).substr(-2));
        var mes = (("0" + (now.getMonth() + 1).toString()).substr(-2));

        return (dia + '/' + mes + '/' + now.getFullYear());
    },

    abrirModalSmall: function (url, title, arrayBotoes, modalId) {
        framework.abrirModal(url, title, 'small', arrayBotoes, modalId);
    },

    abrirModalMedium: function (url, title, arrayBotoes, modalId) {
        framework.abrirModal(url, title, 'medium', arrayBotoes, modalId);
    },

    abrirModalLarge: function (url, title, arrayBotoes, modalId) {
        framework.abrirModal(url, title, 'large', arrayBotoes, modalId);
    },

    abrirModal: function (url, title, typeSize, arrayBotoes, modalId) {
        const modalNome = framework.valorValido(modalId) ? modalId : '_modal';

        $('#' + modalNome + '_body').load(url, function () {
            framework.configurarModal(title, typeSize, modalId);

            if (framework.valorValido(arrayBotoes)) {

                for (var i = 0; i < arrayBotoes.length; i++) {
                    $('#' + arrayBotoes[i]).removeClass('d-none');
                }
            }

            $('#' + modalNome).modal('show');
        });
    },

    carregarModalSmall: function (data, title, arrayBotoes, modalId) {
        framework.carregarModal(data, title, 'small', arrayBotoes, modalId);
    },

    carregarModalMedium: function (data, title, arrayBotoes, modalId) {
        framework.carregarModal(data, title, 'medium', arrayBotoes, modalId);
    },

    carregarModalLarge: function (data, title, arrayBotoes, modalId) {
        framework.carregarModal(data, title, 'large', arrayBotoes, modalId);
    },

    carregarModal: function (data, title, typeSize, arrayBotoes, modalId) {
        const modalNome = framework.valorValido(modalId) ? modalId : '_modal';

        $('#' + modalNome + '_body').html(data);
        framework.configurarModal(title, typeSize, modalId);

        if (framework.valorValido(arrayBotoes)) {

            for (var i = 0; i < arrayBotoes.length; i++) {
                $('#' + arrayBotoes[i]).removeClass('d-none');
            }
        }

        $('#' + modalNome).modal('show');
    },

    configurarModal: function (title, typeSize, modalId) {
        const modalNome = framework.valorValido(modalId) ? modalId : '_modal';

        $('#' + modalNome + '_title').text(title);

        $('#' + modalNome + '_dialog').removeClass('modal-bol-sm');
        $('#' + modalNome + '_dialog').removeClass('modal-bol-md');
        $('#' + modalNome + '_dialog').removeClass('modal-bol-lg');

        if (typeSize == 'small')
            $('#' + modalNome + '_dialog').addClass('modal-bol-sm');
        else if (typeSize == 'medium')
            $('#' + modalNome + '_dialog').addClass('modal-bol-md');
        else
            $('#' + modalNome + '_dialog').addClass('modal-bol-lg');
    },

    fecharModal: function (modalId, callback) {
        const modalNome = framework.valorValido(modalId) ? modalId : '_modal';
        $('#' + modalNome).modal('hide');

        if (callback) {
            callback();
        }
    },

    configurarDatePicker: function (element, minDate, maxDate) {
        let _minDate = framework.valorValido(minDate) ? minDate : new Date('1900-01-01');
        let _maxDate = framework.valorValido(maxDate) ? maxDate : new Date('2500-12-31');

        element.datetimepicker({
            format: 'DD/MM/YYYY',
            locale: 'pt-br',
            icons: {
                time: 'fa fa-clock-o',
                date: 'fa fa-calendar',
                up: "fa fa-chevron-circle-up",
                down: "fa fa-chevron-circle-down",
                next: 'fa fa-chevron-circle-right',
                previous: 'fa fa-chevron-circle-left',
                today: 'fa fa-dot-circle-o',
                clear: 'fa fa-trash',
                close: 'fa fa-times',
                leftArrow: 'fa fa-arrow-left',
                rightArrow: 'fa fa-arrow-right'
            },
            widgetPositioning: {
                vertical: 'bottom',
                horizontal: 'left'
            },
            minDate: _minDate,
            maxDate: _maxDate
        });
    },

    configurarTimePicker: function (element) {
        element.datetimepicker({
            format: 'HH:mm',
            locale: 'pt-br'
        });
    },

    aplicarMascara: function (sender, mascara) {
        $(document.getElementById(sender.id)).mask(mascara);
    },

    validarNumero: function (e, id) {
        var evt = (e) ? e : window.event;
        var charCode = (evt.keyCode) ? evt.keyCode : evt.which;

        if ($.inArray(charCode, [8, 9, 13, 27, 46]) === -1) { /*Backspace, Tab, Enter, Esc, Delete*/
            return (charCode >= 48 && charCode <= 57) || (charCode >= 96 && charCode <= 105) || (charCode == 110);
        }

        return true;
    },

    titleCase: function (str) {
        str = str.toLowerCase().split(' ');
        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
        }
        return str.join(' ');
    },

    obterDiasEntreDatas: function (dataInicial, dataFinal) {
        const diaInicial = dataInicial.split("/")[0];
        const mesInicial = dataInicial.split("/")[1];
        const anoInicial = dataInicial.split("/")[2];

        dataInicial = (anoInicial + '-' + ("0" + mesInicial).slice(-2) + '-' + ("0" + diaInicial).slice(-2));

        const diaFinal = dataFinal.split("/")[0];
        const mesFinal = dataFinal.split("/")[1];
        const anoFinal = dataFinal.split("/")[2];

        dataFinal = anoFinal + '-' + ("0" + mesFinal).slice(-2) + '-' + ("0" + diaFinal).slice(-2);

        const date1 = new Date(dataInicial);
        const date2 = new Date(dataFinal);
        const oneDay = 1000 * 60 * 60 * 24;
        const diffInTime = date2.getTime() - date1.getTime();
        const diffInDays = Math.round(diffInTime / oneDay);

        return diffInDays;
    },

    validarUploadImagem: function (_upload) {
        const fileUpload = _upload[0];
        const fileName = fileUpload.value;
        const idxDot = fileName.lastIndexOf(".") + 1;
        const extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (extFile == "jpg" || extFile == "jpeg") {
            return true;
        } else {
            $.notifyWarning('Somente imagens são permitidas.');
            return false;
        }
    },

    removerEspaco: function (element) {
        element.value = element.value.replace(/[\s\t\n]/g, "");
    },

    adicionarOpcaoCombo: function (value, text, element) {
        const item = {
            id: value,
            text: text.toUpperCase()
        };

        const opcao = new Option(item.text, item.id, false, false);
        element.append(opcao).trigger('change');
    },

    carregarCombo: function (element, listItem) {
        element.empty().trigger("change");

        const opcaoDefault = new Option('Selecione', '', false, false);
        element.append(opcaoDefault).trigger('change');


        $.each(listItem, function () {
            const opcao = new Option(this.text, this.value, false, false);
            element.append(opcao).trigger('change');
        });

        element.select2({ allowClear: true, placeholder: "Selecione", formatNoMatches: function () { return "Nenhum registro encontrado" }, language: "pt-BR" });
    },

    atualizarComboFiltro: function (_element, _url) {
        const options = {};
        options.url = _url;
        options.type = 'GET';

        framework.requisicao(options, function (_respose) {
            framework.carregarCombo(_element, _respose);
        });
    },

    configurarSelect2() {
        $(".seleciona-form").select2({ allowClear: true, placeholder: "Selecione", formatNoMatches: function () { return "Nenhum registro encontrado" }, language: "pt-BR" });
        $(".seleciona").select2({ allowClear: true, placeholder: "Selecione", formatNoMatches: function () { return "Nenhum registro encontrado" }, language: "pt-BR" });
    }
}

jQuery.notifyDefault = function (msg) {
    swal({
        text: msg,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-swall"
    }).catch(swal.noop)
};

jQuery.notifyInfo = function (msg) {
    swal({
        text: msg,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-info btn-swall"
    }).catch(swal.noop)
};

jQuery.notifySuccess = function (msg) {
    swal({
        text: msg,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success btn-swall"
    }).catch(swal.noop)
};

jQuery.notifyError = function (msg) {
    swal({
        text: msg,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-error btn-swall"
    }).catch(swal.noop)
};

jQuery.notifyWarning = function (msg) {
    swal({
        text: msg,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-warning btn-swall"
    }).catch(swal.noop)
};

jQuery.confirmation = function (options) {
    swal({
        type: 'question',
        text: options.mensagem,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonColor: '#17A2B8',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
    }).then((value) => {
        if (value) {
            options.callback();
        }
    }).catch(swal.noop);
};