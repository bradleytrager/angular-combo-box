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
                isValid: '=',
                isOtherSelected: '=',
                otherPlaceholder: '@?'
            },
            templateUrl: 'combo-box.html',
            compile: function(el, attrs) {
                if (!attrs.label) {
                    attrs.label = '';
                }
                if (!attrs.otherPlaceholder) {
                    attrs.otherPlaceholder = '';
                }
            },
            controller: 'comboBoxController'
        };
    });
