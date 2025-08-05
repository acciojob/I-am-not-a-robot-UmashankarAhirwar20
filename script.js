//your code here
const imageSources = [
  'https://picsum.photos/id/237/200/300', // img1
  'https://picsum.photos/seed/picsum/200/300', // img2
  'https://picsum.photos/200/300?grayscale', // img3
  'https://picsum.photos/200/300/', // img4
  'https://picsum.photos/200/300.jpg' // img5
];

let imagesArray = [];
let selectedIndices = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function init() {
  // Reset state
  document.getElementById('para').innerText = '';
  document.getElementById('verify').style.display = 'none';
  document.getElementById('reset').style.display = 'none';

  selectedIndices = [];

  // Prepare images with one duplicate
  imagesArray = [...imageSources];
  const duplicateIndex = Math.floor(Math.random() * imagesArray.length);
  const duplicateImage = imagesArray[duplicateIndex];
  imagesArray.push(duplicateImage);

  // Shuffle
  shuffleArray(imagesArray);

  // Render images
  const container = document.getElementById('images-container');
  container.innerHTML = '';

  imagesArray.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.dataset.index = index;
    img.className = '';
    img.addEventListener('click', onImageClick);
    container.appendChild(img);
  });
}

// Handle image clicks
function onImageClick(e) {
  const index = e.target.dataset.index;

  if (selectedIndices.includes(index)) return; // Avoid double-click

  selectedIndices.push(index);
  e.target.classList.add('selected');

  document.getElementById('reset').style.display = 'inline-block';

  if (selectedIndices.length === 2) {
    document.getElementById('verify').style.display = 'inline-block';
  }
}

// Reset
document.getElementById('reset').addEventListener('click', () => {
  init();
});

// Verify
document.getElementById('verify').addEventListener('click', () => {
  const [firstIdx, secondIdx] = selectedIndices;
  const src1 = imagesArray[firstIdx];
  const src2 = imagesArray[secondIdx];

  const imgs = document.querySelectorAll('#images-container img');
  // Remove event listeners to prevent further clicks
  imgs.forEach(img => img.removeEventListener('click', onImageClick));

  // Hide verify button after click
  document.getElementById('verify').style.display = 'none';

  if (src1 === src2) {
    document.getElementById('para').innerText = 'You are a human. Congratulations!';
  } else {
    document.getElementById('para').innerText = "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

// Initialize on page load
window.onload = init;