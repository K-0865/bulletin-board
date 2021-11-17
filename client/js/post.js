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
                window.location.reload();
            })


    }

});

$.getJSON('http://localhost:8080/api', (data) => {
    for (let i = 0; i < data.length; i++) {

        //console.log(`userid=${data[i][0]}, username=${data[i][1]},messages=${data[i][2]}`);
        $('.lists').append(format_get_board(data[i][0], data[i][1], data[i][2]));
        // console.log(format_get_board(data[i][0], data[i][1], data[i][2]))
    }

    // $('.delete').on('click', () => {
    //     //console.log($(this).attr('id'));
    //     console.log("asd")
    // });
    $(function(){
        //id = document.getElementsByClassName("delete")
        //var buttons = document.getElementsByTagName("button");
        delete_loop()
        edit()
    });
});


function format_get_board(id, name, messages) {
    var format = '<li class="card"><div class = "left" id = "mes';
    format += id;
    format += '">';
    format += messages;
    format += '</div> <div class = "right"><div class = "button-block"><button class = "edit" id = "edit'
    format += id;
    format += '"> 編集 </button> <button class = "delete" id = "del';
    format += id;
    format += '" onClick="f01()"> 削除 </button> </div> <p class="id"> ';
    format += id;
    format += ' </p><p class = "name" id = "name'
    format += id;
    format += '">'
    format += name
    format += '</p> </div> </li>'
    return format;
}

function edit(){
    var buttons = document.getElementsByClassName("edit")
    var buttonsCount = buttons.length;
    console.log(buttonsCount);
    for (var i = 0; i < buttonsCount; i += 1) {
        buttons[i].onclick = function(e) {
            id = this.id;
            user_id = id.replace('edit','');
            user_name_temp = "name"+user_id;
            messages_get_temp = "mes"+user_id;
            console.log(user_name_temp)
            user_name = document.getElementById(user_name_temp).textContent;
            messages_get = document.getElementById(messages_get_temp).textContent;
            
            user = window.prompt("ユーザー名を入力してください",user_name );
            message = window.prompt("message",messages_get );
            $.ajax({
                type: 'PUT',
                url: 'http://localhost:8080/api/edit',
                //dataType: 'json',
                data: { 'name': user, 'messages': message }
            })
            .done(function(data) {
                alert("Done");
                window.location.reload();
            })


        };

    }
}

function delete_loop(){
    var buttons = document.getElementsByClassName("delete")
    var buttonsCount = buttons.length;
    console.log(buttonsCount);
    for (var i = 0; i < buttonsCount; i += 1) {
        buttons[i].onclick = function(e) {
           id = this.id;
           id = id.replace('del','');
            
           $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/del",
            data: {"id": id,
                    "_method": "DELETE"} 
          })
          .done(function(data) {
            alert('DELETED');
            window.location.reload();
        })
        };

    }
}

