function json2json(json){
    var result = {};
    var keys = Object.keys(json);
    keys.forEach(function(key){
        result[key] = (json[key]);
    });
    return result;
}
function getUser() {
    // Code here
}

function getUsers() {
    // Code here
}

module.exports = {
    getUser,
    getUsers,
    json2json
}