$(document).ready(function() {
  setTimeout(function() {
    window.location.href = '../views/newsfeed.html';
  }, 40000);

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

  var config = {
    apiKey: 'AIzaSyDV9QIW9xJhVniaopY5-1cwbGEZFcVdeqw',
    authDomain: 'red-social-fin.firebaseapp.com',
    databaseURL: 'https://red-social-fin.firebaseio.com',
    projectId: 'red-social-fin',
    storageBucket: 'red-social-fin.appspot.com',
    messagingSenderId: '539458196274'
  };
  firebase.initializeApp(config);

  $('#login').click(function() {
    google();
  });

  function google() {
    // provedor del servicio
    var provider = new firebase.auth.GoogleAuthProvider();
    // levantar la ventana de gmail y trae un result
    var j = true;
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // guardando la imagen y nombre;
      localStorage.photo = result.user.photoURL;
      localStorage.name = result.user.displayName;
      localStorage.id = result.user.uid;
      console.log(result.user);
      firebase.database().ref('/usuarios/').once('value').then(function(snapshot) {
        var usuariosArray = snapshot.val();
        var keys = Object.keys(usuariosArray);
        for (var i = 0; i < keys.length; i++) {
          var currentObject = usuariosArray[keys[i]];
          console.log(currentObject.nombre);
          if (currentObject.nombre === result.user.displayName) {
            j = false;
            i = keys.length;
          }
        }
        if (j) {
          // console.log('sisi');
          guardarFirebase(result.user);
        } else {
          // console.log('mo');
        }
        // console.log(j);
      });
      // console.log(j);
      // guardarFirebase(result.user);
      // $(location).attr('href', 'newsfeed.html');
    });
    // if (j) {
    //   guardarFirebase(result.user);
    // } else {
    //   console.log('ya noo');
    // }
    
    $('#loading').addClass('block');
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
});