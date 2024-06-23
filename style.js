document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const carDetailsContainer = document.getElementById('car-details');

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            fetchCarDetails(query);
        }
    });

    async function fetchCarDetails(query) {
        try {
            const response = await fetch(`https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getTrims&keyword=${query}`);
            const data = await response.json();

            if (data && data.Trims.length > 0) {
                const car = data.Trims[0]; // Assuming we take the first result for simplicity
                displayCarDetails(car);
            } else {
                displayNoResults();
            }
        } catch (error) {
            console.error('Error fetching car details:', error);
            displayError();
        }
    }

    function displayCarDetails(car) {
        carDetailsContainer.innerHTML = `
            <h2>${car.model_make_id} ${car.model_name}</h2>
            <img src="https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getModel&model=${car.model_id}&make=${car.model_make_id}" alt="${car.model_name}">
            <p><strong>Year:</strong> ${car.model_year}</p>
            <p><strong>Engine:</strong> ${car.model_engine_cc} cc</p>
            <p><strong>Power:</strong> ${car.model_engine_power_ps} PS</p>
            <p><strong>Fuel Type:</strong> ${car.model_engine_fuel}</p>
            <p><strong>Transmission:</strong> ${car.model_transmission_type}</p>
        `;
        carDetailsContainer.style.display = 'block';
    }

    function displayNoResults() {
        carDetailsContainer.innerHTML = '<p>No results found. Please try another search.</p>';
        carDetailsContainer.style.display = 'block';
    }

    function displayError() {
        carDetailsContainer.innerHTML = '<p>There was an error fetching the car details. Please try again later.</p>';
        carDetailsContainer.style.display = 'block';
    }
});
