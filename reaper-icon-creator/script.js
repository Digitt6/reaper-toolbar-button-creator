const iconInput = document.getElementById('iconInput');
const colorInputs = [
  document.getElementById('color1'),
  document.getElementById('color2'),
  document.getElementById('color3'),
];
const canvas = document.getElementById('preview');
const ctx = canvas.getContext('2d');
const downloadLink = document.getElementById('downloadLink');
const generateBtn = document.getElementById('generateBtn');

let baseImage = null;

iconInput.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const img = new Image();
  img.onload = () => {
    baseImage = img;
  };
  img.src = URL.createObjectURL(file);
});

generateBtn.addEventListener('click', () => {
  if (!baseImage) {
    alert("Please select an icon first.");
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 3; i++) {
    ctx.drawImage(baseImage, 0, i * 30, 30, 30);
    ctx.fillStyle = colorInputs[i].value + "80";
    ctx.fillRect(0, i * 30, 30, 30);
  }

  canvas.toBlob(blob => {
    const url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "reaper_icon.png";
    downloadLink.style.display = "block";
    downloadLink.textContent = "Download Icon";
  });
});