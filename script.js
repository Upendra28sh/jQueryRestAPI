let todo=[]
let users=[]
let albums = []
let posts=[]


if(localStorage['users'])
{
    users=JSON.parse(localStorage['users'])
}

if(localStorage['todos'])
{
    todos=JSON.parse(localStorage['todos'])
}

function getUsers(done) {
    if(users && users.length>0)
    {
        return done(users)
    }

    $.getJSON('https://jsonplaceholder.typicode.com/users', function (data) {
        localStorage['users']=JSON.stringify(data);
        done(data);
    })
}

function getAlbums(done) {

    if(albums && albums.length>0)
    {
        return done(albums)
    }


    $.getJSON('https://jsonplaceholder.typicode.com/albums', function (data) {
        localStorage['albums']=JSON.stringify(data);
        done(data);
    })
}

function getPosts(done) {
 
    if(posts && posts.length>0)
    {
        return done(posts)
    }


    $.getJSON('https://jsonplaceholder.typicode.com/posts', function (data) {
        localStorage['posts']=JSON.stringify(data);
        done(data);
    })
}

function getTodos(done) {

    if(posts && posts.length>0)
    {
        return done(posts)
    }


    $.getJSON('https://jsonplaceholder.typicode.com/todos', function (data) {
        localStorage['todos']=JSON.stringify(data);
        done(data);
    })
}

function toggleactive(toggle) {
    $('.nav > li > a').removeClass('active');
    $(`.tab-${toggle} > a`).addClass('active');
    $(`.contents`).hide();
    $(`.${toggle}-contents`).show();
}

function refreshUsers(users) {
    users.forEach(
        function (user) {
            $('#users-clicked').append(
                `<div class="col-sm-6 col-md-6 col-lg-4 p-3">
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${user.name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${user.email}</h6>
                    <p class="card-text">
                    Address :- <br>
                    ${user.address.street}
                    ${user.address.suite}<br>
                    ${user.address.city}
                    ${user.address.zipcode}<br>
                    </p>
                    <a href="#" class="card-link">${user.phone}</a><br>
                    <a href="#" class="card-link">${user.website}</a>
                </div>
            </div>
            </div>
            `
            )
        }
    )
}

function refreshAlbums(albums) {
    albums.forEach(
        function (album) {
            $('#albums-clicked').append(
                `<div class="row list-group-item">
                <span>
                ${album.title}
                </span>
                </div>
            `
            )
        }
    )
}

function refreshPosts(posts) {
    posts.forEach(
        function (post) {
            $('#posts-clicked').append(
                `<div class="col-sm-6 col-md-6 col-lg-4 p-3">
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${post.body}</h6>
                    <p class="card-text">
                    
                    </p>
                    <a href="#" class="card-link"></a><br>
                    <a href="#" class="card-link"></a>
                </div>
            </div>
            </div>
            `
            )
        }
    )
}

function refreshTodos(todos) {
    todos.forEach(
        function (todo) {
            $('#todos-clicked').append(
                `
                <div class="row list-group-item">
                <span>
                ${todo.title}
                </span>
                </div>
                
            `
            )
        }
    )
}

$(function () {
    $('.tab-users').click(function () {
        toggleactive('users')
        getUsers(function (users) {
            refreshUsers(users);
        })
    })
})

$(function () {
    $('.tab-albums').click(function () {
        toggleactive('albums')
        getAlbums(function (albums) {
            refreshAlbums(albums);
        })
    })
})

$(function () {
    $('.tab-posts').click(function () {
        toggleactive('posts')
        getPosts(function (posts) {
            refreshPosts(posts);
        })
    })
})

$(function () {
    $('.tab-todos').click(function () {
        toggleactive('todos')
        getTodos(function (todos) {
            refreshTodos(todos);
        })
    })
})