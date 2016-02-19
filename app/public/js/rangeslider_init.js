$(function() {

    var $document = $(document);
    var selector = '[data-rangeslider]';
    var $element = $(selector);

    // For ie8 support
    var textContent = ('textContent' in document) ? 'textContent' : 'innerText';

    // Example functionality to demonstrate a value feedback
    function valueOutput(element) {
        var value = element.value;
        var output = element.parentNode.getElementsByTagName('output')[0] || element.parentNode.parentNode.getElementsByTagName('output')[0];
        output[textContent] = value;
    }

    $document.on('input', 'input[type="range"], ' + selector, function(e) {
        valueOutput(e.target);
    });

    // Basic rangeslider initialization
    $element.rangeslider({
        polyfill: false,
        onInit: function() {
            valueOutput(this.$element[0]);
        },
        onSlide: function(position, value) {
			getUrl(value);
        },
        onSlideEnd: function(position, value) {
			//getUrl(value);
        }
    });

});
var web_app = 'api.toobox.io';

function getUrl(value) {
	url = 'http://' + web_app + '/volume/' + value
	var http = new XMLHttpRequest();
	http.open("GET", url, true);
	http.send();
}

function switchHeater() {
	url = 'http://' + web_app + '/heater'
	var http = new XMLHttpRequest();
	http.open("GET", url, true);
	http.send();
}
