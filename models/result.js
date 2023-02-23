let db = require('../config/database');
let moment = require('moment');
moment.locale('fr');

class Result {
    
    constructor(result) {
        if(result) {
        this._id = result.id;
        this._user = result.user;
        this._total = result.total;
        this._correct = result.correct;
        this._created = result.created;
        this._updated = result.updated;
        }   
    } 

    get id() { 
        return this._id; 
    } 
    get user() { 
        return this._user; 
    } 
    get total() { 
        return this._total; 
    } 
    get correct() { 
        return this._correct; 
    } 
    get created() { 
        return moment(this._created) 
    } 
    get modified() { 
        return moment(this._modified)
    } 

    set id(id) {
        this._id = id
    }
    set user(user) {
        this._user = user
    }
    set total(total) {
        this._total = total
    }
    set correct(correct) {
        this._correct = correct
    }
    set created(created) {
        this._created = created
    }
    set modified(modified) {
        this._modified = modified
    }

    static create(user, total, correct) {
        db.query('INSERT INTO results (user, total, correct) VALUES (?,?,?)', [user, total, correct])
      }

      static all(callback) {
        db.query('SELECT * FROM results ORDER BY correct DESC;',
        function(err,datas) {
            callback( datas.map( (data) => new Result(data)) )
        })
      }
}

module.exports = Result