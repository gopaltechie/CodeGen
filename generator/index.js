module.exports = function (plop) {
    plop.setGenerator('component', require('./component/index.js'));
    plop.setGenerator('page', require('./page/index.js'));
    plop.setGenerator('list', require('./list/index.js'));
};