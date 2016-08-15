# ripple_ws
A Simple web socket client to connect to Ripple server

## Installing

1. Download repo
```
git clone git@github.com:nbprithv/ripple_ws.git
```

2. Install dependencies
```
npm install
```

3. Start server
```
node client/ws-client.js
```

4. Watch the output stream as so
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
