// Underground.js
// JavaScript base library
//
// Copyright 2011 Enrico Marino
// MIT license

(function (global) {

    var _ = function () { return this; };

    // Export the Underground object for **CommonJS**, 
    // with backwards-compatibility for the old 'require()' API. 
    // If we're not in CommonJS, add '_' to the global object.
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = _;
    } else {
    // Exported as a string, for Closure Compiler "advanced" mode.
        global['_'] = _;
    }

    _._ = _;

    // Current version.
    _.VERSION = '0.0.1';



}(this));