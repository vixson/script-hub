/**
 * @name Firestore Collection Helper
 * @author Vixson https://vixson.github.io, 12th August 2021 9:13PM GMT
 * @description Firebase firestore collection resolver.
 *              Used to nest deep object to collections and subcollections
 * @param path The firestore path of Document
 * @param data The Data object to be saved
 * @param deep Should it resolve nested object to a sub collection?
 * @todo Check and Filter out Nil and Empty using Lodash
 */
function resolveCollection(path = '', data = {}, deep = false) {
  Object.entries(data).forEach(([k, v]) => {
    if (
      // isNil(v) && // Check Nil with Lodash
      (
        typeof v === 'object'
        || Array.isArray(v)
      )
    ) {
      if (deep) Object.entries(v).forEach(([_k, _v]) => {
        if (
          typeof _v === 'object'
          || Array.isArray(_v)
        ) {
          // delete v[_k]; // UNCOMMENT HERE
          const _path = `${path}/${k}/${_k}`
          v[_k] = `This is have been moved to a sub collection: (${_path})`; // COMMENT HERE
          resolveCollection(_path, _v, deep)
        }
      })
    }
    else {
      // delete data[k]; // UNCOMMENT HERE
      data[k] = 'Invaild data: Cannot add a direct value to Document' // COMMENT HERE
      console.error(`|\nItem (${k} which is ${v}) can not be a direct value`)
    }
    console.info(`\n\n<> Setting to (${path}/${k}) :>>`, data[k]);
    // firestore.doc(`${path}/${k}`).set(data[k]); // UNCOMMENT HERE
    // firestore.doc(`${path}/${k}`).update(data[k]); // Probably UNCOMMENT HERE too, Only if Firestore.update method is used.
  })
  return data;
};

const object = {
  a: 'A',
  b: ['B1', 'B2'],
  c: {
    c1: 'C1',
    c2: 'C2'
  },
  d: {
    0: 'D0',
    1: 'D1'
  },
  e: [['E11', 'E12'], ['E21', 'E22']],
  f: [{
    f11: 'F11',
    f12: 'F12'
  }, {
    f21: 'F21'
  }],
  g: {
    g1: {
      g11: 'G11',
      g12: 'G12'
    }, g2: {
      g21: 'G21'
    }
  },
  h: {
    h1: {
      h11: { name: 'H11' },
      h12: 'H12'
    }, h2: {
      h21: 'H21'
    }
  },
  // null: null, // Check Nil
  // undefined: undefined // Check Nil
}

const result = resolveCollection('1stcollection', object, true)

console.info(`\n\n\nData :>>`, result);

// Remember to Prune empty objects, array and undefined and null using Lodash.isNil or Lodash.isEmpty