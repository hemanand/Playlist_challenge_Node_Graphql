const { DataStore } = require('notarealdb');

const store = new DataStore('./graphql_data');

module.exports = {
   librarylist:store.collection('playlistlibrary'),
   playlists:store.collection('playlist'),
};
