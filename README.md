# ripple_ws
A Simple illustration of a websocket based distributed system

This was tested on node `v4.2.1`

## Installing

1. Download repo
  ```
  git clone git@github.com:nbprithv/ripple_ws.git
  ```

2. Install dependencies
  ```
  npm install
  ```

## Sample Ripple client

1. Run the client
  ```
  node client/ws-client.js
  ```

2. Watch the output stream
  ```
  { fee_base: 10,
    fee_ref: 10,
    ledger_hash: '45E1165BB9FDAF1F951D00FF981D1C142A8C6CC373C3D39F1BA47CF7EE54B033',
    ledger_index: 23356772,
    ledger_time: 524539341,
    reserve_base: 20000000,
    reserve_inc: 5000000,
    txn_count: 17,
    type: 'ledgerClosed',
    validated_ledgers: '22583954-23356772' }
  { fee_base: 10,
    fee_ref: 10,
    ledger_hash: '506D24B58B0426A3FFF2A908895DA76A027D1C225322B8E41FD3D556AEEB0D24',
    ledger_index: 23356773,
    ledger_time: 524539342,
    reserve_base: 20000000,
    reserve_inc: 5000000,
    txn_count: 27,
    type: 'ledgerClosed',
    validated_ledgers: '22583954-23356773' }
    ```

## Run distributed servers

1. One script exposes both a client and a server with CLI commands
  ```
  node server/index.js -h
  
  Web socket server and client

    Start up a simple web socket server or client from the command line

  Options

    -s, --PORT_LISTEN number    Start a web socket server listening on this port
    -c, --PORT_CONNECT number   Start a web socket client connecting to this port
    -k, --HOST string           Start a web socket client listening to this host. Defaults to localhost
    -x, --SECURE                Specify if the server to connect to is secure. Default is insecure.
    -h, --help                  Print this help menu
  ```

2. Start one server on port 3000 and client listening to 5000.
  ```
  $ node server/index.js -s 3000 -c 5000
  Started server on port 3000
  Couldn't connect to ws://localhost:5000
  Trying to reconnect in 2 seconds
  Couldn't connect to ws://localhost:5000
  Trying to reconnect in 4 seconds
  ```

3. Start another server on port 5000 and client listening to 3000.
  ```
  $ node server/index.js -s 5000 -c 3000
  Started server on port 5000
  Connected to ws://localhost:3000
  Client received: "Server at 3000 says: Hello"
  Client received: "Broadcast to all clients"
  ```

4. The first client started in step 2 should also be automatically connected to this server now
  ```
  Connected to ws://localhost:5000
  Client received: "Server at 5000 says: Hello"
  Client received: "Broadcast to all clients"
  ```

5. Spin up another node with just one client
  ```
  $ node server/index.js -c 5000
  Server port not specified
  Connected to ws://localhost:5000
  Client received: "Server at 5000 says: Hello"
  Client received: "Broadcast to all clients"
  ```

6. Now there are two clients listening to the server running on port 5000. Clients will receive the `Server at 5000 says: Hello` message only once at the time they establish a connection with the server. The `Broadcast to all clients` message will be sent to all clients when a new client connects. This is just to illustrate a 1-1 server/client messaging and broadcast messaging.
