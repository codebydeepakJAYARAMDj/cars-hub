document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const carDetailsContainer = document.getElementById('car-details');
    const loadingElement = document.getElementById('loading');

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            fetchCarDetails(query);
        }
    });

    async function fetchCarDetails(query) {
        const url = `https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getTrims&keyword=${query}`;
        try {
            showLoading();
            const response = await fetchJsonp(url);
            const data = await response.json();
            hideLoading();

            if (data && data.Trims.length > 0) {
                displayCarDetails(data.Trims);
            } else {
                displayNoResults();
            }
        } catch (error) {
            console.error('Error fetching car details:', error);
            hideLoading();
            displayError();
        }
    }

    function showLoading() {
        loadingElement.style.display = 'block';
        carDetailsContainer.style.display = 'none';
    }

    function hideLoading() {
        loadingElement.style.display = 'none';
    }

    function displayCarDetails(cars) {
        carDetailsContainer.innerHTML = cars.map(car => `
            <div class="car-item">
                <h2>${car.model_make_id} ${car.model_name}</h2>
                <p><strong>Year:</strong> ${car.model_year}</p>
                <p><strong>Engine:</strong> ${car.model_engine_cc} cc</p>
                <p><strong>Power:</strong> ${car.model_engine_power_ps} PS</p>
                <p><strong>Fuel Type:</strong> ${car.model_engine_fuel}</p>
                <p><strong>Transmission:</strong> ${car.model_transmission_type}</p>
                <p><strong>Body Type:</strong> ${car.model_body}</p>
                <p><strong>Doors:</strong> ${car.model_doors}</p>
                <p><strong>Seats:</strong> ${car.model_seats}</p>
                <p><strong>Drive:</strong> ${car.model_drive}</p>
            </div>
        `).join('');
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
