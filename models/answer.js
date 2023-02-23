let db = require('../config/database');

class Answer {
    
    constructor(result) {
        if(result) {
        this._id = result.id;
        this._question_id = result.question_id;
        this._content = result.content;
        this._correct = result.correct;
        this._created = result.created;
        this._modified = result.modified;
        }   
    } 

    get id() { 
        return this._id; 
    } 
    get question_id() { 
        return this._question_id; 
    } 
    get content() { 
        return this._content; 
    } 
    get correct() { 
        return this._correct; 
    } 
    get created() { 
        return this._created; 
    } 
    get modified() { 
        return this._modified; 
    } 

    set id(id) {
        this._id = id
    }
    set question_id(question_id) {
        this._question_id = question_id
    }
    set content(content) {
        this._content = content
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

    static all(callback) {
        db.query('SELECT * FROM answers;',
        function(err,datas) {
            callback( datas.map( (result) => new Answer(result)) )
        })
    }
    static allWhereQuestion(question_id, callback) {
        db.query('SELECT * FROM answers WHERE question_id = ?;', [question_id],
        function(err,datas) {
            callback( datas.map( (result) => new Answer(result)) )
        })
    }

    static OneById(id, callback) {
        db.query('SELECT * FROM answers WHERE id = ?;', [id],

        function(err, result) {
            if (err) {
                throw err;
            }
            callback(new Answer(result[0]));
        }
        
        )
    }

    static addOne(question_id, content, correct) {
        db.query('INSERT INTO `answers`(`question_id`, `content`, `correct`) VALUES (?, ?, ?)', [question_id, content, correct])
    }
}

module.exports = Answer