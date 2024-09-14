let audioContextStarted = false;

function handleEvent(event, type) {
  // Démarrer l'AudioContext après une interaction utilisateur
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

  console.log("Événement déclenché : ", type); // Vérifier si l'événement est bien capturé

  // Jouer le son correspondant si disponible
  if (sounds[type]) {
    sounds[type].play();
  }

  // Animer la zone de l'événement
  animateZone(event, type);
}

// Define sounds for each event using Howler.js
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

// Function to play sound and animate zones based on event type
function handleEvent(event, type) {
  // Play the corresponding sound
  if (sounds[type]) {
    sounds[type].play();
  }
  function handleEvent(event, type) {
    console.log("Événement déclenché : ", type); // Pour vérifier si l'événement est bien capturé
    if (sounds[type]) {
      sounds[type].play();
    }
    animateZone(event, type);
  }

  // Animate the event zone
  animateZone(event, type);
}

/// Fonction pour animer les zones en fonction du type d'événement
function animateZone(event, type) {
  // Options d'animation définissant l'effet et la durée
  const animationOptions = {
    easing: "easeInOutQuad", // Type d'assouplissement de l'animation
    duration: 15000, // Durée de l'animation en millisecondes (15 secondes)
  };

  // Définition des animations pour chaque type d'événement
  const animations = {
    click: {
      translateX: [0, 500], // Translation de 500px sur l'axe X
      backgroundColor: ["#e74c3c", "#ff7675"], // Changement de couleur de fond
    },
    dblclick: {
      rotate: ["0turn", "1turn"], // Rotation complète
      scale: [1, 1.5], // Échelle de l'élément
      backgroundColor: ["#3498db", "#9b59b6"], // Changement de couleur de fond
      direction: "alternate", // Direction d'animation alternée
      easing: "easeInOutBounce", // Effet de rebond
    },
    mouseover: {
      scale: [1, 1.2], // Échelle de l'élément au survol
      borderColor: ["#2ecc71", "#27ae60"], // Changement de couleur de bordure
      animation: "bounce 1s ease-in-out infinite", // Animation de rebond
    },
    mouseout: {
      scale: [1.2, 1], // Retour à l'échelle d'origine
      borderColor: ["#27ae60", "#2ecc71"], // Retour à la couleur de bordure d'origine
    },
    contextmenu: {
      translateX: [-200, 0], // Translation de -200px sur l'axe X
      backgroundColor: ["#9b59b6", "#8e44ad"], // Changement de couleur de fond
    },
    keydown: {
      backgroundColor: ["#1abc9c", "#16a085"], // Changement de couleur de fond lors de l'appui sur une touche
    },
    keyup: {
      backgroundColor: ["#e67e22", "#d35400"], // Changement de couleur de fond lors du relâchement d'une touche
    },
    mousemove: {
      translateX: [0, 10], // Légère translation sur l'axe X
      duration: 300, // Durée de l'animation en millisecondes
    },
    focus: {
      borderColor: ["#8e44ad", "#9b59b6"], // Changement de couleur de bordure lors du focus
    },
    blur: {
      borderColor: ["#9b59b6", "#8e44ad"], // Changement de couleur de bordure lors de la perte de focus
    },
  };

  // Vérification si le type d'animation est défini
  if (animations[type]) {
    // Lancement de l'animation avec les options spécifiées
    anime({
      targets: event.target, // Cible de l'animation
      loop: true, // Animation en boucle
      ...animations[type], // Ajout des paramètres d'animation spécifiques
      ...animationOptions, // Ajout des options d'animation générales
    });
  } else {
    // Avertissement si le type d'événement n'est pas pris en charge
    console.warn("Événement non pris en charge : ", type);
  }
}

// Ajouter des écouteurs d'événements pour chaque zone en fonction de leur attribut data-event
document.querySelectorAll(".eventZone").forEach((zone) => {
  const eventType = zone.getAttribute("data-event"); // Récupération du type d'événement

  // Attacher des écouteurs d'événements aux zones
  if (eventType === "contextmenu") {
    zone.addEventListener(eventType, (event) => {
      event.preventDefault(); // Empêcher le menu contextuel par défaut
      animateZone(event, eventType); // Appel de la fonction d'animation
    });
  } else if (eventType === "keydown" || eventType === "keyup") {
    // Gestion spéciale pour les événements keydown et keyup
    document.addEventListener(eventType, (event) => {
      const targetZone = document.getElementById(
        `zone${event.type === "keydown" ? "KeyDown" : "KeyUp"}`
      ); // Identification de la zone cible
      animateZone(event, event.type); // Appel de la fonction d'animation
    });
  } else {
    zone.addEventListener(eventType, (event) => {
      animateZone(event, eventType); // Appel de la fonction d'animation
    });
  }
});
