function randomInteger(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}
function getRandomArray(array, arrayB, size) {
	//console.log("array", array);
	var arrayA = array.slice(0);
	//console.log(arrayA);
	for(var i = 0; i < size; i++){
		var j = randomInteger(0, arrayA.length);
		arrayB[i] = arrayA[j];
		arrayA.splice(j, 1);
		//console.log("splicing in function");
	}
	return arrayB;
}