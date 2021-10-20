$('#btn').on('click', () => {

    var nick = $(".nickname").val();
    var send_messages = $(".messages").val();
    if (nick != '' && send_messages != '') {

        $.ajax({
                type: 'POST',
                url: 'http://localhost:8080/api2',
                dataType: Json,
                data: { name: nick, messages: send_messages }
            })
            .done(function(data) {
                alert("Done");
            })

    }

});