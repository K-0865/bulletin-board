$('#btn').on('click', () => {

    var nick = $(".nickname").val();
    var send_messages = $(".messages").val();
    if (nick != '' && send_messages != '') {

        $.ajax({
                type: 'POST',
                url: 'http://localhost:8080/api',
                //dataType: 'json',
                data: { 'name': nick, 'messages': send_messages }
            })
            .done(function(data) {
                alert("Done");
            })


    }

});



$.getJSON('http://localhost:8080/api', (data) => {
    for (let i = 0; i < data.length; i++) {

        //console.log(`userid=${data[i][0]}, username=${data[i][1]},messages=${data[i][2]}`);
        $('.lists').append(format_get_board(data[i][0], data[i][1], data[i][2]));
        // console.log(format_get_board(data[i][0], data[i][1], data[i][2]))
    }

    $('.delete').on('click', () => {
        console.log($(this).attr('id'));

    });

});




function format_get_board(id, name, messages) {
    var format = '<li class="card"><div class = "left">';
    format += messages;
    format += '</div> <div class = "right"><div class = "button-block"><button class = "edit"> 編集 </button> <button class = "delete" id = "del';
    format += id;
    format += ' "> 削除 </button> </div> <p class="id"> ';
    format += id
    format += ' </p><p class = "name">'
    format += name
    format += '</p> </div> </li>'
    return format;
}