# angular-combo-box

[![Join the chat at https://gitter.im/bradleytrager/angular-combo-box](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/bradleytrager/angular-combo-box?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
Lightweight Angular JS directive (~1K minified) which combines a select element with a text input.

[![Build Status](https://travis-ci.org/bradleytrager/angular-combo-box.svg)](https://travis-ci.org/bradleytrager/angular-combo-box)
[![Bower version](https://badge.fury.io/bo/angular-combo-box.svg)](http://badge.fury.io/bo/angular-combo-box)
[![Coverage Status](https://coveralls.io/repos/bradleytrager/angular-combo-box/badge.svg)](https://coveralls.io/r/bradleytrager/angular-combo-box)

[Demo](http://bower.io/search/?q=angular-combo-box)

##Install

####Manual download 
Download latest release from [here](https://github.com/bradleytrager/angular-combo-box/releases)

####Bower
```sh
bower install angular-combo-box
```

##Usage
```html
<combo-box
	label="--Select--" //The default option if nothing is chosen
    options="options" //An array of predefined options
    combo-model="comboModel" //The bound value of the combo box
    other-label="An option not on the list..." //Optional label for other input
    select-class="{'red': true}" //Optional expression for ng-class on select
    input-class="{'green': true}" //Optional expression for ng-class on input
></combo-box>
```
```JavaScript
//Include 'ngComboBox as a module dependency
angular.module('ngComboBoxExample', ['ngComboBox'])
    .controller('myController', function ($scope) {
    $scope.options = [
        //List of predefined options    
    ];
    //The bound value of the combo box
    $scope.comboModel = null;
});
```