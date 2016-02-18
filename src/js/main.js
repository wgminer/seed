var Seed = (function () {

	var module = {};

	module.init = function () {
		console.log('Welcome to the Seed!');
	}

	return module;

})();

$(function () {

	Seed.init();

});