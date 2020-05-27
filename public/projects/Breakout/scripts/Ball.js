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

function Ball(x, y, colour){
    let canvas = O("canvas");
    let properties = {xPos:x, yPos:y, xVelocity:0, yVelocity:0, colour:colour};

    if(window.innerHeight > window.innerWidth){
        properties.radius = canvas.width/30;
    }else {
        properties.radius = canvas.height/35;
    }

    this.getY = function () {
        return properties.yPos;
    };

    this.setY = function (y) {
        properties.yPos = y;
    };

    this.getX = function () {
        return properties.xPos;
    };

    this.setX = function (x) {
        properties.xPos = x;
    };

    this.setXVelocity = function (xV) {
        if(properties.xVelocity + xV > canvas.width/8){
            properties.xVelocity = canvas.width/8;
        }else{
            properties.xVelocity = xV;
        }
    };

    this.getXVelocity = function () {
        return properties.xVelocity;
    };

    this.setYVelocity = function (yV) {
        properties.yVelocity = yV;
    };

    this.getYVelocity = function () {
        return properties.yVelocity;
    };

    this.getRadius = function(){
      return properties.radius;
    };

    this.getColour = function(){
      return properties.colour;
    };

    this.setColour = function(c){
        properties.colour = c;
    };

    this.getProperties = function () {
        return properties;
    };

}