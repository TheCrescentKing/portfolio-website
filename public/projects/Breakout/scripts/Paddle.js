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

function Paddle(playerName, x, y, colour){
    let canvas = O("canvas");
    let properties = {name:playerName, colour:colour, score:0};

    if(window.innerHeight > window.innerWidth){
        properties.width = canvas.height/10;
        properties.height = canvas.width/20;
        properties.yPos = y - properties.height;
        properties.xPos = x - properties.width/2;
    }else{
        properties.width = canvas.width/10;
        properties.height = canvas.height/20;
        properties.yPos = y - properties.height;
        properties.xPos = x - properties.width/2;
    }

    this.getWidth = function () {
        return properties.width;
    };

    this.getHeight = function () {
        return properties.height;
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

    this.getColour = function(){
        return properties.colour;
    };

    this.setColour = function(c){
        properties.colour = c;
    };

    this.getScore = function(){
        return properties.score;
    };

    this.setScore = function (s) {
        properties.score = s;
    };

    this.getProperties = function () {
        return properties;
    };
}