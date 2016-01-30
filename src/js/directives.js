app.directive('upload', function (Local, $http, $rootScope) {
    return {
        restrict: 'E',
        template: '<input style="display:none" type="file"><button class="button">1. Choose Jira .xls to upload</button>',
        link: function (scope, element, attrs) {

        	var $element = $(element);

            var parseJiraHtml = function (html) {
                
                var $html = $(html);
                var keys = {};
                var table = [];

                $html.find('th').each(function () {
                	var o = {
                        id: $(this).attr('data-id'),
                		name: $(this).text().trim(),
                        checked: false,
                        default: false
                	};

                    switch (o.id) {
                        case 'issuekey':
                        case 'assignee':
                        case 'priority':
                        case 'summary':
                            o.default = true;
                            o.checked = true;
                            break;
                    }

                	keys[$(this).attr('data-id')] = o;
                });

                $html.find('tbody tr.issuerow').each(function () {
                    var row = {};
                    for (var key in keys) {
                        var value = $(this).find('.' + key).text().trim();
                        row[key] = value;
                    }
                    table.push(row);
                });

                Local.keys = keys;
                Local.issues = table;
                $rootScope.$broadcast('uploaded');
            }

            $http.get('js/jira.xls')
                .then(function (callback) {
                    parseJiraHtml(callback.data);
                });

            $element.find('button').click(function() {
                setTimeout(function() {
                    $element.find('input')[0].click();
                }, 0);
            });

            $element.find('input').bind('change', function (event) { 
                scope.$apply(function () {

                    var files = event.target.files;
                    for (var i = 0; i != files.length; ++i) {

                        var file = files[i]; 
                        var reader = new FileReader();
                        var name = file.name;

                        reader.onload = function(event) {
                            parseJiraHtml(event.target.result);
                        };

                        reader.readAsBinaryString(file);
                    }
                    
                });
            });

        }
    }
});

app.directive('square', function (Local, $http) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            $(element).height($(element).width());

        }
    }
});

app.directive('fields', function (Local, $http) {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {

        	scope.$on('uploaded', function(event, index) {
	       		scope.fields = Local.keys;
                scope.example = Local.issues[0];
        	});

        	

        }
    }
});