var template = '<% for(var post,i=0; post=posts[i]; i++) {%> <div class="row well"> <div class="col-xs-1"> <img src="<%= post.picture %>"/> </div> <div class="col-lg-9"> <div class="row"> <p> <strong><%= post.from.name %></strong><br> <%- post.message %> </p> </div> <div class="row _icons"> <% for(var l in post.actions)  if (  post.actions[l].name == "Like" ) { %> <a href="<% post.actions[l].link %>" class="fa  fa-thumbs-up  fa-2x _like" name="like<%= post.id %>"></a> <% } %> <a href="/reply/<%= post.id %>" class="fa fa-reply fa-2x"></a> </div> </div> </div> <% } %>'; 
var ejs = require('ejs');
var io = require("socket.io-client");
var $ = require('jquery');
var host = location.origin;
//io.connect(host, {port: 8000, transports: ["websocket"]});
var connection = io.connect();
connection.on('connect', function () { 
});
connection.on('feed', function (data) { 
    console.log('getting data');
    $('post-sec').html(ejs.render(template, { posts:  data}));
});
//io.emit('heee');

