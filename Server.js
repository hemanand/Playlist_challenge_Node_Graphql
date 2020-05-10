var request = require("request");
var express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const fetch = require("node-fetch");
var path = require('path');
const cors = require('cors');
var Songs = require('./songs');

const port = process.env.PORT || 5000;
const app = express();

const fs = require('fs')
const typeDefs = fs.readFileSync('./schema.graphql',{encoding:'utf-8'})
const resolvers = require('./resolvers')

const {makeExecutableSchema} = require('graphql-tools')
const schema = makeExecutableSchema({typeDefs, resolvers})

	app.use(cors(), bodyParser.json());

	const  {graphiqlExpress,graphqlExpress} = require('apollo-server-express')
	app.use('/graphql',graphqlExpress({schema}))
	app.use('/graphiql',graphiqlExpress({endpointURL:'/graphql'}))
	
	app.listen(
	   port, () => console.info(
	      `Server started on port ${port}`
	   )
	);

	app.get('/librarylist', function (req, res) {
	  	  var options = { method: 'POST',
		  url: 'http://localhost:5000/graphql',
		  headers: 
		   { 
		     'cache-control': 'no-cache',
		     'content-type': 'application/json' },
		  body: 
		   { query: '{\n   greeting\n   librarylist {\nid\nalbum\nduration\ntitle\nartist\n}\n}',
		     variables: null,
		     operationName: null },
		  json: true };

		request(options, function (error, response, body) {
		  if (error) throw new Error(error);
		  var resultset = response.body.data.librarylist;
		  
		  var loopresponse = resultset.map((mapdata,key) => { return mapdata; });
		  res.json(loopresponse);
		}); 
	})

	app.get('/librarylist/:id', function (req, res) {
		var urlid = req.params.id;
		  var options = { method: 'POST',
		  url: 'http://localhost:5000/graphql',
		  headers: 
		   { 
		     'cache-control': 'no-cache',
		     'content-type': 'application/json' },
		  body: 
		    { query: '{  \n   librarylistById(id:"'+urlid+'") {\n      id\n  \t\talbum \n      duration\n    \ttitle\n    \tartist\n  }\n}',
	     	  variables: null,
	     	  operationName: null },
	  		  json: true 
	  		};

		request(options, function (error, response, body) {
		  if (error) throw new Error(error);
		 var librarylistByIdresulet = response.body.data.librarylistById;
		 if(librarylistByIdresulet == null){
		 	res.json({'URLID':"Result Not Found"});
		 }else{
		 	var loopresponse = Object.values(librarylistByIdresulet).map((mapdata,key) => mapdata );
		 	res.json(loopresponse);
		 }
		}); 
	})


	app.get('/playlist', function (req, res) {
	  	  var options = { method: 'POST',
		  url: 'http://localhost:5000/graphql',
		  headers: 
		   { 
		     'cache-control': 'no-cache',
		     'content-type': 'application/json' },
		  body: 
		    { 
		      query: '{\n   playlists{\n    \tid\n    \tname\n \tsongs\n}\n}',
	     	  variables: null,
	     	  operationName: null },
	  		  json: true 
	  		};

		request(options, function (error, response, body) {
		  if (error) throw new Error(error);
		  var resultset = response.body.data.playlists;
		  var loopresponse = resultset.map((mapdata,key) => { return mapdata; });
		  res.json(loopresponse);
		}); 
	});

	app.get('/playlist/:id', function (req, res) {
		var urlid = req.params.id;
		  var options = { method: 'POST',
		  url: 'http://localhost:5000/graphql',
		  headers: 
		   { 
		     'cache-control': 'no-cache',
		     'content-type': 'application/json' },
		  body: 
		    { query: '{\n   playlistsById(id:"'+urlid+'"){\n    \tid\n    \tname\n   }\n}',
		      variables: null,
		      operationName: null },
		  	  json: true };

		request(options, function (error, response, body) {
		  if (error) throw new Error(error);
		 var playlistsByIdresulet = response.body.data.playlistsById;
		 if(playlistsByIdresulet == null){
		 	res.json({'URLID':"Result Not Found"});
		 }else{
		 	var loopresponse = Object.values(playlistsByIdresulet).map((mapdata,key) => mapdata );
		 	res.json(loopresponse);
		 }
		}); 
	})

	app.get('/playlistentry/:postname/:postsong', function (req, res) {
		var options = { method: 'POST',
		  url: 'http://localhost:5000/graphql',
		  headers: 
		   { 
		     'cache-control': 'no-cache',
		     'content-type': 'application/json' },
		  body: 
		    { 
		      query: '{\n   playlists{\n    \tid\n    \tname\n \tsongs\n}\n}',
	     	  variables: null,
	     	  operationName: null },
	  		  json: true 
	  		};

		request(options, function (error, response, body) {
		  if (error) throw new Error(error);
		  	var resultset = response.body.data.playlists;
		  	var loopresponse = resultset.map((mapdata,key) => { return mapdata.id; });
		  	var playlistid = loopresponse.length;
		  	var playlistname = req.params.postname;
		  	var playsongs   = req.params.postsong;
			var request = require("request");
			var options = { method: 'POST',
			  url: 'http://localhost:5000/graphql',
			  headers: 
			   { 'postman-token': '05b72aa9-0b67-eefa-6952-d9a78d772d75',
			     'cache-control': 'no-cache',
			     'content-type': 'application/json' },
			  body: 
			   { query: 'mutation {\n   createplaylist(id:"'+playlistid+'",name:"'+playlistname+'",songs:"'+playsongs+'")\n}\n',
			     variables: null },
			  json: true };

			request(options, function (error, response, body) {
			  if (error) throw new Error(error);
			  res.json({'entryresult':'Play list Added Successfully'});
			});
		});		   
	})

	app.get('/playlistdelete/:deleteid', function (req, res) {
			var postid = req.params.deleteid;
			var options = { method: 'POST',
			  url: 'http://localhost:5000/graphql',
			  headers: 
			   { 'postman-token': '57c45445-20b7-777d-29a8-dcdcca6fb6a1',
			     'cache-control': 'no-cache',
			     'content-type': 'application/json' },
			  body: 
			   { query: '{\n   greeting\n   playlistsdeleteById(id:"'+postid+'"){\n      id\n   }\n}',
			     variables: null,
			     operationName: null },
			  json: true };

			request(options, function (error, response, body) {
			  if (error) {
			  	res.json({'entryresult':"No Records To Delete"});
			  }else{
			  	res.json({'entryresult':"Play List Item Deleted Successfully"});
			  }
			}); 
	});
