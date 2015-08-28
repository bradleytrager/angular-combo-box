angular.module('ngComboBox.directive', [])
    .directive('comboBox', function($timeout) {
        return {
            restrict: 'E',
            scope: {
                options: '=',
                comboModel: '=',
                otherLabel: '@?',
                label: '@?',
                inputClass: '=',
                selectClass: '=',
                required: '=?',
                isValid: '=?',
                isOtherSelected: '=?',
                otherPlaceholder: '@?'
            },
            templateUrl: 'combo-box.html',
            compile: function(el, attrs) {
                if (!attrs.otherLabel) {
                    attrs.otherLabel = 'Other';
                }
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
