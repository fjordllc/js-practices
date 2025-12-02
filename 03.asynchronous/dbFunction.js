export function dbRunPromise(sql, db) {
  return new Promise((resolve, reject) => {
    db.run(sql, function (err) {
      if (err) {
        return reject(err);
      }
      resolve(this);
    });
  });
}

export function dbGetPromise(sql, db) {
  return new Promise((resolve, reject) => {
    db.get(sql, function (err, param) {
      if (err) {
        return reject(err);
      }
      resolve(param);
    });
  });
}

export function dbClosePromise(db) {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}
