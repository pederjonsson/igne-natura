/** clip.js **/

var Clip = function (data) {  
    this.data = data;
}

Clip.prototype.data = {}

Clip.prototype.changeName = function (name) {  
    this.data.name = name;
}

Clip.findById = function (id, callback) {  
    /*db.get('users', {id: id}).run(function (err, data) {
        if (err) return callback(err);
        callback(null, new User(data));
    });*/
}

Clip.prototype.getUrl = function () {  
    return this.data.url;
}

module.exports = Clip;