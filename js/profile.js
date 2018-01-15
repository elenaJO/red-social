$(document).ready(function() {
  $('.button-collapse').sideNav();
  $('#name-user').text(localStorage.name);
  $('#foto').attr('src', localStorage.photo);
  var $seguidores = $('#seguidores');
  // Initialize Firebase
  // var config = {
  //   apiKey: 'AIzaSyBTyPXp0vll8d2Fvi5nViLsKntlNxapEFY',
  //   authDomain: 'red-social-a1aeb.firebaseapp.com',
  //   databaseURL: 'https://red-social-a1aeb.firebaseio.com',
  //   projectId: 'red-social-a1aeb',
  //   storageBucket: 'red-social-a1aeb.appspot.com',
  //   messagingSenderId: '445743781768'
  // };
  // // console.log(localStorage.id);

  // firebase.initializeApp(config);
  var config = {
    apiKey: 'AIzaSyDV9QIW9xJhVniaopY5-1cwbGEZFcVdeqw',
    authDomain: 'red-social-fin.firebaseapp.com',
    databaseURL: 'https://red-social-fin.firebaseio.com',
    projectId: 'red-social-fin',
    storageBucket: 'red-social-fin.appspot.com',
    messagingSenderId: '539458196274'
  };
  firebase.initializeApp(config);

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var token = firebase.auth().currentUser.uid;
      queryDataset(token);
    }
  });

  function queryDataset(token) {
    firebase.database().ref('/Posts/').once('value').then(function(snapshot) {
      var Postarray = snapshot.val();
      var keys = Object.keys(Postarray);
      for (var i = 0; i < keys.length; i++) {
        var currentObject = Postarray[keys[i]];
        if (currentObject.user === localStorage.id) {
          var appen = '<div class="row">' +
            '<div class="col s12 back-post">' +
            '<div style="display:inline-block" class="img-user"><img src="_photo_" class="photo-user"></div>' + '<div class="div-name">_name_</div>' + '<br>' +
            '<div class="align">' +
            '<img src="_pub_" alt="" class="img-pub">' +
            '<div class="text-left">' +
            '<p>_mensaje_</p>' +
            '<hr>' + '<br>' +
            '<a class="a-icon"><i class="material-icons">favorite</i></span></a>' + 
            '<a class="a-icon"><i class="material-icons margin-left">question_answer</i></span></a>' +
            '<a class="a-icon rigth"><i class="material-icons margin-left">more_horiz</i></span></a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' ;
          var appenReplace = appen.replace('_pub_', currentObject.url).replace('_photo_', localStorage.photo).replace('_name_', localStorage.name).replace('_texto_', currentObject.url).replace('_mensaje_', currentObject.message);
          $('#publicaciones').prepend(appenReplace);
          // console.log(currentObject.user);
        }
      }
      // console.log(Object.keys(Postarray));
      // console.log(Postarray);
    });
  }
  // para traer de la base de datos el numero de seguidores
  var dbRef = firebase.database().ref('usuarios');
  var dbRefUsu = dbRef.child(localStorage.id);
  dbRefUsu.on('value', function(snap) {
    $seguidores.text((snap.val()['seguidores']));
    // console.log(snap.val());
  });

  // aumentar o disminuir seguidores
  $('#follow').click(function() {
    $(this).toggleClass('followed');
    var dbUserFollow = dbRefUsu.child('seguidores');
    if ($(this).hasClass('followed')) {
      $(this).text('Followed');
      dbUserFollow.transaction(function(curentFollow) {
        return curentFollow + 1;
      });
    } else {
      $(this).text('Follow');
      dbUserFollow.transaction(function(curentFollow) {
        return curentFollow - 1;
      });
    }
  });
});