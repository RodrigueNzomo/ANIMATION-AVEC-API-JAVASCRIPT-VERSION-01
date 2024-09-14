let audioContextStarted = false;

// Fonction pour activer l'AudioContext si nécessaire
function startAudioContext() {
  if (!audioContextStarted) {
    Howler.ctx
      .resume()
      .then(() => {
        console.log("AudioContext activé.");
        audioContextStarted = true;
      })
      .catch((err) => {
        console.error("Erreur lors de l'activation de l'AudioContext : ", err);
      });
  }
}

// Fonction pour jouer un son en fonction du type d'événement
function playSound(type) {
  if (sounds[type]) {
    sounds[type].play();
  }
}

// Fonction pour animer la zone en fonction du type d'événement
function animateZone(event, type) {
  const animationOptions = {
    easing: "easeInOutQuad",
    duration: 15000,
  };

  const animations = {
    click: { translateX: [0, 500], backgroundColor: ["#e74c3c", "#ff7675"] },
    dblclick: {
      rotate: ["0turn", "1turn"],
      scale: [1, 1.5],
      backgroundColor: ["#3498db", "#9b59b6"],
      direction: "alternate",
      easing: "easeInOutBounce",
    },
    mouseover: {
      scale: [1, 1.2],
      borderColor: ["#2ecc71", "#27ae60"],
      animation: "bounce 1s ease-in-out infinite",
    },
    mouseout: { scale: [1.2, 1], borderColor: ["#27ae60", "#2ecc71"] },
    contextmenu: {
      translateX: [-200, 0],
      backgroundColor: ["#9b59b6", "#8e44ad"],
    },
    keydown: { backgroundColor: ["#1abc9c", "#16a085"] },
    keyup: { backgroundColor: ["#e67e22", "#d35400"] },
    mousemove: { translateX: [0, 10], duration: 300 },
    focus: { borderColor: ["#8e44ad", "#9b59b6"] },
    blur: { borderColor: ["#9b59b6", "#8e44ad"] },
  };

  if (animations[type]) {
    anime({
      targets: event.target,
      loop: true,
      ...animations[type],
      ...animationOptions,
    });
  } else {
    console.warn("Événement non pris en charge : ", type);
  }
}

// Fonction pour gérer les événements click
function handleClick(event) {
  startAudioContext();
  console.log("Événement 'click' détecté");
  playSound("click");
  animateZone(event, "click");
}

// Fonction pour gérer les événements dblclick
function handleDblClick(event) {
  startAudioContext();
  console.log("Événement 'dblclick' détecté");
  playSound("dblclick");
  animateZone(event, "dblclick");
}

// Fonction pour gérer les événements mouseover
function handleMouseOver(event) {
  startAudioContext();
  console.log("Événement 'mouseover' détecté");
  playSound("mouseover");
  animateZone(event, "mouseover");
}

// Fonction pour gérer les événements mouseout
function handleMouseOut(event) {
  startAudioContext();
  console.log("Événement 'mouseout' détecté");
  playSound("mouseout");
  animateZone(event, "mouseout");
}

// Fonction pour gérer les événements contextmenu
function handleContextMenu(event) {
  event.preventDefault(); // Empêcher le menu contextuel par défaut
  startAudioContext();
  console.log("Événement 'contextmenu' détecté");
  playSound("contextmenu");
  animateZone(event, "contextmenu");
}

// Fonction pour gérer les événements keydown
function handleKeyDown(event) {
  startAudioContext();
  console.log("Événement 'keydown' détecté");
  playSound("keydown");
  animateZone(event, "keydown");
}

// Fonction pour gérer les événements keyup
function handleKeyUp(event) {
  startAudioContext();
  console.log("Événement 'keyup' détecté");
  playSound("keyup");
  animateZone(event, "keyup");
}

// Fonction pour gérer les événements mousemove
function handleMouseMove(event) {
  startAudioContext();
  console.log("Événement 'mousemove' détecté");
  playSound("mousemove");
  animateZone(event, "mousemove");
}

// Fonction pour gérer les événements focus
function handleFocus(event) {
  startAudioContext();
  console.log("Événement 'focus' détecté");
  playSound("focus");
  animateZone(event, "focus");
}

// Fonction pour gérer les événements blur
function handleBlur(event) {
  startAudioContext();
  console.log("Événement 'blur' détecté");
  playSound("blur");
  animateZone(event, "blur");
}

// Définir les sons pour chaque événement en utilisant Howler.js
const sounds = {
  click: new Howl({ src: ["sounds/click.mp3"] }),
  dblclick: new Howl({ src: ["sounds/dblclick.mp3"] }),
  mouseover: new Howl({ src: ["sounds/mouseover.mp3"] }),
  mouseout: new Howl({ src: ["sounds/mouseout.mp3"] }),
  contextmenu: new Howl({ src: ["sounds/contextmenu.mp3"] }),
  keydown: new Howl({ src: ["sounds/keydown.mp3"] }),
  keyup: new Howl({ src: ["sounds/keyup.mp3"] }),
  mousemove: new Howl({ src: ["sounds/mousemove.mp3"] }),
  focus: new Howl({ src: ["sounds/focus.mp3"] }),
  blur: new Howl({ src: ["sounds/blur.mp3"] }),
};

// Ajouter des écouteurs d'événements pour chaque zone en fonction de leur attribut data-event
document.querySelectorAll(".eventZone").forEach((zone) => {
  const eventType = zone.getAttribute("data-event");

  switch (eventType) {
    case "click":
      zone.addEventListener("click", handleClick);
      break;
    case "dblclick":
      zone.addEventListener("dblclick", handleDblClick);
      break;
    case "mouseover":
      zone.addEventListener("mouseover", handleMouseOver);
      break;
    case "mouseout":
      zone.addEventListener("mouseout", handleMouseOut);
      break;
    case "contextmenu":
      zone.addEventListener("contextmenu", handleContextMenu);
      break;
    case "keydown":
      document.addEventListener("keydown", handleKeyDown);
      break;
    case "keyup":
      document.addEventListener("keyup", handleKeyUp);
      break;
    case "mousemove":
      zone.addEventListener("mousemove", handleMouseMove);
      break;
    case "focus":
      zone.addEventListener("focus", handleFocus);
      break;
    case "blur":
      zone.addEventListener("blur", handleBlur);
      break;
  }
});

// Fonction pour gérer l'événement 'click'
function handleClick(event) {
  console.log("Événement 'click' détecté");
  playSound("click");
  animateZone(event, "click");
}

// Fonction pour gérer l'événement 'dblclick'
function handleDblClick(event) {
  console.log("Événement 'dblclick' détecté");
  playSound("dblclick");
  animateZone(event, "dblclick");
}

// Fonction pour gérer l'événement 'mouseover'
function handleMouseOver(event) {
  console.log("Événement 'mouseover' détecté");
  playSound("mouseover");
  animateZone(event, "mouseover");
}

// Fonction pour gérer l'événement 'mouseout'
function handleMouseOut(event) {
  console.log("Événement 'mouseout' détecté");
  playSound("mouseout");
  animateZone(event, "mouseout");
}

// Fonction pour gérer l'événement 'contextmenu'
function handleContextMenu(event) {
  event.preventDefault(); // Empêche le menu contextuel par défaut
  console.log("Événement 'contextmenu' détecté");
  playSound("contextmenu");
  animateZone(event, "contextmenu");
}

// Fonction pour gérer l'événement 'keydown'
function handleKeyDown(event) {
  console.log("Événement 'keydown' détecté");
  playSound("keydown");
  animateZone(event, "keydown");
}

// Fonction pour gérer l'événement 'keyup'
function handleKeyUp(event) {
  console.log("Événement 'keyup' détecté");
  playSound("keyup");
  animateZone(event, "keyup");
}

// Fonction pour gérer l'événement 'mousemove'
function handleMouseMove(event) {
  console.log("Événement 'mousemove' détecté");
  playSound("mousemove");
  animateZone(event, "mousemove");
}

// Fonction pour gérer l'événement 'focus'
function handleFocus(event) {
  console.log("Événement 'focus' détecté");
  playSound("focus");
  animateZone(event, "focus");
}

// Fonction pour gérer l'événement 'blur'
function handleBlur(event) {
  console.log("Événement 'blur' détecté");
  playSound("blur");
  animateZone(event, "blur");
}

// Fonction pour jouer un son en fonction du type d'événement
function playSound(type) {
  if (sounds[type]) {
    sounds[type].play();
  }
}

// Fonction pour animer la zone en fonction du type d'événement
function animateZone(event, type) {
  const animationOptions = {
    easing: "easeInOutQuad",
    duration: 15000,
  };

  const animations = {
    click: { translateX: [0, 500], backgroundColor: ["#e74c3c", "#ff7675"] },
    dblclick: {
      rotate: ["0turn", "1turn"],
      scale: [1, 1.5],
      backgroundColor: ["#3498db", "#9b59b6"],
      direction: "alternate",
      easing: "easeInOutBounce",
    },
    mouseover: {
      scale: [1, 1.2],
      borderColor: ["#2ecc71", "#27ae60"],
      animation: "bounce 1s ease-in-out infinite",
    },
    mouseout: { scale: [1.2, 1], borderColor: ["#27ae60", "#2ecc71"] },
    contextmenu: {
      translateX: [-200, 0],
      backgroundColor: ["#9b59b6", "#8e44ad"],
    },
    keydown: { backgroundColor: ["#1abc9c", "#16a085"] },
    keyup: { backgroundColor: ["#e67e22", "#d35400"] },
    mousemove: { translateX: [0, 10], duration: 300 },
    focus: { borderColor: ["#8e44ad", "#9b59b6"] },
    blur: { borderColor: ["#9b59b6", "#8e44ad"] },
  };

  if (animations[type]) {
    anime({
      targets: event.target,
      loop: true,
      ...animations[type],
      ...animationOptions,
    });
  } else {
    console.warn("Événement non pris en charge : ", type);
  }
}

// Ajout des écouteurs d'événements pour chaque zone
document.querySelectorAll(".eventZone").forEach((zone) => {
  const eventType = zone.getAttribute("data-event");

  if (eventType === "click") {
    zone.addEventListener("click", handleClick);
  } else if (eventType === "dblclick") {
    zone.addEventListener("dblclick", handleDblClick);
  } else if (eventType === "mouseover") {
    zone.addEventListener("mouseover", handleMouseOver);
  } else if (eventType === "mouseout") {
    zone.addEventListener("mouseout", handleMouseOut);
  } else if (eventType === "contextmenu") {
    zone.addEventListener("contextmenu", handleContextMenu);
  } else if (eventType === "keydown") {
    document.addEventListener("keydown", handleKeyDown);
  } else if (eventType === "keyup") {
    document.addEventListener("keyup", handleKeyUp);
  } else if (eventType === "mousemove") {
    zone.addEventListener("mousemove", handleMouseMove);
  } else if (eventType === "focus") {
    zone.addEventListener("focus", handleFocus);
  } else if (eventType === "blur") {
    zone.addEventListener("blur", handleBlur);
  }
});

// // Function to play sound and animate zones based on event type
// function handleEvent(event, type) {
//   // Play the corresponding sound
//   if (sounds[type]) {
//     sounds[type].play();
//   }
//   function handleEvent(event, type) {
//     console.log("Événement déclenché : ", type); // Pour vérifier si l'événement est bien capturé
//     if (sounds[type]) {
//       sounds[type].play();
//     }
//     animateZone(event, type);
//   }

//   // Animate the event zone
//   animateZone(event, type);
// }

// /// Fonction pour animer les zones en fonction du type d'événement
// function animateZone(event, type) {
//   // Options d'animation définissant l'effet et la durée
//   const animationOptions = {
//     easing: "easeInOutQuad", // Type d'assouplissement de l'animation
//     duration: 15000, // Durée de l'animation en millisecondes (15 secondes)
//   };

//   // Définition des animations pour chaque type d'événement
//   const animations = {
//     click: {
//       translateX: [0, 500], // Translation de 500px sur l'axe X
//       backgroundColor: ["#e74c3c", "#ff7675"], // Changement de couleur de fond
//     },
//     dblclick: {
//       rotate: ["0turn", "1turn"], // Rotation complète
//       scale: [1, 1.5], // Échelle de l'élément
//       backgroundColor: ["#3498db", "#9b59b6"], // Changement de couleur de fond
//       direction: "alternate", // Direction d'animation alternée
//       easing: "easeInOutBounce", // Effet de rebond
//     },
//     mouseover: {
//       scale: [1, 1.2], // Échelle de l'élément au survol
//       borderColor: ["#2ecc71", "#27ae60"], // Changement de couleur de bordure
//       animation: "bounce 1s ease-in-out infinite", // Animation de rebond
//     },
//     mouseout: {
//       scale: [1.2, 1], // Retour à l'échelle d'origine
//       borderColor: ["#27ae60", "#2ecc71"], // Retour à la couleur de bordure d'origine
//     },
//     contextmenu: {
//       translateX: [-200, 0], // Translation de -200px sur l'axe X
//       backgroundColor: ["#9b59b6", "#8e44ad"], // Changement de couleur de fond
//     },
//     keydown: {
//       backgroundColor: ["#1abc9c", "#16a085"], // Changement de couleur de fond lors de l'appui sur une touche
//     },
//     keyup: {
//       backgroundColor: ["#e67e22", "#d35400"], // Changement de couleur de fond lors du relâchement d'une touche
//     },
//     mousemove: {
//       translateX: [0, 10], // Légère translation sur l'axe X
//       duration: 300, // Durée de l'animation en millisecondes
//     },
//     focus: {
//       borderColor: ["#8e44ad", "#9b59b6"], // Changement de couleur de bordure lors du focus
//     },
//     blur: {
//       borderColor: ["#9b59b6", "#8e44ad"], // Changement de couleur de bordure lors de la perte de focus
//     },
//   };

//   // Vérification si le type d'animation est défini
//   if (animations[type]) {
//     // Lancement de l'animation avec les options spécifiées
//     anime({
//       targets: event.target, // Cible de l'animation
//       loop: true, // Animation en boucle
//       ...animations[type], // Ajout des paramètres d'animation spécifiques
//       ...animationOptions, // Ajout des options d'animation générales
//     });
//   } else {
//     // Avertissement si le type d'événement n'est pas pris en charge
//     console.warn("Événement non pris en charge : ", type);
//   }
// }

// // Ajouter des écouteurs d'événements pour chaque zone en fonction de leur attribut data-event
// document.querySelectorAll(".eventZone").forEach((zone) => {
//   const eventType = zone.getAttribute("data-event"); // Récupération du type d'événement

//   // Attacher des écouteurs d'événements aux zones
//   if (eventType === "contextmenu") {
//     zone.addEventListener(eventType, (event) => {
//       event.preventDefault(); // Empêcher le menu contextuel par défaut
//       animateZone(event, eventType); // Appel de la fonction d'animation
//     });
//   } else if (eventType === "keydown" || eventType === "keyup") {
//     // Gestion spéciale pour les événements keydown et keyup
//     document.addEventListener(eventType, (event) => {
//       const targetZone = document.getElementById(
//         `zone${event.type === "keydown" ? "KeyDown" : "KeyUp"}`
//       ); // Identification de la zone cible
//       animateZone(event, event.type); // Appel de la fonction d'animation
//     });
//   } else {
//     zone.addEventListener(eventType, (event) => {
//       animateZone(event, eventType); // Appel de la fonction d'animation
//     });
//   }
// });
