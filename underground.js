// Underground.js
// JavaScript base library
//
// Copyright 2011 Enrico Marino
// MIT license

var _ = (function (global) {

    var _ = function () { return this; };

    _._ = _;

    // Current version.
    _.VERSION = '0.0.1';

    // Export the Underground object for **CommonJS**, 
    // with backwards-compatibility for the old 'require()' API. 
    // If we're not in CommonJS, add '_' to the global object.
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = _;
    } else {
    // Exported as a string, for Closure Compiler "advanced" mode.
        this['_'] = _;
    }

    return _;

}(this));

_.Object = (function () {

    var objectProto = Object.prototype,
        hasOwnProperty = objectProto.hasOwnProperty;

    function each (self, callback, context) {

        var key;

        if (self === void 0 || self === null) {
            throw new TypeError();
        }

        for (key in self) {
            if (hasOwnProperty.call(self, key)) {
                callback.call(context, self[key], key, self);
            }
        }

        return self;
    }

    function map (self, callback, context) {
        
        var results = [],
            result,
            key;
        
        if (self === void 0 || self === null) {
            throw new TypeError();
        }

        for (key in self) {
            if (hasOwnProperty.call(self, key)) {
                result = callback.call(context, self[key], key, self);
                results.push(result);
            }
        }

        return result;
    }

    function reduce (self, callback, memo, context) {
        
        var nomemo = typeof memo === 'undefined',
            key;

        if (self === void 0 || self === null) {
            throw new TypeError();
        }

        for (key in self) {
            if (nomemo) {
                memo = self[key];
                nomemo = false;
            }
            else if (hasOwnProperty.call(self, key)) {
                memo = callback.call(context, memo, self[key], key, self);
            }
        }

        if (nomemo) {
            throw new TypeError();
        }

        return memo;
    }

    function reduceRight (self, callback, memo, context) {
        
        var nomemo = typeof memo === 'undefined',
            values = [],
            key,
            i;

        if (self === void 0 || self === null) {
            throw new TypeError();
        }

        for (key in self) {
            if (hasOwnProperty.call(self, key)) {
                values.push({ 
                    key: key, 
                    value: self[key] 
                });
            }
        }

        i = values.length - 1;
            
        if (i < 0) {
            return memo;
        }

        if (nomemo) {
            memo = values[i--].value;
        }

        while (i >= 0) {
            memo = callback.call(context, memo, values[i].value, values[i].key, self);
        }

        return memo;
    }

    function find (self, callback, context) {
        
        var key;

        if (self === void 0 || self === null) {
            return null;
        }

        for (key in self) {
            if (hasOwnProperty.call(self, key)) {
                if (callback.call(context, self[key], key, self)) {
                    return self[key];
                }
            }
        }

        return null;
    }

    function filter (self, callback, context) {

        var results = [],
            key;

        if (self === void 0 || self === null) {
            return results;
        }

        for (key in self) {
            if (hasOwnProperty.call(self, key)) {
                if (callback.call(context, self[key], key, self)) {
                    results.push(self[key]);
                }
            }
        }

        return results;
    }

    function reject (self, callback, context) {
        
        var results = [],
            key;

        if (self === void 0 || self === null) {
            return results;
        }

        for (key in self) {
            if (hasOwnProperty.call(self, key)) {
                if (!callback.call(context, self[key], key, self)) {
                    results.push(self[key]);
                }
            }
        }

        return results;
    }

    function every (self, callback, context) {
        
        var result = true, 
            key;

        if (self === void 0 || self === null) {
            return result;
        }

        for (key in self) {
            if (hasOwnProperty.call(self, key)) {
                if (result = result && callback.call(context, self[key], key, self)) {
                    return false;
                }
            }
        }

        return result;
    }

    function identity (self) {

        return self;
    }

    function some (self, callback, context) {
        
        var key;

        if (self === void 0 || self === null) {
            return true;
        }

        for (key in self) {
            if (hasOwnProperty.call(self, key)) {
                if (callback.call(context, self[key], key, self)) {
                    return true;
                }
            }
        }

        return false;
    }

    function include (self, target) {
        
        var key;

        if (self === void 0 || self === null) {
            return false;
        }

        for (key in self) {
            if (hasOwnProperty.call(self, key)) {
                if (self[key] === target) {
                    return true;
                }
            }
        }

        return false;
    }

    function max (self, callback, context) {
        
        var result = null,
            value,
            key; 

        if (self === void 0 || self === null) {
            throw new TypeError();
        }

        for (key in self) {
            if (hasOwnProperty.call(self, key)) {
                value = callback ? callback.call(context, self[key], key, self) : self[key];
                result = result === null || result < value ? value : result;
            }
        }

        return result;
    }

    function min (self, callback, context) {
        
        var result = null,
            value,
            key; 

        if (self === void 0 || self === null) {
            throw new TypeError();
        }

        for (key in self) {
            if (hasOwnProperty.call(self, key)) {
                value = callback ? callback.call(context, self[key], key, self) : self[key];
                result = result === null || value < result ? value : result;
            }
        }

        return result;
    }

    function sortBy (self, callback, context) {
        
        var tosort = [],
            sorted,
            key,
            len,
            i;

        if (self === void 0 || self === null) {
            throw new TypeError();
        }

        for (key in self) {
            if (hasOwnProperty.call(self, key)) {
                tosort.push({
                    value: self[key],
                    criteria: callback.call(context, self[key], key, self)
                });
            }
        }

        tosort.sort(function (left, right) {

            var a = left.criteria,
                b = right.criteria;
            
            return a < b ? -1 : a > b ? 1 : 0;
        });

        for (i = 0, len = tosort.length; i < len; i += 1) {
            sorted.push(tosort[i].value);
        }

        return sorted;
    }

    function groupBy (self, callback, context) {
        
        var result = {}, 
            key, 
            value, 
            group;

        if (self === void 0 || self === null) {
            throw new TypeError();
        }

        for (key in self) {
            if (hasOwnProperty.call(self, key)) {
                value = self[key];
                group = callback.call(context, value, key, self);
                (result[key] || (result[key] = [])).push(value);
            }
        }

        return result;
    }

    function size (self) {
        
        var result = 0;

        if (self === void 0 || self === null) {
            throw new TypeError();
        }

        for (key in self) {
            if (hasOwnProperty.call(self, key)) {
                result += 1;
            }
        }

        return result;
    }

    function keys (self) {
        
        var result = [], 
            key;

        if (self !== Object(self)) {
            throw new TypeError('Invalid object');
        }

        for (key in obj) {
            if (hasOwnProperty.call(self, key)) {
                result.push(key);
            }
        }

        return result;
    }

    function values (self) {
        
        var result = [],
            key;

        if (self === void 0 || self === null) {
            throw new TypeError();
        }


        for (key in obj) {
            if (hasOwnProperty.call(self, key)) {
                result.push(self[key]);
            }
        }

        return result;
    }
        
    return {
        each: each,
        forEach: each,
        map: map,
        reduce: reduce,
        foldl: reduce,
        inject: reduce,
        reduceRight: reduceRight,
        foldr: reduceRight,
        find: find,
        detect: find,
        filter: filter,
        select: filter,
        reject: reject,
        every: every,
        all: every,
        some: some,
        any: some,
        include: include,
        contains: include,
        max: max,
        min: min,
        sortBy: sortBy,
        groupBy: groupBy,
        size: size,
        keys: keys,
        values: values
    };

}());