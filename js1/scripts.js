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

// Fonction pour animer les zones en fonction du type d'événement
function animateZone(event, type) {
  const animationOptions = {
    easing: "easeInOutQuad",
    duration: 15000, // 15 secondes
  };

  const animations = {
    click: {
      translateX: [0, 500], // Translation de 500px
      backgroundColor: ["#e74c3c", "#ff7675"],
    },
    dblclick: {
      rotate: ["0turn", "1turn"],
      scale: [1, 1.5],
      backgroundColor: ["#3498db", "#9b59b6"],
      direction: "alternate",
      easing: "easeInOutBounce", // Effet de rebond
    },
    mouseover: {
      scale: [1, 1.2],
      borderColor: ["#2ecc71", "#27ae60"],
      animation: "bounce 1s ease-in-out infinite",
    },
    mouseout: {
      scale: [1.2, 1],
      borderColor: ["#27ae60", "#2ecc71"],
    },
    contextmenu: {
      translateX: [-200, 0],
      backgroundColor: ["#9b59b6", "#8e44ad"],
    },
    keydown: {
      backgroundColor: ["#1abc9c", "#16a085"],
    },
    keyup: {
      backgroundColor: ["#e67e22", "#d35400"],
    },
    mousemove: {
      translateX: [0, 10],
      duration: 300,
    },
    focus: {
      borderColor: ["#8e44ad", "#9b59b6"],
    },
    blur: {
      borderColor: ["#9b59b6", "#8e44ad"],
    },
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

// Ajouter des écouteurs d'événements pour chaque zone en fonction de leur attribut data-event
document.querySelectorAll(".eventZone").forEach((zone) => {
  const eventType = zone.getAttribute("data-event");

  // Attacher des écouteurs d'événements aux zones
  if (eventType === "contextmenu") {
    zone.addEventListener(eventType, (event) => {
      event.preventDefault(); // Empêcher le menu contextuel par défaut
      animateZone(event, eventType);
    });
  } else if (eventType === "keydown" || eventType === "keyup") {
    // Gestion spéciale pour les événements keydown et keyup
    document.addEventListener(eventType, (event) => {
      const targetZone = document.getElementById(
        `zone${event.type === "keydown" ? "KeyDown" : "KeyUp"}`
      );
      animateZone(event, event.type);
    });
  } else {
    zone.addEventListener(eventType, (event) => {
      animateZone(event, eventType);
    });
  }
});
