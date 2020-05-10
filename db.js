const { DataStore } = require('notarealdb');

const store = new DataStore('./graphql_data');

module.exports = {
   students:store.collection('students'),
   colleges:store.collection('colleges'),
   librarylist:store.collection('playlistlibrary'),
   playlists:store.collection('playlist'),
   messagelist:store.collection('message'),
};
