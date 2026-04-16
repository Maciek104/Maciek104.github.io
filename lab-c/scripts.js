const map = L.map('map', {}).setView([51.505, -0.09], 13);


L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: '',
  crossOrigin: true
}).addTo(map);


function showLocation(position) {
  const userLocation = [position.coords.latitude, position.coords.longitude];
  map.setView(userLocation, 15);
}


document.getElementById('geolocation-btn').addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLocation, (err) => console.error(err));
  }
});


document.getElementById('download-map-btn').addEventListener('click', function () {
  const mapContainer = document.getElementById('map');

  const mainCanvas = document.createElement('canvas');
  mainCanvas.width = 400;
  mainCanvas.height = 400;
  const ctx = mainCanvas.getContext('2d');

  importMapToCanvas(mainCanvas, () => {
    document.getElementById('static-map').src = mainCanvas.toDataURL("image/png");
    createPuzzlesFromCanvas(mainCanvas);
  });
});


function importMapToCanvas(canvas, callback) {
  const ctx = canvas.getContext('2d');
  const tiles = document.querySelectorAll('.leaflet-tile-loaded');
  const mapRect = document.getElementById('map').getBoundingClientRect();

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let loadedCount = 0;
  tiles.forEach(tile => {
    const tileRect = tile.getBoundingClientRect();
    const offX = tileRect.left - mapRect.left;
    const offY = tileRect.top - mapRect.top;

    ctx.drawImage(tile, offX, offY, tileRect.width, tileRect.height);
  });

  callback();
}


function createPuzzlesFromCanvas(mainCanvas) {
  const puzzleContainer = document.getElementById('puzzle');
  puzzleContainer.innerHTML = '';

  const rows = 4, cols = 4;
  const pWidth = 100, pHeight = 100;
  let pieces = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const pieceCanvas = document.createElement('canvas');
      pieceCanvas.width = pWidth;
      pieceCanvas.height = pHeight;
      const pCtx = pieceCanvas.getContext('2d');

      pCtx.drawImage(mainCanvas, j * pWidth, i * pHeight, pWidth, pHeight, 0, 0, pWidth, pHeight);

      const div = document.createElement('div');
      div.className = 'puzzle-piece';
      div.id = `p-${i}-${j}`;
      div.draggable = true; // Slajd 55
      div.dataset.target = `${i}-${j}`;
      div.style.backgroundImage = `url(${pieceCanvas.toDataURL()})`;

      div.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', e.target.id);
      });

      pieces.push(div);
    }
  }

  pieces.sort(() => Math.random() - 0.5).forEach(p => puzzleContainer.appendChild(p));

  initBoard();
}


function initBoard() {
  const board = document.getElementById('puzzle-board');
  board.innerHTML = '';
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const slot = document.createElement('div');
      slot.className = 'puzzle-slot';
      slot.dataset.pos = `${i}-${j}`;

      slot.addEventListener('dragover', (e) => e.preventDefault());
      slot.addEventListener('drop', handleDrop);
      board.appendChild(slot);
    }
  }
}


function handleDrop(e) {
  e.preventDefault();
  const id = e.dataTransfer.getData('text');
  const piece = document.getElementById(id);

  if (e.target.classList.contains('puzzle-slot') && e.target.children.length === 0) {
    e.target.appendChild(piece);
    checkWin();
  }
}


function checkWin() {
  const slots = document.querySelectorAll('.puzzle-slot');
  let score = 0;
  slots.forEach(s => {
    const p = s.firstElementChild;
    if (p && p.dataset.target === s.dataset.pos) score++;
  });

  if (score === 16) {
    if (Notification.permission === "granted") {
      new Notification("Brawo! Mapa ułożona.", {
        body: "Udało Ci się poprawnie ułożyć puzzle!",
      });

      console.debug("Brawo! Mapa ułożona.");

    } else {
      alert("Brawo! Mapa ułożona.");
    }
  }
}


if ("Notification" in window) {
  Notification.requestPermission();
}
