const db = require('./db')
var fakeDatabase = {};
const Query = {
   greeting:() => {
      return "hello from  TutorialsPoint !!!"
   },   
   
   librarylist:() => db.librarylist.list(),

   librarylistById:(root,args,context,info) => {
      return db.librarylist.get(args.id);
   },
	
   playlists:() => db.playlists.list(),

   playlistsById:(root,args,context,info) => {
      return db.playlists.get(args.id);
   },

   playlistsdeleteById:(root,args,context,info) => {
      return db.playlists.delete(args.id);
   }
}

const Mutation = {
   createplaylist:(root,args,context,info) => {
      return db.playlists.create({id:args.id,name:args.name,
      songs:args.songs})
   }
}

module.exports = {Query,Mutation}