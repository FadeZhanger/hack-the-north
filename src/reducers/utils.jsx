export function getAllStreets(fullJson) {
  const streets = {};
  fullJson.forEach((client) => {
    if (!client.transactions) {
      return;
    }
    client.transactions.forEach((t) => {
      if (streets[t.locationStreet]) {
        return;
      }
      streets[t.locationStreet] = t.locationStreet;
    });
  });
  return Object.values(streets);
}

export function getAverage(fullJson, street) {
  const income = [];
  const age = [];
  const spent = [];
  fullJson.forEach((client) => {
    if (!client.transactions) {
      return;
    }
    client.transactions.forEach((t) => {
      if (t.locationStreet === street) {
        age.push(client.age);
        income.push(client.totalIncome);
        spent.push(t.currencyAmount);
      }
    });
  });
  const finalAge = age.reduce((acc, val) => acc + val, 0) / age.length;
  const finalIncome = income.reduce((acc, val) => acc + val, 0) / income.length;
  const finalSpent = spent.reduce((acc, val) => acc + val, 0) / spent.length;
  return {
    averageAge: finalAge,
    averageIncome: finalIncome,
    averageAmountSpent: finalSpent,
  };
}

export function getCount(fullJson, street) {
  const o = {female: 0, male: 0, single: 0, married: 0, numOfTransactions: 0, totalAmountSpent: 0};
  fullJson.forEach((client) => {
    if (!client.transactions) {
      return;
    }
    client.transactions.forEach((t) => {
      if (t.locationStreet === street) {
        o.numOfTransactions++;
        o.totalAmountSpent += t.currencyAmount;
        if (client.gender === 'Female') {
          o.female += 1;
        } else {
          o.male += 1;
        }
        if (client.relationshipStatus === 'Married') {
          o.married += 1;
        } else {
          o.single += 1;
        }
      }
    });
  });
  return o;
}

export function getByGender(fullJson, gender) {
  const heatMapFullData = [];
  const filtered = fullJson.filter((client) => {
    if (client.gender.toLowerCase() === gender) {
      return true;
    }
    if (gender === 'both') {
      return true;
    }
    return false;
  });
  filtered.forEach((client) => {
    if (!client.transactions) {
      return;
    }
    client.transactions.forEach((transaction) => {
      if (transaction.locationLatitude && transaction.locationLongitude) {
        heatMapFullData.push({
          lat: transaction.locationLatitude.toString(),
          lng: transaction.locationLongitude.toString(),
        });
      }
    });
  });
  return heatMapFullData;
}

export function getByName(fullJson, name) {
  const heatMapFullData = [];

  fullJson.forEach((client) => {
    if (!client.transactions) {
      return;
    }
    if (`${client.givenName} ${client.surname}` === name) {
      client.transactions.forEach((t) => {
        if (t.locationLatitude && t.locationLongitude) {
          heatMapFullData.push({
            lat: t.locationLatitude,
            lng: t.locationLongitude,
          });
        }
      });
    }
  });
  return heatMapFullData;
}

export function getByMaritalStatus(fullJson, maritalStatus) {
  const heatMapFullData = [];

  fullJson.forEach((client) => {
    if (!client.transactions) {
      return;
    }
    if (maritalStatus === 'married') {
      if (client.relationshipStatus.toLowerCase() === maritalStatus) {
        client.transactions.forEach((t) => {
          if (t.locationLatitude && t.locationLongitude) {
            heatMapFullData.push({
              lat: t.locationLatitude,
              lng: t.locationLongitude,
            });
          }
        });
      }
    } else {
      if (client.relationshipStatus.toLowerCase() !== 'married') {
        client.transactions.forEach((t) => {
          if (t.locationLatitude && t.locationLongitude) {
            heatMapFullData.push({
              lat: t.locationLatitude,
              lng: t.locationLongitude,
            });
          }
        });
      }
    }
  });
  return heatMapFullData;
}

export function getByIncome(fullJson, range) {
  const heatMapFullData = [];
  fullJson.forEach((client) => {
    if (!client.transactions) {
      return;
    }
    if (client.totalIncome > range[0] && client.totalIncome < range[1]) {
      client.transactions.forEach((t) => {
        if (t.locationLatitude && t.locationLongitude) {
          heatMapFullData.push({
            lat: t.locationLatitude,
            lng: t.locationLongitude,
          });
        }
      });
    }
  });

  return heatMapFullData;
}

export function getByAge(fullJson, ageRange) {
  const heatMapFullData = [];
  fullJson.forEach((client) => {
    if (!client.transactions) {
      return;
    }
    if (client.age > ageRange[0] && client.totalIncome < ageRange[1]) {
      client.transactions.forEach((t) => {
        if (t.locationLatitude && t.locationLongitude) {
          heatMapFullData.push({
            lat: t.locationLatitude,
            lng: t.locationLongitude,
          });
        }
      });
    }
  });
  return heatMapFullData;
}

export function debounce(fn, interval) {
  let timer;
  return function debounced() {
    clearTimeout(timer);
    const args = arguments;
    timer = setTimeout(() => fn.apply(this, args), interval);
  };
}
