angular.module('ngComboBox.directive', [])
    .directive('comboBox', function($timeout) {
        return {
            restrict: 'E',
            scope: {
                options: '=',
                comboModel: '=',
                label: '@?',
                inputClass: '=',
                selectClass: '=',
                required: '=',
                isValid: '='
            },
            templateUrl: 'combo-box.html',
            compile: function(el, attrs) {
                if (!attrs.otherLabel) {
                    attrs.otherLabel = 'Other';
                }
                if (!attrs.label) {
                    attrs.label = '';
                }
            },
            controller: 'comboBoxController'
        };
    });
