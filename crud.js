const express = require('express');

const dt = {
  fullDayString: (date) => {
    return date.getFullYear() +"-"+ ("0" + (date.getMonth()+1)).slice(-2) + "-"+ date.getDate();
  },
  start: (date, timezone='Z') => {
    return new Date(date.getUTCFullYear()+"-"+("0" + (date.getUTCMonth()+1)).slice(-2) + "-"+date.getUTCDate()+"T00:00:00.000"+timezone)
  },
  end: (date, timezone='Z') => {
    return new Date(date.getUTCFullYear()+"-"+("0" + (date.getUTCMonth()+1)).slice(-2) + "-"+date.getUTCDate()+"T23:59:59.999"+timezone)
  }
}

module.exports = (Collection) => {

  let router = express.Router();

  router.post('/', (req, res) => {
    const newEntry = req.body;
    Collection.create(newEntry, (e,newEntry) => {
      if(e) {
        console.log(e);
        res.sendStatus(500);
      }
      else res.send(newEntry);
    });
  });

  router.get('/*', (req, res) => {

    console.log(new Date().toString());
    let singleResult = false, query = {};

    if(typeof req.params[0] !== 'undefined' && req.params[0]) {
      if(typeof req.params[0].split(':')[1] !== 'undefined') {

        // Filtering Query
        const filters = req.params[0].split('/');
        filters.forEach((filter) => {
          filter = filter.split(':');
          switch(filter[1]) {
            case 'today':
              let today = new Date();
              filter[1] = {"$gte": dt.start(today), "$lte": dt.end(today)}
              break;
            case 'date':
              let date = new Date(filter[2])
              filter[1] = {"$gte": dt.start(date), "$lte": dt.end(date)}
              break;
            case 'gt':
              filter[1] = {"$gt": filter[2]}
              break;
            case 'gte':
              filter[1] = {"$gte": filter[2]}
              break;
            case 'lt':
              filter[1] = {"$lt": filter[2]}
              break;
            case 'lte':
              filter[1] = {"$lte": filter[2]}
              break;
            case 'between':
              filter[1] = {"$gte": filter[2], "$lte": filter[3]}
              break;
          }

          query[filter[0]] = filter[1];
        });

      } else {
        // Searching one user by id
        singleResult = true;
        query = { _id: req.params[0] };
      }
    }
    console.log(query);

    Collection.find(query, (e,results) => {
      if(e) {
        res.send(e);
        console.log(e.message);
      }
      else {
        if(singleResult)
          res.send(results[0]);
        else
          res.send(results);
      }
    });
  });

  router.put('/:_id', (req, res) => {
    const changedEntry = req.body;
    Collection.update({ _id: req.params._id }, { $set: changedEntry }, function(err) {
      if (err)
        res.sendStatus(500);
      else
        res.sendStatus(200);
    });
  });

  router.delete('/:_id', (req, res) => {
    Collection.remove({ _id: req.params._id }, function(err) {
      if (err)
        res.send(err.message);
      else
        res.sendStatus(200);
    });
  });

  return router;

}
