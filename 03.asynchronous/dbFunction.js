export function dbRunPromise(db, sql, params) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        return reject(err);
      }
      resolve(this);
    });
  });
}

export function dbGetPromise(db, sql, params) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, function (err, param) {
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
