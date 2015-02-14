'use strict';

angular.module('articles').directive('wysihtml5', [ '$timeout',
	function($timeout) {
        return {
            template: '<textarea></textarea>',
            require: 'ngModel',
            restrict: 'E',
            link: function postLink($scope, $element, attrs, ngModel) {
                // Find the textarea defined in your Template
                var textarea = $element.find("textarea");

                // When your model changes from the outside, use ngModel.$render to update the value in the textarea
                ngModel.$render = function () {
                    textarea.val(ngModel.$viewValue);
                };

                // Create the editor itself, use TinyMCE in your case
                var editor = new wysihtml5.Editor(textarea[0],
                    {
                        stylesheets: [""],
                        parserRules: wysihtml5ParserRules,
                        toolbar: true,
                        autoLink: true,
                        useLineBreaks: false
                    });

                // Ensure editor is rendered before binding to the change event
                $timeout(function () {

                    // On every change in the editor, get the value from the editor (textarea in case of studenttexteditor)
                    // and set your model
                    editor.on('change', function () {
                        var newValue = textarea.val();

                        if (!$scope.$$phase) {
                            $scope.$apply(function () {
                                ngModel.$setViewValue(newValue);
                            });
                        }
                    });

                }, 500);
            }
        };
    }
]);
