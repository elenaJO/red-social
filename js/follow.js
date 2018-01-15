$(document).ready(function() {
  $('#photo-follow').attr('src', localStorage.photo);
  $('#name-follow').text(localStorage.nameFollow);
  var $seguidores = $('#seguidores-follow');

  // Initialize Firebase
  // var config = {
  //   apiKey: 'AIzaSyBTyPXp0vll8d2Fvi5nViLsKntlNxapEFY',
  //   authDomain: 'red-social-a1aeb.firebaseapp.com',
  //   databaseURL: 'https://red-social-a1aeb.firebaseio.com',
  //   projectId: 'red-social-a1aeb',
  //   storageBucket: 'red-social-a1aeb.appspot.com',
  //   messagingSenderId: '445743781768'
  // };
  // firebase.initializeApp(config);
  // Initialize Firebase
  var config = {
    apiKey: 'AIzaSyDV9QIW9xJhVniaopY5-1cwbGEZFcVdeqw',
    authDomain: 'red-social-fin.firebaseapp.com',
    databaseURL: 'https://red-social-fin.firebaseio.com',
    projectId: 'red-social-fin',
    storageBucket: 'red-social-fin.appspot.com',
    messagingSenderId: '539458196274'
  };
  firebase.initializeApp(config);
  // para traer de la base de datos el numero de seguidores
  var dbRef = firebase.database().ref('usuarios');
  var dbRefUsu = dbRef.child(localStorage.uidFollow);

  dbRefUsu.on('value', function(snap) {
    $seguidores.text((snap.val()['seguidores']));
  });

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
        if (currentObject.user === localStorage.uidFollow) {
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
            '</div>';
          var appenReplace = appen.replace('_pub_', currentObject.url).replace('_photo_', localStorage.imgFollow).replace('_name_', localStorage.nameFollow).replace('_texto_', currentObject.url).replace('_mensaje_', currentObject.message);
          $('#publicaciones').prepend(appenReplace);
          // console.log(currentObject.user);
        }
      }
      // console.log(Object.keys(Postarray));
      // console.log(Postarray);
    });
  }

  // para traer de la base de datos el numero de seguidores
  // var dbRef = firebase.database().ref('usuarios');
  // var dbRefUsu = dbRef.child(localStorage.id);

  dbRefUsu.on('value', function(snap) {
    $seguidores.text((snap.val()['seguidores']));
    // console.log(snap.val());
  });
  var dbRefAnt = dbRef.child(localStorage.id);

  // aumentar o disminuir seguidores
  $('#follow-user').click(function(event) {
    event.preventDefault();
    $(this).toggleClass('followed');
    var dbUserFollow = dbRefUsu.child('seguidores');
    if ($(this).hasClass('followed')) {
      $(this).text('Followed');
      var following = $('#name-follow').text();
      var followingPhoto = localStorage.imgFollow;
      console.log(followingPhoto);
      // para guardar los seguidores por id;
      dbRefAnt.child('following/' + localStorage.uidFollow).set({
        name: following,
        foto: followingPhoto
      });

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