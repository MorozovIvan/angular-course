angular.module('testApp', [])
    .controller('TextBlockController', function() {
        this.visible = true;

        this.hideShow = function(){
            this.visible = !this.visible;
        }
    });