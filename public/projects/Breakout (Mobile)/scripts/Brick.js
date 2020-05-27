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

function Brick(x, y, brickWidth, brickHeight, colour){
    let canvas = O("canvas");
    let properties = {xPos:x, yPos:y, width:brickWidth, height:brickHeight, colour:colour, destroyed:false};

    /*
    if(window.innerHeight > window.innerWidth){
        properties.width = canvas.height/10;
        properties.height = canvas.width/20;
    }else{
        properties.width = canvas.width/2;
        properties.height = canvas.height/10;
    }
    */

    this.getProperties = function () {
        return properties;
    };

    this.getWidth = function () {
        return properties.width;
    };

    this.setWidth = function (w) {
        properties.width = w;
    };

    this.getHeight = function () {
        return properties.height;
    };

    this.setHeigth = function (h) {
        properties.height = h;
    };

    this.getX = function () {
        return properties.xPos;
    };

    this.setX = function (x) {
        properties.xPos = x;
    };

    this.getY = function () {
        return properties.yPos;
    };

    this.setY = function (y) {
        properties.yPos = y;
    };

    this.getColor = function () {
        return properties.color;
    };

    this.setColor = function (c) {
        this.properties.color = c;
    };

    this.isDestroyed = function(){
        return properties.destroyed;
    };

    this.setDestroyed = function(){
        properties.destroyed = true;
    };
}