/*jshint node: true */
/*jshint esversion: 6 */
"use strict";

/* Shorthand functions */

function O(i){
    return typeof  i === "object" ? i : document.getElementById(i);
}
function S(i) {
    return O(i).style;
}
function C(i) {
    return document.getElementsByClassName(i);
}
function N(i) {
    return document.getElementsByName(i);
}