$(document).ready(function() {
  $('.button-collapse').sideNav();
  $('#foto').attr('src', localStorage.photo);
  var config = {
    apiKey: 'AIzaSyBTyPXp0vll8d2Fvi5nViLsKntlNxapEFY',
    authDomain: 'red-social-a1aeb.firebaseapp.com',
    databaseURL: 'https://red-social-a1aeb.firebaseio.com',
    projectId: 'red-social-a1aeb',
    storageBucket: 'red-social-a1aeb.appspot.com',
    messagingSenderId: '445743781768'
  };
  firebase.initializeApp(config);
  // var dbRef = firebase.database().ref('usuarios');
  var $textArea = $('#textarea1');
  var $postButton = $('#postButton');
  var $valueTextTarea = $textArea.val();
  var $postButton2 = $('button[type=submit]');

  function hora() {

  }

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
  
  $('#fileButton').change(function() {
    var file = event.target.files[0];
    var storageRef = firebase.storage().ref('/' + localStorage.name + '/' + file.name);
    var task = storageRef.put(file);
    task.on('state_changed', function(snapshot) {

    }, function(error) {

    }, function(error) {
      var postKey = firebase.database().ref('Posts/').push().key;
      var downloadURL = task.snapshot.downloadURL;
      var updates = {};
      var postData = {
        url: downloadURL,
        user: localStorage.id,
        name: localStorage.name,
        message: ' '
      };
      updates['/Posts/' + postKey] = postData;
      firebase.database().ref().update(updates);
      // console.log(downloadURL);
    });
    var appen = '<div class="row">' +
                  '<div class="col s12 back-post">' +
                  '<div style="display:inline-block" class="img-user"><img src="_photo_" class="photo-user"></div>' + '<div class="div-name">_name_</div>' + '<br>' +
                  '<div class="align">' +
                  '<img src="_pub_" alt="" class="img-pub">' +
                  '</div>' +
                   '<hr>' + '<br>' +
                   '<a class="a-icon"><i class="material-icons">favorite</i></span></a>' + 
                   '<a class="a-icon"><i class="material-icons margin-left">question_answer</i></span></a>' +
                   '<a class="a-icon rigth"><i class="material-icons margin-left">more_horiz</i></span></a>' +
                  '</div>' +
                '</div>'; 
    var reader = new FileReader();
    reader.onload = function(event) {
      var appenReplace = appen.replace('_pub_', event.target.result).replace('_name_', localStorage.name).replace('_photo_', localStorage.photo);
      $('#publicaciones').prepend(appenReplace);
    };
    reader.readAsDataURL(this.files[0]);
  });

  $textArea.on('keyup', function(event) {
    // Si textArea no contiene nada o contiene un vacío el boton se desabilita
    if ($(this).val().length === 0 || $(this).val().length === ' ') {
      $postButton2.attr('disabled', true); // desabilita el boton
      // textArea contiene algo
    } else if ($(this).val().length >= 1) {
      $postButton2.attr('disabled', false); // habilita el boton
    }
  });

  
  $postButton.on('click', function() {
    var appen = '<div class="row">' +
    '<div class="col s12 back-post">' +
    '<div style="display:inline-block" class="img-user"><img src="_photo_" class="photo-user"></div>' + '<div class="div-name">_name_</div>' + '<br>' +
    '<li><span></span><li>' + '<br>' +
    '<hr>' + '<br>' +
    '<a class="a-icon"><i class="material-icons">favorite</i></span></a>' + 
    '<a class="a-icon"><i class="material-icons margin-left">question_answer</i></span></a>' +
    '<a class="a-icon rigth"><i class="material-icons margin-left">more_horiz</i></span></a>' +
    '</div>' +
    '<div></div>' + 
    '<br>';

    var appenReplace = appen.replace('<span></span>', $textArea.val()).replace('_photo_', localStorage.photo).replace('_name_', localStorage.name);
    $('#publicaciones').prepend(appenReplace);
    var postKey = firebase.database().ref('Posts/').push().key;
    var mensaje = $textArea.val();
    var updates = {};
    var postData = {
      url: '',
      user: localStorage.id,
      name: localStorage.name,
      message: mensaje
    };
    updates['/Posts/' + postKey] = postData;
    firebase.database().ref().update(updates);
    $valueTextTarea = $textArea.val('');
    $postButton2.attr('disabled', true);
  });

});