/** clip.js **/

function Clip (data, key) {
	this.value = data;
	this.key = key;
}

Clip.prototype.value = {}
Clip.prototype.key = "";

//static method for updating specific obj, perhaps use hashmap in future instead of looping
Clip.update = function (clips, snapshot) {
    for (var i = 0; i < clips.length; i++) {
    	if(clips[i].key === snapshot.key){
			clips[i].value = snapshot.val();
      		break;
    	}
    }
};

//static method for deleting specific obj
Clip.delete = function (clips, snapshot) {
    for (var i = 0; i < clips.length; i++) {
    	if(clips[i].key === snapshot.key){
			clips.splice(i,1);
      		break;
    	}
    }
};

Clip.getByKey = function (clips, key) {

	 for (var i = 0; i < clips.length; i++) {
    	if(clips[i].key === key){
			return clips[i];
      		break;
    	}
    }
};

module.exports = Clip;