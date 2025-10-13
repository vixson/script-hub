/**
 * @author Vixson https://vixson.github.io
 * @description Deep/Wildcard path matcher of basic lodash function.
*/
import { flattenDeep, forEach as ldForEach, get as ldGet, set as ldSet, isEmpty, isNil, mergeWith } from 'lodash';

function generatePaths(paths: string | string[]) {
  // console.info(`\nPaths ->`, paths);

  return Array.isArray(paths) ? paths : (paths as string)
    ?.replace(/\.?\[\.\]/g, '.***.')
    .replace(/\.?\[(.+)\]/g, '.$1.')
    .replace(/\.\.\./g, '.**.')
    .replace(/\.\./g, '.*.')
    // .replace(/\[/g, '.')
    // .replace(/]/g, '')
    .split('.')
    .filter(Boolean);
}

function get<T = any>(input, path: string | string[], _default?: T | T[], options: any = { flatten: true }) {
  let output;
  const paths = generatePaths(path);

  // console.info(`\nPaths ->`, paths);
  // console.info(`\nInput ->`, JSON.stringify(input));

  output = paths?.reduce((prev, k, i, a) => {
    // console.table({ 'Current Key': k, Previous: JSON.stringify(prev) })
    let v;
    switch (k) {
      case '***': // This means the key is a simple dot. eg: item[.]
        v = prev?.['.'];
        break;
      case '**': // (Offspring match) This means its a continues deep search until the key matches any offspring

        break;
      case '*': // This means the key is an iterable. eg: item[index], item[objectKey]
        if (typeof prev === 'object') {
          v = [];
          // console.info(`\nChecking Each ${a[i - 1]}.${k}`);
          ldForEach(prev, (_n, _i) => {
            // console.info(`\nNext Input ${a[i - 1]}.${_i} ->`, _n);
            const _v = get(_n, a.slice(i + 1));
            // console.info(`\nValue ${a[i - 1]}.${_i} ->`, _v);
            v.push(_v);
            v = v.filter(Boolean);
          });
          a.splice(i)
        }
        break;
      default:
        v = prev?.[k];
        // console.info(`\nReturn Value ${k} ->`, v);
        break;
    }
    return v;
  }, input);
  return ((Array.isArray(output) && options.flatten) ? flattenDeep(output) : output) ?? _default;
}

function set<T = any>(input, path: string | string[], data: any, options: any = { pathMatch: null }) {
  let output;
  const paths = generatePaths(path);
  const pathsMatch = generatePaths(options?.pathMatch);

  // console.info(`\nPaths ->`, paths);
  // console.info(`\nPaths Match ->`, pathsMatch);
  // console.info(`\nInput ->`,);
  // console.dir(input, { depth: null });

  output = paths?.reduce((prev, k, i, a) => {
    // console.info('\n');
    // console.table({ 'Current Key': k, Previous: JSON.stringify(prev) })
    if (!isEmpty(prev)) switch (k) {
      case '***': // This means the key is a simple dot. eg: item[.]
        prev['.'] = data;
        break;
      case '**': // (Offspring match) This means its a continues deep search until the key matches any offspring

        break;
      case '*': // This means the key is an iterable. eg: item[index], item[objectKey]
        if (typeof prev === 'object') {
          // console.info(`\nChecking Each ${a[i - 1]}.${k}`);
          ldForEach(prev, (_n, _i) => {
            // console.info(`\nNext Input ${a[i - 1]}.${_i} ->`, _n);
            const _v = (i === (a.length - 1)) ? Object.defineProperty(prev, _i, {
              value: data,
              enumerable: true,
              writable: true
            }) : set(_n, a.slice(i + 1), data);

            // console.info(`\nValue ${a[i - 1]}.${_i} ->`, _v);
          });
          // a.splice(i)
        }
        break;
      default:
        // console.info(`prev ->`, prev);
        if (typeof prev === 'object') {
          if (isNil(prev?.[k])) Object.defineProperty(prev, k, {
            value: {},
            enumerable: true,
            writable: true
          });
          if (i === (a.length - 1)) Object.defineProperty(prev, k, {
            value: data,
            enumerable: true,
            writable: true
          });
        }
        // prev[k] = data;
        // console.info(`\nReturn Output ${k} ->`, data);
        break;
    }
    return prev?.[k];
  }, input);
  // console.info(`output ->`, output);
  // console.info(`\nReturn ->`, input);
  // return mergeWith({}, input, output,
  //   (a: any, b: any) => isNil(b) ? a : b
  // );
  return input;
}

function forEach(obj, callback, path) {
  return ldForEach(obj, callback)
}

export { forEach, get, set };