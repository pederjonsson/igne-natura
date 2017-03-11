/** yutube.js **/

function Youtube (data, key) {
	this.value = data;
	this.key = key;
}

Youtube.prototype.value = {}
Youtube.prototype.key = "";

Youtube.prototype.setValidated = function (validated) {
	this.value.validated = validated;
}

//static method for updating specific obj, perhaps use hashmap in future instead of looping
Youtube.update = function (youtubes, snapshot) {
	for (var obj in youtubes) {
        if(obj.key == snapshot.key){
            obj.value = snapshot.val();
        }
    }
};

//static method for deleting specific obj
Youtube.delete = function (youtubes, snapshot) {
    for (var i = 0; i < youtubes.length; i++) {
    	if(youtubes[i].key === snapshot.key){
			youtubes.splice(i,1);
      		break;
    	}
    }
};

Youtube.getByKey = function (youtubes, key) {

	 for (var i = 0; i < youtubes.length; i++) {
    	if(youtubes[i].key === key){
			return youtubes[i];
      		break;
    	}
    }
};

module.exports = Youtube;