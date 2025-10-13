function sortLinkedList(array = [], key = 'i') {
  let count = 0;
  let list = [];
  const mapped = _.mapKeys(array, key);
  const interacted = [];
  const message = {};
  const passthrough = {};
  function resolve() {
    const current = array[count];
    const ptkey = current?.[key];
    const pt = passthrough[ptkey] = { key, mapped: { [ptkey]: 0 }, list: [current], next: 0, previous: 0 };

    if (!_.isNil(ptkey)) {
      const listk = _.map(list, key);
      pivot(current, 'both', ptkey);
      const ptlistk = _.map(pt.list, key);

      // console.info(`[${ptkey}] ${Math.abs(pt.previous)} | ${pt.next} - ${ptlistk.join()}`, pt.mapped);
      if (ptlistk[0] === listk.slice(-1)[0] || _.isEmpty(list)) {
        // ptkey;
        // ptlistk;
        // listk;
        list.splice(-1, 1);
        list = [...list, ...pt.list];
      }
      else if (ptlistk.slice(-1)[0] === listk[0] || _.isEmpty(list)) {
        // ptkey;
        // ptlistk;
        // listk;
        list.splice(0, 1);
        list = [...pt.list, ...list];
      }
      // else list = pt.list
      message[ptkey] = `${ptlistk.join()} - ${listk.join()} [ ${_.map(list, key).join()} ]`;

      if (list.length < array.length && count <= array.length) {
        count++;
        resolve();
      }
    }
  }
  function pivot(v = {}, direction = 'both', ptkey = '') {
    const pt = passthrough[ptkey] ?? {};
    const next = mapped[v.n];
    const previous = mapped[v.p];

    if (!interacted.includes(v[pt.key])) {
      interacted.push(v[pt.key]);
      // console.info(`[${ptkey}] moves ${v[pt.key]} ${direction} by ${pt[direction] ?? 0}`);

      if (!_.isNil(previous) && ['both', 'previous'].includes(direction)) {
        // if (!interacted.includes(previous[pt.key])) list.unshift(previous);
        pt.list.unshift(previous);
        // pt.mapped[previous[pt.key]] = (pt.previous--) - 1;
        pivot(previous, 'previous', ptkey);
      }
      if (!_.isNil(next) && ['both', 'next'].includes(direction)) {
        // if (!interacted.includes(next[pt.key])) list.push(next);
        pt.list.push(next);
        // pt.mapped[next[pt.key]] = (pt.next++) + 1;
        pivot(next, 'next', ptkey);
      }
      // list = pt.list;
    }
  }
  resolve();
  interacted;
  message;
  count;
  return list;
}