/** tag.js **/

function Tag (data, key) {
	this.value = data;
	this.key = key;
}

Tag.prototype.value = {}
Tag.prototype.key = "";


//static method for updating specific obj, perhaps use hashmap in future instead of looping
Tag.update = function (tags, snapshot) {
    for (var i = 0; i < tags.length; i++) {
    	if(tags[i].key === snapshot.key){
			tags[i].value = snapshot.val();
      		break;
    	}
    }
};

//static method for deleting specific obj
Tag.delete = function (tags, snapshot) {
    for (var i = 0; i < tags.length; i++) {
    	if(tags[i].key === snapshot.key){
			tags.splice(i,1);
      		break;
    	}
    }
};

Tag.getByKey = function (tags, key) {

	 for (var i = 0; i < tags.length; i++) {
    	if(tags[i].key === key){
			return tags[i];
      		break;
    	}
    }
};

module.exports = Tag;