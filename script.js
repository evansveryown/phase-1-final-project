const container = document.getElementById('countries-container');
const modal = document.getElementById('country-modal');
const modalDetails = document.getElementById('modal-details');
const closeBtn = document.querySelector('.close-button');

fetch('https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,currencies,languages')
  .then(res => res.json())
  .then(data => {
    data.forEach(country => {
      const card = document.createElement('div');
      card.classList.add('country-card');

      card.innerHTML = `
        <img class="country-flag" src="${country.flags.png}" alt="Flag of ${country.name.common}" />
        <div class="country-name">${country.name.common}</div>
      `;

      card.addEventListener('click', () => {
        const capital = country.capital ? country.capital[0] : 'N/A';
        const population = country.population.toLocaleString();
        const currencies = country.currencies
          ? Object.values(country.currencies).map(cur => cur.name).join(', ')
          : 'N/A';
        const languages = country.languages
          ? Object.values(country.languages).join(', ')
          : 'N/A';

        modalDetails.innerHTML = `
          <h2>${country.name.common}</h2>
          <img src="${country.flags.png}" alt="Flag of ${country.name.common}" style="width: 100%; border-radius: 8px;" />
          <p><strong>Capital:</strong> ${capital}</p>
          <p><strong>Population:</strong> ${population}</p>
          <p><strong>Region:</strong> ${country.region}</p>
          <p><strong>Currency:</strong> ${currencies}</p>
          <p><strong>Languages:</strong> ${languages}</p>
        `;
        modal.classList.remove('hidden');
      });

      container.appendChild(card);
    });
  })
  .catch(error => {
    container.innerHTML = `<p>Error loading country data.</p>`;
    console.error(error);
  });

  // Close Modal
closeBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Close on outside click
window.addEventListener('click', e => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});