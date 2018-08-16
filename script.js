let todo = []
let users = []
let albums = []
let posts = []

function getUsers(done) {
    if (localStorage['users']) {
        users = JSON.parse(localStorage['users'])
    }

    if (users && users.length > 0) {
        return done(users)
    }

    $.getJSON('https://jsonplaceholder.typicode.com/users', function (data) {
        localStorage['users'] = JSON.stringify(data);
        done(data);
    })
}

function getAlbums(done) {
    $.getJSON('https://jsonplaceholder.typicode.com/albums', function (data) {
        done(data);
    })
}

function getPosts(done) {
    $.getJSON('https://jsonplaceholder.typicode.com/posts', function (data) {
        done(data);
    })
}

function getTodos(done) {

    if (localStorage['todos']) {
        todos = JSON.parse(localStorage['todos'])
    }
    if (posts && posts.length > 0) {
        return done(posts)
    }


    $.getJSON('https://jsonplaceholder.typicode.com/todos', function (data) {
        localStorage['todos'] = JSON.stringify(data);
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
                    <br>
                    <button onclick="showTodosOfUser(${user.id})" href="#" class="card-link">Todos</button>
                    </div>
            </div>
            </div>
            `
            )
        }
    )
}


function refreshAlbums(albums) {
    var k = 0;
    albums.forEach(
        function (album) {
            k++;
            $('#albums-clicked').append(
                `<div class="row list-group-item">
                <span>
                ${album.title}
                </span>
                <br>
                <button type="button" class="btn btn-primary btn-sm photobtn">View Photos</button>
                             <div class="photoid row" id="photo${k}">
                </div>
            `
            )
        }
    )
    setTimeout(photos, 1);
}

// ***
function photos() {
    var k = 1;

    $.getJSON('https://jsonplaceholder.typicode.com/photos',
        function (data) {
            data.forEach(function (pic) {
                if (pic.albumId != k) {
                    k++;
                }

                $(`#photo${k}`).append
                    (
                    `
                <a href="${pic.url}" target="_blank" class="thumbnail">
                <img src="${pic.thumbnailUrl}">
                </a>
                    `
                    )
            }
            )
        })

    $('.photobtn').click(function () {
        var u = $($(this)).next();
        u.toggle();
    });
}

function refreshPosts(posts) {
    var i = 0;
    posts.forEach((post) => {
        i++;
        $('#posts-clicked').append(
            `
      <div class="card" style="width: 100%">
      
      <div class="card-body">
      
        <h3 class="card-title">${post.title}</h3>
        <p class="card-text">${post.body}</p>
        <button type="button" class="btn btn-primary btn-sm postbtn">Comments</button>
        
        <div id="post${i}" class="postid"> </div>
        
      </div>
    </div>
      `
        )
    })
    setTimeout(comments, 1);
}

// ***
function comments() {
    var j = 0;
    $.getJSON('http://jsonplaceholder.typicode.com/comments', function (data) {

        data.forEach(function (comment) {
            if (comment.postId != j) { j++; }

            $("#post" + j).append(`
  <h5 class="card-title">name": "${comment.name}"</h5>
         <p class="card-text"> <h6>email": "${comment.email}"</h6> ${comment.body} </p>
                                
                    
  `);
        })

    })
    $('.postbtn').click(function () {
        var t = $($(this)).next();
        t.toggle();

    });



}

function showTodosOfUser(userId) {
    toggleActive('todos')
    refreshTodos(todos, userId)
}


function refreshTodos(todos, filterUserId) {
    if (filterUserId) {
        todos = todos.filter((todo) => (todo.userId === filterUserId))
    }

    todos.forEach(
        function (todo) {
            $('#todos-clicked').append(
                `
                <div class="row list-group-item">
                <span class="col-3"><input type="checkbox" ${todo.completed ? 'checked' : ''}></span>
                <span class="col ${todo.completed ? 'completed-task' : ''}">${todo.title}</span>
                </div>
                
            `
            )
        }
    )
}

$(function () {
    toggleactive('users')
    getUsers(function (users) {
        refreshUsers(users);
    })

})

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