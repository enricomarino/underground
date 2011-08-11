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
    if (module !== void 0 && module.exports) {
        module.exports = _;
    } else {
    // Exported as a string, for Closure Compiler "advanced" mode.
        this['_'] = _;
    }

    return _;

}(this));

_.Object = (function () {

    var __has = {}.hasOwnProperty,
        __toString = {}.toString,
        __slice = [].slice;
    
    function each (self, callback, context) {

        var key;

        if (self === void 0 || self === null) {
            return;
        }

        for (key in self) {
            if (__has.call(self, key)) {
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
            if (__has.call(self, key)) {
                result = callback.call(context, self[key], key, self);
                results.push(result);
            }
        }

        return result;
    }

    function reduce (self, callback, memo, context) {
        
        var nomemo = memo === void 0,
            key;

        if (self === void 0 || self === null) {
            throw new TypeError();
        }

        for (key in self) {
            if (__has.call(self, key)) {
                if (nomemo) {
                    memo = self[key];
                    nomemo = false;
                }
                else {
                    memo = callback.call(context, memo, self[key], key, self);
                }
            }
        }

        if (nomemo) {
            throw new TypeError();
        }

        return memo;
    }

    function reduceRight (self, callback, memo, context) {
        
        var nomemo = memo === void 0,
            values = [],
            key,
            i;

        if (self === void 0 || self === null) {
            throw new TypeError();
        }

        for (key in self) {
            if (__has.call(self, key)) {
                values.push({ key: key, value: self[key] });
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
            if (__has.call(self, key)) {
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
            if (__has.call(self, key)) {
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
            if (__has.call(self, key)) {
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
            if (__has.call(self, key)) {
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
            if (__has.call(self, key)) {
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
            if (__has.call(self, key)) {
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
            if (__has.call(self, key)) {
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
            if (__has.call(self, key)) {
                value = callback ? callback.call(context, self[key], key, self) : self[key];
                result = result === null || value < result ? value : result;
            }
        }

        return result;
    }

    function sortBy (self, callback, context) {
        
        var result = [],
            key,
            len,
            i;

        function comparator (left, right) {

            var a = left.criteria,
                b = right.criteria;
            
            return a < b ? -1 : a > b ? 1 : 0;
        }

        if (self === void 0 || self === null) {
            throw new TypeError();
        }

        for (key in self) {
            if (__has.call(self, key)) {
                result.push({ value: self[key], criteria: callback.call(context, self[key], key, self) });
            }
        }

        result.sort(comparator);

        for (i = 0, len = result.length; i < len; i += 1) {
            result[i] = result[i].value;
        }

        return result;
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
            if (__has.call(self, key)) {
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
            if (__has.call(self, key)) {
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
            if (__has.call(self, key)) {
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
            if (__has.call(self, key)) {
                result.push(self[key]);
            }
        }

        return result;
    }
    
    function functions (self) {
        
        var result = [],
            key;
        
        for (key in self) {
            if (__has.call(self, key)) {
                if (__toString.call(self[key]) === '[object Function]') {
                    result.push(key);
                } 
            }
        }

        return result;
    }

    function extend (self) {
        
        var sources = __slice.call(arguments, 1), 
            source,
            i,
            key;

        for (i in sources) {
            source = sources[i];
            for (key in source) {
                if (__has.call(source, key)) {
                    self[key] = source[key];
                }
            }
        }

        return self;
    }

    function defaults (self) {
        
        var sources = __slice.call(arguments, 1), 
            source,
            i,
            key;

        for (i in sources) {
            source = sources[i];
            for (key in source) {
                if (__has.call(source, key) && self[key] === null) {
                    self[key] = source[key];
                }
            }
        }

        return self;
    }

    function clone (self) {
        
        var clone = {},
            key;

        for (key in self) {
            if (__has.call(self, key)) {
                clone[key] = self[key];
            }
        }

        return clone;
    }

    function tap (self, callback) {
        
        callback(self);

        return self;
    }
        
    function isEmpty (self) {
        
        var key;

        for (key in self) {
            if (__has.call(self, key)) {
                return false;
            }
        }

        return true;
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
        values: values,
        functions: functions,
        extend: extend,
        defaults: defaults,
        clone: clone,
        tap: tap,
        isEmpty: isEmpty
    };

}());

_.Array = (function () {
    
    var __has = {}.hasOwnProperty,
        __toString = {}.toString,
        __slice = [].slice,
        __max = Math.max,
        __min = Math.min;

    function each (self, callback, context) {

        var i,
            len;
        
        if (self === void 0 || self === null) {
            return;
        }

        for (i = 0, len = self.length; i < len; i += 1) {
            if (i in self) {
                callback.call(context, self[i], i, self);
            }
        }

        return self;
    }

    function map (self, callback, context) {
        
        var results = [],
            i,
            len;

        if (self === void 0 || self === null) {
            return;
        }

        for (i = 0, len = self.length; i < len; i += 1) {
            if (i in self) {
                results.push(callback.call(context, self[i], i, self));
            }
        }

        return self;
    }

    function reduce (self, callback, memo, context) {
        
        var nomemo = memo === void 0,
            i,
            len;
        
        if (self === void 0 || self === null) {
            throw new TypeError();
        }

        len = self.length;

        if (nomemo && len === 0) {
            throw new TypeError();
        }

        for (i = nomemo ? 0 : 1, memo = nomemo ? self[0] : memo; i < len; i += 1) {
            if (i in self) {
                memo = callback.call(context, memo, self[i], i, self);
            }
        }

        return memo;
    }

    function reduceRight (self, callback, memo, context) {
        
        var nomemo = memo === void 0,
            i,
            len;
        
        if (self === void 0 || self === null) {
            throw new TypeError();
        }

        len = self.length;

        if (nomemo && len === 0) {
            throw new TypeError();
        }

        for (i = nomemo ? len - 1 : len, memo = nomemo ? self[len - 1] : memo; i--; ) {
            if (i in self) {
                memo = callback.call(context, memo, self[i], i, self);
            }
        }

        return memo;
    }

    function reduceRight (self, callback, memo, context) {
        
        var nomemo = memo === void 0,
            i,
            len;
        
        if (self === void 0 || self === null) {
            throw new TypeError();
        }

        len = self.length;

        if (nomemo && len === 0) {
            throw new TypeError();
        }

        for (i = nomemo ? len - 1 : len, memo = nomemo ? self[len - 1] : memo; i--; ) {
            if (i in self) {
                memo = callback.call(context, memo, self[i], i, self);
            }
        }

        return memo;
    }

    function find (self, callback, context) {
        
        var results = [],
            i,
            len;

        if (self === void 0 || self === null) {
            return null;
        }

        for (i = 0, len = self.length; i < len; i += 1) {
            if (i in self && callback.call(context, self[i], i, self)) {
                return self[i];
            }
        }

        return null;
    }

    function filter (self, callback, context) {
        
        var results = [];


        if (self === void 0 || self === null) {
            return [];
        }

        for (i = 0, len = self.length; i < len; i += 1) {
            if (i in self && callback.call(context, self[i], i, self)) {
                results.push(self[i]);
            }
        }

        return results;
    }


    function reject (self, callback, context) {
        
        var results = [];

        if (self === void 0 || self === null) {
            return [];
        }

        for (i = 0, len = self.length; i < len; i += 1) {
            if (i in self && !callback.call(context, self[i], i, self)) {
                results.push(self[i]);
            }
        }

        return results;
    }

    function every (self, callback, context) {
           
        if (self === void 0 || self === null) {
            return true;
        }

        for (i = 0, len = self.length; i < len; i += 1) {
            if (i in self && !callback.call(context, self[i], i, self)) {
                return false;
            }
        }

        return true;
    }

    function some (self, callback, context) {
           
        if (self === void 0 || self === null) {
            return false;
        }

        for (i = 0, len = self.length; i < len; i += 1) {
            if (i in self && callback.call(context, self[i], i, self)) {
                return true;
            }
        }

        return false;
    }

    function include (self, target) {
           
        if (self === void 0 || self === null) {
            return false;
        }

        for (i = 0, len = self.length; i < len; i += 1) {
            if (i in self && self[i] === target) {
                return true;
            }
        }

        return false;
    }

    function pluck (self, key) {
        
        var result = [],
            i,
            len;

        if (self === void 0 || self === null) {
            return;
        }

        for (i = 0, len = self.length; i < len; i += 1) {
            if (i in self && key in self[i] && __has.call(self[i], key)) {
                result.push(self[i][key]);
            }
        }

        return result;
    }

    function max (self, callback, context) {
        
        var result = null,
            value,
            i,
            len;
        
        if (callback === void 0) {
            return __max(self);
        }

        for (i = 0, len = self.length; i < len; i += 1) {
            if (i in self) {
                value = callback.call(context, self[i], i, self);
                result = result === null || result < value ? value : result;
            }
        }

        return result;
    }

    function min (self, callback, context) {
        
        var result = null,
            value,
            i,
            len;
        
        if (callback === void 0) {
            return __min(self);
        }

        for (i = 0, len = self.length; i < len; i += 1) {
            if (i in self) {
                value = callback.call(context, self[i], i, self);
                result = result === null || value < result ? value : result;
            }
        }

        return result;
    }

    function sortBy (self, callback, context) {
        
        self.sort(function (left, right) {
            var a = callback.call(context, left, self.indexOf(left), self),
                b = callback.call(context, right, self.indexOf(right), self);
            
            return a < b ? -1 : a > b ? 1 : 0;
        });

        return self;
    }

    function groupBy (self, callback, context) {
        
        var result = {},
            key,
            i, 
            len;

        for (i = 0, len = self.length; i < len; i += 1) {
            if (i in self) {
                key = callback.call(context, self[i], i, self);
                (result[key] || (result[key] = [])).push(value);
            }
        }

        return result;
    }

    function identity (self) {

        return self;
    }

    function sortedIndex (self, obj, callback) {
        
        callback = callback || identity;

        var low = 0,
            hight = self.length,
            mid;
        
        while (low < hight) {
            mid = (low + hight) >> 1;
            callback(self[mid]) < callback(obj) ? low = mid + 1 : high = mid;
        }

        return low;
    }

    function size (self) {
        
        return self.length;
    }

    function first (self, n) {
        
        return (n !== null) ? __slice.call(self, 0, n) : self[0];
    }

    function rest (self, index) {
        
        return __slice.call(self, (index === null) ? 1 : index);
    }

    function last (self) {
        
        return self[self.length - 1];
    }

    function compact (self) {
        
        var result = [],
            i,
            len;
        
        if (self === void 0) {
            return result;
        }

        for (i = 0, len = self.length; i < len; i += 1) {
            if (i in self && self[i] !== null) {
                result.push(self[i]);
            }
        }

        return result;
    }

    function without (self) {
        
        var values = __slice.call(arguments, 1),
            result = [],
            i, 
            len;
        
        if (self === void 0) {
            return result;
        }

        for (i = 0, len = self.length; i < len; i += 1) {
            if (i in self && !(self[i] in values)) {
                result.push(self[i]);
            }
        }

        return result;
    }

    function uniq (self, isSorted, callback) {
        
        var result = [],
            i,
            len;
        
        for (i = 0, len = self.length; i < len; i += 1) {
            if (i in self && !(self[i] in result)) {
                result.push(self[i]);
            }
        }

        return result;
    }

    function union () {
        
        var result = [],
            arrays = __slice.call(arguments, 1),
            array,
            value,
            i,
            j,
            n,
            len;

        for (j = 0, n = arrays.length; j < n; j += 1) {
            if (j in arrays) {
                array = arrays[j];
                for (i = 0, len = array.length; i < len; i += 1) {
                    if (i in array) {
                        value = array[i];
                        if (result.indexOf(value) >= 0) {
                            result.push(array[i]);
                        }
                    }
                }
            }
        }

        return result;
    }

    function intersection (self) {
        
        var result = [],
            arrays = __slice.call(arguments, 1),
            n = arrays.length;
            value,
            i,
            j,
            n,
            len,

        if (n === 0) {
            return __slice.call(self);
        }

        for (i = 0, len = self.length; i < len; i += 1) {
            if (i in self) {
                value = self[i];
                if (result.indexOf(value) < 0) {
                    intersect = true;
                    for (j = 0, n = arrays.lenght; intersect && j < n; j += 1) {
                        intersect = arrays[j].indexOf(value);
                    }
                    if (intersect) {
                        result.push(value);
                    }
                }
            }
        }

        return result;
    }

    function difference (self, other) {
        
        var result = [],
            value,
            i,
            len;

        for (i = 0, n = self.length; i < len; i += 1) {
            if (i in self) {
                value = self[i];
                if (self.indexOf(value) < 0 && result.indexOf(value) < 0) {
                    result.push(value);
                }
            }
        }

        return result;
    }

    function zip () {
        
        var result,
            arrays = __slice.call(arguments),
            array,
            i,
            j,
            n = arrays.length,
            len = 0;
        
        for (j = 0; j < n; j += 1) {
            array = arrays[j];
            len = len > array.length ? len : array.length;
        }

        result = new Array(len);

        for (i = 0, i < len; i += 1) {
            result[i] = new Array(n);
            for (j = 0; j < n; j += 1) {
                result[i][j] = arrays[j][i];
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
        pluck: pluck,
        max: max,
        min: min,
        sortBy: sortBy,
        groupBy: groupBy,
        identity: identity,
        sortedIndex: sortedIndex,
        size: size,
        first: first,
        head: first,
        rest: rest,
        tail: rest,
        last: last,
        compact: compact,
        uniq: uniq,
        unique: unique,
        union: union,
        intersection: intersection,
        intersect: intersect,
        difference: difference,
        zip: zip
    };

}());