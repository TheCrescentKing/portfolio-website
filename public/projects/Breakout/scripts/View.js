/*jshint node: true */
/*jshint esversion: 6 */
"use strict";
/*
 * Code for University of Strathclyde Mobile App Development.
 * Developed by John McMenemy 2019.
 *
 * Code confidential to developer and course examiners.
 *
 */

function View(){
    let canvas = O("canvas");

    this.init = function(){
        let viewportDiv = O("whole");
        canvas.width = viewportDiv.clientWidth;
        canvas.height = viewportDiv.clientHeight;
        this.clearCanvas();
    };

    this.clearCanvas = function(){
        this.getContext().clearRect(0, 0, canvas.width, canvas.height);
    };

    this.getContext = function(){
        return canvas.getContext("2d");
    };

    this.drawRectangle = function(rectangle){
        let properties = rectangle.getProperties();
        let context = this.getContext();

        context.fillStyle = properties.colour;
        context.fillRect(properties.xPos, properties.yPos, properties.width, properties.height);
    };

    this.drawCircle = function(circle){
        let properties = circle.getProperties();
        let context = this.getContext();

        context.beginPath();
        context.arc(properties.xPos, properties.yPos, properties.radius, 0, 2 * Math.PI);
        context.fillStyle = properties.colour;
        context.fill();
        context.closePath();
    };

    this.setClickListenerFunction = function (f) {
        window.addEventListener("click", f);
    };

    this.removeClickListenerFunction = function (f) {
      window.removeEventListener('click', f);
    };

    this.setMotionListenerFunction = function(f){
        window.addEventListener("devicemotion", f);
    };

    this.showLossScreen = function(score){
        S("loss").visibility = "visible";
        O("lossScore").innerText = "You destroyed " + score + " bricks!";
    };

    this.hideLossScreen = function () {
        S("loss").visibility = "hidden";
    };

    this.showWinScreen = function(){
        S("win").visibility = "visible";
    };

    this.hideWinScreen = function () {
        S("win").visibility = "hidden";
    };
}