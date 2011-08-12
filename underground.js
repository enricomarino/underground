// Underground.js
// JavaScript base library
//
// Copyright 2011 Enrico Marino
// MIT license

var _ = (function (context) {

    // underground
    function _ (self) { return self; };

    // love thyself
    _._ = _;

    // version
    _.VERSION = '0.0.1';

    // export for CommonJS 
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = _;
    } else {
        context['_'] = _;
    }

    return _;

}(this));

_.object = (function (context, undefined) {

    var _hasOwn = {}.hasOwnProperty,
        _toString = {}.toString,
        _slice = [].slice;
    
    function create (self) {

        return {
            _: self,
            _chainable: true
        };
    }

    function each (self, callback, context) {

        var key;

        for (key in self) {
            if (_hasOwn.call(self, key)) {
                callback.call(context, self[key], key, self);
            }
        }

        return self;
    }

    function map (self, callback, context) {
        
        var results = [],
            result,
            key;
        
        for (key in self) {
            if (_hasOwn.call(self, key)) {
                result = callback.call(context, self[key], key, self);
                results.push(result);
            }
        }

        return result;
    }

    function reduce (self, callback, memo, context) {
        
        var key;

        for (key in self) {
            if (_hasOwn.call(self, key)) {
                memo = (memo === undefined) 
                    ? self[key] 
                    : callback.call(context, memo, self[key], key, self);
            }
        }

        if (memo === undefined) {
            throw new TypeError();
        }

        return memo;
    }

    function reduceRight (self, callback, memo, context) {
        
        var values = [],
            key,
            i;
        
        for (key in self) {
            if (_hasOwn.call(self, key)) {
                values.push({ key: key, value: self[key] });
            }
        }

        i = values.length - 1;
            
        if (i < 0) {
            return memo;
        }

        if (memo === undefined) {
            memo = values[i].value;
        }

        while (i-- >= 0) {
            memo = callback.call(context, memo, values[i].value, values[i].key, self);
        }

        return memo;
    }

    function find (self, callback, context) {
        
        var key;

        if (self === undefined || self === null) {
            return null;
        }

        for (key in self) {
            if (_hasOwn.call(self, key) && callback.call(context, self[key], key, self)) {
                return self[key];
            }
        }

        return null;
    }

    function filter (self, callback, context) {

        var results = [],
            key;

        if (self === undefined || self === null) {
            return results;
        }

        for (key in self) {
            if (_hasOwn.call(self, key) && callback.call(context, self[key], key, self)) {
                    results.push(self[key]);
            }
        }

        return results;
    }

    function reject (self, callback, context) {
        
        var results = [],
            key;

        if (self === undefined || self === null) {
            return results;
        }

        for (key in self) {
            if (_hasOwn.call(self, key) && !callback.call(context, self[key], key, self)) {
                results.push(self[key]);
            }
        }

        return results;
    }

    function every (self, callback, context) {
        
        var key;

        if (self === undefined || self === null) {
            return true;
        }

        for (key in self) {
            if (_hasOwn.call(self, key) && !callback.call(context, self[key], key, self)) {
                return false;
            }
        }

        return true;
    }

    function identity (self) {

        return self;
    }

    function some (self, callback, context) {
        
        var key;

        if (self === undefined || self === null) {
            return false;
        }

        for (key in self) {
            if (_hasOwn.call(self, key) && callback.call(context, self[key], key, self)) {
                return true;
            }
        }

        return false;
    }

    function include (self, target) {
        
        var key;

        if (self === undefined || self === null) {
            return false;
        }

        for (key in self) {
            if (_hasOwn.call(self, key) && self[key] === target) {
                return true;
            }
        }

        return false;
    }

    function max (self, callback, context) {
        
        var result = null,
            value,
            key; 

        if (self === undefined || self === null) {
            throw new TypeError();
        }

        for (key in self) {
            if (_hasOwn.call(self, key)) {
                value = callback ? callback.call(context, self[key], key, self) : self[key];
                result = (result === null || result < value) ? value : result;
            }
        }

        return result;
    }

    function min (self, callback, context) {
        
        var result = null,
            value,
            key; 

        if (self === undefined || self === null) {
            throw new TypeError();
        }

        for (key in self) {
            if (_hasOwn.call(self, key)) {
                value = callback ? callback.call(context, self[key], key, self) : self[key];
                result = (result === null || value < result) ? value : result;
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

        if (self === undefined || self === null) {
            throw new TypeError();
        }

        for (key in self) {
            if (_hasOwn.call(self, key)) {
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

        if (self === undefined || self === null) {
            throw new TypeError();
        }

        for (key in self) {
            if (_hasOwn.call(self, key)) {
                value = self[key];
                group = callback.call(context, value, key, self);
                (result[key] || (result[key] = [])).push(value);
            }
        }

        return result;
    }

    function size (self) {
        
        var result = 0;

        if (self === undefined || self === null) {
            throw new TypeError();
        }

        for (key in self) {
            if (_hasOwn.call(self, key)) {
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
            if (_hasOwn.call(self, key)) {
                result.push(key);
            }
        }

        return result;
    }

    function values (self) {
        
        var result = [],
            key;

        if (self === undefined || self === null) {
            throw new TypeError();
        }

        for (key in obj) {
            if (_hasOwn.call(self, key)) {
                result.push(self[key]);
            }
        }

        return result;
    }
    
    function functions (self) {
        
        var result = [],
            key;
        
        for (key in self) {
            if (_hasOwn.call(self, key) && typeof self[key] === 'function') {
                result.push(key);
            }
        }

        return result;
    }

    function extend (self) {
        
        var sources = _slice.call(arguments, 1), 
            source,
            i,
            key;

        for (i in sources) {
            source = sources[i];
            for (key in source) {
                if (_hasOwn.call(source, key)) {
                    self[key] = source[key];
                }
            }
        }

        return self;
    }

    function defaults (self) {
        
        var sources = _slice.call(arguments, 1), 
            source,
            i,
            key;

        for (i in sources) {
            source = sources[i];
            for (key in source) {
                if (_hasOwn.call(source, key) && self[key] === null) {
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
            if (_hasOwn.call(self, key)) {
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
            if (_hasOwn.call(self, key)) {
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

}(this));

_.array = (function (context, undefined) {
    
    var _hasOwn = {}.hasOwnProperty,
        _toString = {}.toString,
        _slice = [].slice,
        _max = Math.max,
        _min = Math.min;

    function create (self) {
        
        return {
            _: self,
            _chainable: true
        };
    }

    function each (self, callback, context) {

        var i,
            len;
        
        if (self === undefined || self === null) {
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

        if (self === undefined || self === null) {
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

        if (self === undefined || self === null) {
            throw new TypeError();
        }
                
        var i = 0,
            len = self.length;

        if (memo === undefined) {
            if (len === 0) {
                throw new TypeError();
            }
            i = 1;
            memo = self[0];
        }

        while (++i < len) {
            if (i in self) {
                memo = callback.call(context, memo, self[i], i, self);
            }
        }

        return memo;
    }

    function reduceRight (self, callback, memo, context) {
        
        if (self === undefined || self === null) {
            throw new TypeError();
        }

        var len = self.length,
            i = len;
        
        if (memo === undefined) {
            if (len === 0) {
                throw new TypeError();
            }
            i = len - 1;
            memo = self[i];
        }

        while (i--) {
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

        if (self === undefined || self === null) {
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


        if (self === undefined || self === null) {
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

        if (self === undefined || self === null) {
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
           
        if (self === undefined || self === null) {
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
           
        if (self === undefined || self === null) {
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
           
        if (self === undefined || self === null) {
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

        if (self === undefined || self === null) {
            return;
        }

        for (i = 0, len = self.length; i < len; i += 1) {
            if (i in self && key in self[i] && _hasOwn.call(self[i], key)) {
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
        
        if (callback === undefined) {
            return _max(self);
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
        
        if (callback === undefined) {
            return _min(self);
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
        
        return (n !== null) ? _slice.call(self, 0, n) : self[0];
    }

    function rest (self, index) {
        
        return _slice.call(self, (index === null) ? 1 : index);
    }

    function last (self) {
        
        return self[self.length - 1];
    }

    function compact (self) {
        
        var result = [],
            i,
            len;
        
        if (self === undefined) {
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
        
        var values = _slice.call(arguments, 1),
            result = [],
            i, 
            len;
        
        if (self === undefined) {
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
            arrays = _slice.call(arguments, 1),
            array,
            value,
            i,
            j,
            n,
            len;

        for (j = 0, n = arrays.length; j < n; j += 1) {
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

        return result;
    }

    function intersection (self) {
        
        var result = [],
            arrays = _slice.call(arguments, 1),
            n = arrays.length;
            value,
            i,
            j,
            n,
            len,

        if (n === 0) {
            return _slice.call(self);
        }

        for (i = 0, len = self.length; i < len; i += 1) {
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
            arrays = _slice.call(arguments),
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

}(this));

_.string = (function (context, undefined) {

    function create (self) {

        return {
            _: self,
            _chainable: true
        };        
    }

    function isBlank (self){
        
        return !!self.match(/^\s*$/);
    }

    function capitalize (self) {
        
        return self.charAt(0).toUpperCase() + self.substring(1).toLowerCase();
    },

    function chop (self, step) {

        var result = [],
            len,
            i;

        for (i = 0, len = self.length, step = step || len; i < len; i += step) {
            result.push(self.slice(i, i + step));
        }

        return result;
    },

    function count (self, substr){
        
        var result = 0, 
            len,
            i,
            index = 0
            step = substr.length;
        
        for (i = 0, len = self.length; i < len; i += index + step) {
            index = self.indexOf(substr, i);
            if (index < 0) {
                return result;
            }
            result += 1;
        }

        return result;
    },

    function chars (self) {

        return self.split('');
    }

    function escapeHTML (self) {
        
        return self
            .replace(/&/g,'&amp;')
            .replace(/</g,'&lt;')
            .replace(/>/g,'&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, "&apos;");
    }

    function unescapeHTML (self) {
        
        return self
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&apos;/g, "'");
    }

    function escapeRegExp (self) {

        return self
            .replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1');
    }

    function insert (self, i, substr) {
        
        return self
            .split('')
            .splice(i, 0, substr)
            .join('');
    }

    function includes (self, s) {
        
        return self.indexOf(s) !== -1;
    }

    function lines (self) {
        
        return self.split('\n');
    }

    function splice (self, i, howmany, substr) {
        
        return self
            .split('')
            .splice(i, howmany, substr)
            .join('');
    }

    function startsWith (self, starts) {
        
        return self.length >= starts.length && self.substring(0, starts.length) === starts;
    }

    function endsWith (self, ends) {
        
        return self.length >= ends.length && self.substring(self.length - ends.length) === ends;
    }

    function camelize (self) {
    
        return self
            .trim()
            .replace(/(\-|_|\s)+(.)?/g, function (match, separator, chr) {
                return chr ? chr.toUpperCase() : '';
            });
    }

    function underscored (self) {
    
        return self
            .trim()
            .replace(/([a-z\d])([A-Z]+)/g, '$1_$2')
            .replace(/\-|\s+/g, '_')
            .toLowerCase();
    }

    function dasherize (self) {
        
        return self
            .trim()
            .replace(/([a-z\d])([A-Z]+)/g, '$1-$2')
            .replace(/^([A-Z]+)/, '-$1')
            .replace(/\_|\s+/g, '-')
            .toLowerCase();
    }

    function truncate (self, length, truncation){
        
        truncation = truncation || '...';
        
        return self.slice(0,length) + truncation;
    }

    function words (self, delimiter) {
        
        delimiter = delimiter || " ";
        
        return self.split(delimiter);
    }

    return {
        isBlank: isBlank,
        capitalize: capitalize,
        chop: chop,
        count: count,
        chars: chars,
        escapeHTML: escapeHTML,
        unescapeHTML: unescapeHTML,
        escapeRegExp: escapeRegExp,
        insert: insert,
        includes: includes,
        lines: lines,
        splice: splice,
        startsWith: startsWith,
        endsWith: endsWith,
        camelize: camelize,
        underscored: underscored,
        dasherize: dascherize,
        truncate: truncate,
        words: words
    };
    
}(this));