function removeAtIndex(arr, index){
	var clipped = [];
	let reps = arr.length;
	for (var r = 0; r < reps; r++){
		if(r != index){
			clipped.push(arr[r]);
		}
	}
	return clipped;
}
function removeItem(arr, item){
	var clipped = arr;
	let reps = clipped.length;
	for (var r=0; r< reps; r++){
		if(clipped[r] == item){
			clipped = removeAtIndex(clipped, r);
			r=0;
		}
	}
	return clipped;
}
function removeDuplicates(arr){
	var filtered = arr.filter(function(item, pos) {
			return arr.indexOf(item) == pos;
		})
	return filtered;
}

function copyArray(arr) {
	let cpy = Array(arr.length);
	for (var i = 0; i < arr.length; i++) {
	  let value = arr[i] ;
	  if (typeof value == "object") {
		if (Array.isArray(value))
		  value = copyArray(value);
		else
		  value = copyObject(value);
	  }
	  cpy[i] = value;
	}
	return cpy;
}
  function copyObject(obj) {
	let cpy = { };
	for (var key of obj) {
	  let value = obj[key];
	  if (typeof value == "object") {
		if (Array.isArray(value))
		  value = copyArray(value);
		else
		  value = copyObject(value);
	  }
	  cpy[i] = value;
	}
	return cpy;
}