const currentDate = new Date();
const day = currentDate.getDate();
const month = currentDate.toLocaleString('default', { month: 'long' });
const year = currentDate.getFullYear();
const formattedDate = `${day} ${month}, ${year}`;
document.getElementById("c_date").textContent = formattedDate;

const loc = document.getElementById('getLoc');
const search = document.getElementById('search');
const info = document.querySelector('.info');

const apiKey = 'bacd5f61d03b4c52a6f174022251501';
const apiEndpoint = 'https://api.weatherapi.com/v1/current.json';

function getWeather(location) {
    const url = `${apiEndpoint}?key=${apiKey}&q=${location}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.querySelector('.condition p').textContent = data.current.condition.text;
            document.querySelector('.temperature p').textContent = `${data.current.temp_c}°C`;
            document.querySelector('.wind p').textContent = `${data.current.wind_kph} KMH`;
            document.querySelector('.Humidity p').textContent = `${data.current.humidity}%`;
            document.querySelector('.visibility p').textContent = `${data.current.vis_km} km`;
        });
}

function showInfo() {
    info.style.display = 'none';
    setTimeout(() => {
        info.style.display = 'block';
    }, 100);
}

search.addEventListener('click', () => {
    const location = loc.value;
    if (location) {
        showInfo();
        getWeather(location);
    } else {
        alert('Please enter a location!');
    }
});

loc.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const location = loc.value;
        if (location) {
            showInfo();
            getWeather(location);
        } else {
            alert('Please enter a location!');
        }
    }
});
