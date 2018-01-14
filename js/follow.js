$(document).ready(function() {
  $('#photo-follow').attr('src', localStorage.imgFollow);
  $('#name-follow').text(localStorage.nameFollow);
  var $seguidores = $('#seguidores-follow');

  // Initialize Firebase
  var config = {
    apiKey: 'AIzaSyBTyPXp0vll8d2Fvi5nViLsKntlNxapEFY',
    authDomain: 'red-social-a1aeb.firebaseapp.com',
    databaseURL: 'https://red-social-a1aeb.firebaseio.com',
    projectId: 'red-social-a1aeb',
    storageBucket: 'red-social-a1aeb.appspot.com',
    messagingSenderId: '445743781768'
  };
  firebase.initializeApp(config);

  // para traer de la base de datos el numero de seguidores
  var dbRef = firebase.database().ref('usuarios');
  var dbRefUsu = dbRef.child(localStorage.uidFollow );
  dbRefUsu.on('value', function(snap) {
    $seguidores.text((snap.val()['seguidores']));
  });
});