const countriesContainer = document.getElementById('counriesContainer');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

let allCountries = [];

async function getAllCountries() {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,population,symbol,languages,region');

    const countriesData = await response.json();

    console.log(countriesData);

    displayCountries(countriesData);
}

function displayCountries(countries) {
   countries.forEach((country) => {
    countriesContainer.innerHTML += `
        <div class="country-card">
           <img src="${country.flags.png}" />

           <div class="country-info"> 
            <p></p>
            <p></p>
            <p></p>
            <p></p>
           </div>
        </div>
        
        `;
   })
}

getAllCountries();