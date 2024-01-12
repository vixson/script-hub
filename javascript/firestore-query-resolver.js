const { and, collection, endAt, endBefore, getFirestore, limit, limitToLast, or, orderBy, query, startAfter, startAt, where } = require('firebase/firestore');
import { initializeApp } from 'firebase/app';

// Get `firebaseConfig` from https://console.firebase.google.com/project/_/settings/general/
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

function prepareQuery(payload, c = { or, and, where, orderBy, startAt, startAfter, endAt, endBefore, limit, limitToLast }) {
  return chain(payload)
    .map((v, k) => {
      if (typeof v !== 'object') v = [v];
      switch (`${k}`) {
        case 'or':
        case 'and':
          v = chain(v)
            .omitBy(isNil)
            .map((_v, _k) => {
              if (Array.isArray(_v))
                return prepareQuery({ where: [_v[0], _v[1], _v[2]] });
              else if (typeof _v !== 'object') return prepareQuery({ [_k]: _v })
            })
            .reject(isNil)
            .value();
          break;
        case 'where':
          if (isNil(v[2])) return null
          break;
      }
      v = reject(v, isNil);
      return isEmpty(v) ? null : c[k](...v);
    })
    .reject(isNil)
    .value();
}

export const readCollection = (path, data) => {
  return query(collection(db, path), ...prepareQuery(data));
};

// Usage

// Find <profiles> that `first_name` equals 'john' and `age` is greater than 40
readCollection('profiles', {
  and: [['first_name', '==', 'john'], ['age', '>', 40]]
})

// Find <profiles> that `first_name` equals 'john' or `last_name` equals 'doe'
readCollection('profiles', {
  or: [['first_name', '==', 'john'], ['last_name', '==', 'doe']]
})

// It can be combined with other query operators
q = {
  or: [null],
  or: { limit: 10 },
  or: { and: ['status', '===', 'active'], limit: 10 },
  or: [['field', 'operator', 'value'], undefined],
  or: [['field', 'operator', 'value'], ['field', 'operator', 'value']],
  and: [['field', 'operator', 'value'], undefined],
  and: [['field', 'operator', 'value'], ['field', 'operator', 'value']],
  where: ['field', 'operator', 'value'],
  where: ['field', 'operator', undefined],
  orderBy: ['field', 'direction'],
  startAfter: [null],
  startAfter: ['last_snapshot'],
  limit: 100
}