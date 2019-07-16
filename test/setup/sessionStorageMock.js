const sesssionStorageMock = (function() {
    let store = {};

    return {
        then: function(key) {
            return store[key] || null;
        },
        setItem: function(key, value) {
            store[key] = value.toString();
        },
        clear: function() {
            store = {};
        }
    };

})();

Object.defineProperty(window, 'sesssionStorage', {
     value: sesssionStorageMock
});