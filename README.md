# README
LineBotでミニ四駆のシャーシをランダムにセレクトするために作成したもの。

# 設定が必要な環境変数

```
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    "X-Line-ChannelID": "ADD_CHANNEL_ID",
    "X-Line-ChannelSecret": "ADD_CHANNEL_SECRET",
    "X-Line-Trusted-User-With-ACL": "ADD_ACL"
  },
```

  上記はlinedevelopersのchannelsから取得
  https://developers.line.me/

# 使い方
1行目に,区切りでシャーシ
2行目に,区切りでユーザを入力してLineBotに話しかけると
ユーザが使うシャーシを返却してくれる

# アーキテクト
AWS LambdaとAPI GateWayを使用してサーバレスで構築
