module.exports = {
    isEmpty: function(value){
        return (value === null || value === undefined || value.length === 0 || value === '');
    },
    expiresCookies: function() {
        let date = new Date();
        date.setSeconds(date.getSeconds() + 86400 // OneDay
        )
        return date
    },
    
}