let db = require('../config/database');

class User {
    
    constructor(result) {
        if(result) {
        this._id = result.id;
        this._username = result.username;
        this._password = result.password;
        this._created = result.created;
        this._updated = result.updated;
        }   
    } 

    get id() { 
        return this._id; 
    } 
    get username() { 
        return this._username; 
    } 
    get password() { 
        return this._password; 
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
    set username(username) {
        this._username = username
    }
    set password(password) {
        this._password = password
    }
    set created(created) {
        this._created = created
    }
    set modified(modified) {
        this._modified = modified
    }
}

module.exports = User