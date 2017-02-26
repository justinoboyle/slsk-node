# [slsk-node](https://npmjs.org/package/slsk)

A slsk client for node.

## Installation

```
npm i -S slsk
```

## Sample usage

```javascript
import { SlskClient } from 'slsk';

let client = new SlskClient();

slsk.login({
  username: 'test',
  password: 'tester123'
})
.then(() => console.log('Woohoo!'))
.catch(e => console.error(e));
```
