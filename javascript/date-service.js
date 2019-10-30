(() => {
  const data = [{
    date: "2019-04-19T00:00:00.000Z",
    downloads: 26
  }, {
    date: "2019-04-22T00:00:00.000Z",
    downloads: 6
  }, {
    date: "2019-04-23T00:00:00.000Z",
    downloads: 1
  }, {
    date: "2019-06-11T00:00:00.000Z",
    downloads: 10
  }, {
    date: "2019-06-12T00:00:00.000Z",
    downloads: 20
  }, {
    date: "2019-06-13T00:00:00.000Z",
    downloads: 2
  }, {
    date: "2016-06-14T00:00:00.000Z",
    downloads: 9
  }];

  function getMonths(daysDataList, useMultiYear) {
    let yearOld = 0, months = Array(12).fill(0), response = {}, isMultiYear = false, rcd = false;
    daysDataList.forEach(data => {
      let d = new Date(data.date), y = d.getFullYear(), m = d.getMonth();
      // Check for difference in year
      if (!rcd) {
        yearOld = d.getFullYear();
        rcd = true;
        console.log(`Record taken to be ${yearOld}`);
      }
      if (y != yearOld && useMultiYear) {
        console.log(`Record broken as ${y}`);
        months[m] += data.downloads;
        response = Object.assign(response, { [y]: months });
        // response[y][m] = data.downloads;
        rcd = false;
        isMultiYear = true;
      } else if (!isMultiYear) {
        months[m] += data.downloads;
        response = months;
      }
      console.log(y, yearOld, isMultiYear);
    });
    return response;
  }
  function getYears(daysDataList) {
    let years = {};
    daysDataList.forEach((data, i) => {
      let d = new Date(data.date), y = d.getFullYear();
      years[y] = data.downloads;
      console.log(years[y], i);
    });
    return years;
  }
  console.log('Month data: ', getMonths(data, true));
  // console.log('Year data: ', getYears(data));

  ;
})();