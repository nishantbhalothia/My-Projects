
class ChatEngine{
    // we send the chatbox id, user email and user name to the constructor from home.ejs
    constructor(chatBoxId, userEmail , userName){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.userName = userName;

        this.socket = io.connect('http://localhost:5000');

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self = this;

        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');

            self.socket.emit('join_room', {
                user_email: self.userEmail,
                user_name: self.userName,
                chatroom: 'codeial'
            });

            self.socket.on('user_joined', function(data){
                console.log('a user joined', data);
            });
        });

        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();

            if(msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    user_name: self.userName,   
                    chatroom: 'codeial'
                });
            }
        });

        self.socket.on('receive_message', function(data){
            console.log('Received message data:', data);
            console.log('message received', data.message);

            let newMessage = $('<li>');

            let messageType = 'to-user';

            if(data.user_email == self.userEmail){
                messageType = 'by-user';
            }

            newMessage.append($('<p>', {
                'html': data.message
            },'</br>'));

            newMessage.append($('<sub>', {
                'html': data.user_name
            }));

            newMessage.addClass(messageType);

            if (data.user_email == self.userEmail) {
                // newMessage.addClass('new-message');
                $('#by-user-ul').append(newMessage);
            }else{
                $('#to-user-ul').append(newMessage);
            }

            // $('#chat-messages-list').append(newMessage);
        });
    }
}