let db = require('../config/database');
let moment = require('moment');
moment.locale('fr');

class Question {
    
    constructor(result) {
        if(result) {
        this._id = result.id;
        this._content = result.content;
        this._theme = result.theme;
        this._validation = result.validation;
        this._created = result.created;
        this._modified = result.modified;
        }   
    } 

    get id() { 
        return this._id; 
    } 
    get content() { 
        return this._content; 
    } 
    get theme() { 
        return this._theme; 
    } 
    get validation() { 
        return this._validation; 
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
    set content(content) {
        this._content = content
    }
    set theme(theme) {
        this._theme = theme
    }
    set validation(validation) {
        this._validation = validation
    }
    set created(created) {
        this._created = created
    }
    set modified(modified) {
        this._modified = modified
    }

    static allRand(callback) {
        db.query('SELECT * FROM questions  WHERE validation = true ORDER BY RAND();',
        function(err,datas) {
            callback( datas.map( (result) => new Question(result)) )
        })
      }
    static nbQuestions(callback) {
        db.query('SELECT COUNT(*) AS total_questions FROM questions;', (err, res) => {
            callback(res[0].total_questions)
        })
    }

    static createByContribution(content, theme, validation = 0, callback) {
        db.query('INSERT INTO questions (content, theme, validation) VALUES (?,?,?)', [content, theme, validation],
        function(err,datas) {
            callback( datas )
        })
      }

    static allNoValidate(callback) {
        db.query('SELECT * FROM questions  WHERE validation = false;',
        function(err,datas) {
            callback( datas.map( (result) => new Question(result)) )
        })
    }

    static validateQuestion(id, validation = 1) {
        db.query('UPDATE questions SET validation = ? WHERE id = ?', [validation, id])
    }

}

module.exports = Question