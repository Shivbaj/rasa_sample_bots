var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

$(window).load(function() {
    $messages.mCustomScrollbar();
    setTimeout(function() {
        fakeMessage();
    }, 100);
});

function updateScrollbar() {
    $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
        scrollInertia: 10,
        timeout: 0
    });
}

function setDate() {
    d = new Date()
    if (m != d.getMinutes()) {
        m = d.getMinutes();
        $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
    }
}

function Speech(say) {
    if ('speechSynthesis' in window && talking) {
        var utterance = new SpeechSynthesisUtterance(say);
        //msg.voice = voices[10]; // Note: some voices don't support altering params
        //msg.voiceURI = 'native';
        //utterance.volume = 1; // 0 to 1
        //utterance.rate = 0.1; // 0.1 to 10
        //utterance.pitch = 1; //0 to 2
        //utterance.text = 'Hello World';
        //utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
    }
}

function voiceFeature() {

var recognition = new webkitSpeechRecognition();
		recognition.maxAlternatives  = 1;
		
			recognition.onresult = function(event) { 
                console.log(event);
                var speechResult = '';
				for(var i=0; i<event.results.length; i++){
                   // messageAppender(event.results[i][0].transcript);
                   speechResult = speechResult +event.results[i][0].transcript;
                   
                }
                insertSpeechMessages(speechResult);
			}
			recognition.start();
        
    }

function callNLU(msg) {
    $.ajax({
        type : "POST",
        url: 'http://localhost:5005/webhooks/rest/webhook',
        contentType : "application/json; charset=utf-8",
        dataType : "json",
        headers: { "Access-Control-Allow-Origin": "true"},
        data : JSON.stringify({
         sender: "RASA",
         message: msg
        }),
        success: function(data){
            talking = true;
            Speech(data[0].text);
            messageAppender(data[0].text);
           }
        })
}

function insertMessage() {
    msg = $('.message-input').val();
    if ($.trim(msg) == '') {
        return false;
    }
    $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    $('.message-input').val(null);
    updateScrollbar();
    setTimeout(function() {
        // fakeMessage();
        callNLU(msg);
    }, 1000 + (Math.random() * 20) * 100);
}

function insertSpeechMessages(speechResult) {
    if ($.trim(speechResult) == '') {
        return false;
    }
    $('<div class="message message-personal">' + speechResult + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    $('.message-input').val(null);
    updateScrollbar();
    setTimeout(function() {
        // fakeMessage();
        callNLU(speechResult);
    }, 1000 + (Math.random() * 20) * 100);
}

$('.message-submit').click(function() {
    insertMessage();
});

$('.message-voice-submit').click(function() {
    voiceFeature();
});


$(window).on('keydown', function(e) {
    if (e.which == 13) {
        insertMessage();
        return false;
    }
})

var Fake = [
    'Hi there, I\'m BATMAN and can give you weather information?',
    'Wassup , how are you doing?',
    'Hello',
    'How are you?',
    'Wassup boy',
    'What do you do?',
    'Hello, I am here to answer your queries',
    'Hello, I am here to answer your queries',
    'Hello, I am here to answer your queries',
    'Hello, I am here to answer your queries',
    'Hello, I am here to answer your queries',
    'Hello, I am here to answer your queries',
    'Hello, I am here to answer your queries',
    'Hello, I am here to answer your queries',
    ':)'
]

function fakeMessage() {
    if ($('.message-input').val() != '') {
        return false;
    }
    $('<div class="message loading new"><figure class="avatar"><img src="img/bat.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
    updateScrollbar();
    i =  Math.floor(Math.random() * 10);
    setTimeout(function() {
        $('.message.loading').remove();
        $('<div class="message new"><figure class="avatar"><img src="img/bat.png" /></figure>' + Fake[i] + '</div>').appendTo($('.mCSB_container')).addClass('new');
        setDate();
        updateScrollbar();
        i++;
        talking = true;
        Speech(Fake[i]);
    }, 1000 + (Math.random() * 20) * 100);

}

function messageAppender(message) {
    if ($('.message-input').val() != '') {
        return false;
    }
    $('<div class="message loading new"><figure class="avatar"><img src="img/bat.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
    updateScrollbar();

    setTimeout(function() {
        $('.message.loading').remove();
        $('<div class="message new"><figure class="avatar"><img src="img/bat.png" /></figure>' + message + '</div>').appendTo($('.mCSB_container')).addClass('new');
        setDate();
        updateScrollbar();
        i++;
    }, 1000 + (Math.random() * 20) * 100);

}
