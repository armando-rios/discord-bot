async function obtenerVidas() {
  const response = await fetch('/api/players');  // No necesita CORS
  const vidas = await response.json();
  actualizarLista(vidas);
}

function actualizarLista(vidas) {
  const container = document.getElementById('vidas-container');
  container.innerHTML = '';

  vidas.forEach(({ name: player, lives }) => {
    const color = lives > 2 ? "green-400" : lives > 0 ? "yellow-400" : "red-400";
    const graphWidth = Math.min((lives / 20) * 100, 100);
    container.innerHTML += `
                    <div class="bg-gray-800 rounded-2xl p-6 shadow-xl transform transition hover:scale-105 flex flex-col gap-2">
                        <h2 class="text-xl font-semibold mb-3">${player}</h2>
                        <div class="h-2 w-full bg-gray-700 rounded-full">
<div class="h-2 bg-green-400 rounded-full" style="width: ${graphWidth}%"></div>
                        </div>
                        <p class="text-gray-400">Vidas: <span class="text-${color}">${lives}</span></p>
                    </div>
                `;
  });
}

const pokeImg = async () => {
  const randomID = Math.floor(Math.random() * 1025) + 1
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomID}`)
  const data = await response.json()
  const image = data.sprites.other['official-artwork'].front_default
  console.log(image)
  document.querySelector('#pokemon').innerHTML = `<img src=${image}>`
}

pokeImg()

obtenerVidas();
