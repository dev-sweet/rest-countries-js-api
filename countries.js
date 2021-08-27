const loadCountries =(api)=>{
    fetch(api)
    .then(res => res.json())
    .then(data => displayCoutries(data));
}
const displayCoutries = (countries) =>{
    const countriesContainer = document.getElementById('countries-container');
    countriesContainer.innerHTML = '';
    countries.forEach(country => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h3>${country.name}</h3>
            <p>Capital : ${country.capital}</p>
            <p>Area : ${country.area}</p>
            <button class="btn btn-secondary" onclick="loadCountryByName('${country.name}')">Details</button>     
        `
        div.classList.add('country');
        countriesContainer.appendChild(div);
    });
}
const displayCountryDetails = (country) =>{
    const countryDetails = document.getElementById('countries-container');
    countryDetails.innerHTML = '';
    const div = document.createElement('div');
    div.innerHTML = `
        <img class="w-25" src="${country.flag}" />
        <h3>${country.name}</h3>
        <p>Capital : ${country.capital}</p>
        <p>Area : ${country.area}</p>
        <p>Currencie : ${country.currencies[0].name}</p>
    `
    const borders = document.createElement('p');
    borders.innerText = 'Borders : ';
    for(border of country.borders){
        borders.innerText = borders.innerText + '  ' + border;
    }
    div.classList.add('country');
    div.appendChild(borders);
    countryDetails.appendChild(div);
}
const seeAllCountries = () =>{
    loadCountries('https://restcountries.eu/rest/v2/all');
}
seeAllCountries()
const searchCountries = () =>{
    const searchCountry = document.getElementById('search-box').value;
    loadCountries(`https://restcountries.eu/rest/v2/name/${searchCountry}`);
}

const loadCountryByName = (name) =>{
    const url = `https://restcountries.eu/rest/v2/name/${name}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayCountryDetails(data[0]));
}
