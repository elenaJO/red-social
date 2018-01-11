$(document).ready(function() {
  setTimeout(function() {
    window.location.href = '../views/profile.html';
  }, 22000);

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

  $('#login').click(function() {
    google();
    console.log('haha');
  });

  function google() {
    // provedor del servicio
    var provider = new firebase.auth.GoogleAuthProvider();
    // levantar la ventana de gmail y trae un result
    firebase.auth().signInWithPopup(provider).then(function (result) {
      // guardando la imagen y nombre;
      localStorage.photo = result.user.photoURL;
      localStorage.name = result.user.displayName;
      localStorage.id = result.user.uid;
      console.log(result.user);
      guardarFirebase(result.user);
    });
  }

  // funcion para guardar en firebase los datos de quien entra
  function guardarFirebase(user) {
    var usuario = {
      uid: user.uid,
      nombre: user.displayName,
      foto: user.photoURL,
      mail: user.email,
      seguidores: 31,
    };
    firebase.database().ref('usuarios/' + user.uid).set(usuario);
    // window.location.href = '../views/profile.html';
  }
})