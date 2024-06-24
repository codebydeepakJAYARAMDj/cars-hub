document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const carDetailsContainer = document.getElementById('car-details');
    const loadingIndicator = document.getElementById('loading');
    const historyButton = document.getElementById('history-button');
    const historyContainer = document.getElementById('history');
    const historyList = document.getElementById('history-list');
    let searchHistory = [];

    searchButton.addEventListener('click', function () {
        const query = searchInput.value.trim();
        if (query) {
            searchCar(query);
            updateHistory(query);
        }
    });

    historyButton.addEventListener('click', function () {
        historyContainer.style.display = historyContainer.style.display === 'none' || !historyContainer.style.display ? 'block' : 'none';
    });

    async function searchCar(query) {
        carDetailsContainer.innerHTML = '';
        carDetailsContainer.style.display = 'none';
        loadingIndicator.style.display = 'block';

        try {
            const response = await fetchJsonp(`https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getModels&make=${query}`, {
                jsonpCallbackFunction: 'callback'
            });
            const data = await response.json();
            const cars = data.Models;

            if (cars.length > 0) {
                displayCarDetails(cars);
            } else {
                carDetailsContainer.innerHTML = `<p>No cars found for "${query}".</p>`;
                carDetailsContainer.style.display = 'block';
            }
        } catch (error) {
            carDetailsContainer.innerHTML = `<p>Error fetching car details. Please try again later.</p>`;
            carDetailsContainer.style.display = 'block';
        } finally {
            loadingIndicator.style.display = 'none';
        }
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
            </div>
        `).join('');
        carDetailsContainer.style.display = 'block';
    }

    function updateHistory(query) {
        if (!searchHistory.includes(query)) {
            searchHistory.push(query);
            const listItem = document.createElement('li');
            listItem.textContent = query;
            historyList.appendChild(listItem);
        }
    }
});
