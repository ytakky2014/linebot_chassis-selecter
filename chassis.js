var https = require('https');
// 配列をシャッフルする
function shuffle(array) {
  var n = array.length, t, i;

  while (n) {
    i = Math.floor(Math.random() * n--);
    t = array[n];
    array[n] = array[i];
    array[i] = t;
  }

  return array;
}
exports.lambdaHandler = function(event, context){
    console.log('Received event:', JSON.stringify(event, null, 2));
    var msg = event.result[0];
    // 受け取るtext
    var text = msg.content.text.toString().split(/\r\n|\r|\n/);
    // 1行目はシャーシが,区切りで渡される
    var chassis = text[0].split(",");
    // 2行目はユーザが,区切りで渡される
    var users = text[1].split(",");

    var count_users = users.length;
    var count_chassis = chassis.length;

    chassis = shuffle(chassis);
    users = shuffle(users);
    if (count_users <= count_chassis) {    
        var send_text='';
        for (var i=0; i<count_users; i++) {
            send_text += users[i] + 'が使うシャーシは ' + chassis[i] + 'です\n\n';
            console.log(send_text);
        }
    } else {
        var send_text = 'シャーシ数はユーザ数より多い必要があります。';
    }
    // 送信データ作成
    var data = JSON.stringify({
        to: [msg.content.from.toString()],
        // 以下のtoChannelとeventTypeは固定値（LINE API仕様)
        toChannel: 1383378250,
        eventType: "138311608800106203",
        content:{
            "contentType":1,
            "toType":1,
            "text": send_text
        }
    });
    var opts = {
        host: 'trialbot-api.line.me',
        path: '/v1/events',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "X-Line-ChannelID": "ADD_CHANNEL_ID",
            "X-Line-ChannelSecret": "ADD_CHANNEL_SECRET",
            "X-Line-Trusted-User-With-ACL": "ADD_ACL"
        },
        method: 'POST'
    }

    // リクエスト
    var req = https.request(opts, function(res){
        res.on('data', function(chunk){
        }).on('error', function(e){
            console.log('ERROR: '+ e.stack);
        })
    })
    req.write(data)
    req.end();
}
