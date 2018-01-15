$(document).ready(function() {
  $('.button-collapse').sideNav();
  $('#foto').attr('src', localStorage.photo);
  /* firebase */
  // var config = {
  //   apiKey: 'AIzaSyBTyPXp0vll8d2Fvi5nViLsKntlNxapEFY',
  //   authDomain: 'red-social-a1aeb.firebaseapp.com',
  //   databaseURL: 'https://red-social-a1aeb.firebaseio.com',
  //   projectId: 'red-social-a1aeb',
  //   storageBucket: 'red-social-a1aeb.appspot.com',
  //   messagingSenderId: '445743781768'
  // };
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

  firebase.database().ref('/usuarios/').once('value').then(function(snapshot) {
    var usuariosArray = snapshot.val();
    var keys = Object.keys(usuariosArray);
    for (var i = 0; i < keys.length; i++) {
      var currentObject = usuariosArray[keys[i]];
      var container = '<div class="row">' +
        '<div class="col s 12 align-center">' +
        '<img src = \'' + currentObject.foto + '\'class=\'circle responsive-img col s3 prueba\'>' +
        '<h6 class="black-text col s9">' + currentObject.nombre + '</h6>' +
        '<a class="waves-effect waves-light btn">Followers  ' + currentObject.seguidores + '</a>' +
        '</div>' +
        '</div>';
      $('#seccion').append(container);
      // console.log(currentObject.nombre);
      // console.log(currentObject.foto);
    }

    $('.prueba').click(function(event) {
      localStorage.nameFollow = $(this).next().text();
      localStorage.imgFollow = event.target.src;
      for (var i = 0; i < keys.length; i++) {
        var currentObject = usuariosArray[keys[i]];
        if (currentObject.nombre === localStorage.nameFollow) {
          localStorage.uidFollow = currentObject.uid;
        }
      }
      $(location).attr('href', 'follow.html');
    });  
  });
  // funcion para buscar los usuarios
  $('#search').on('keyup', function() {
    var nombre = $(this).val();
    $('.align-center').hide();
    $('.align-center').each(function() {
      var find = $(this).text();
      if (find.indexOf(nombre) !== -1) {
        $(this).show();
      }
    });
  });

  // evento para capturar de quien quiere ver su perfil 
});