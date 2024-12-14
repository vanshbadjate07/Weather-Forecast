const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1;
let dd = today.getDate();

if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;

const formatted = `${dd}/${mm}/${yyyy}`;
document.getElementById('date').textContent = formatted;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=en`)
                .then(response => response.json())
                .then(data => {
                    const city = data.address.city || data.address.town || data.address.village || "Unknown City";
                    console.log("City:", city);
                    document.getElementById('city-name').textContent = city;
                })
                .catch(error => {
                    console.error("Error fetching location data:", error);
                    document.getElementById('city-name').textContent = "Unable to fetch location";
                });
        },
        (error) => {
            console.error("Geolocation error:", error);
            document.getElementById('city-name').textContent = "Location access denied";
        }
    );
} else {
    document.getElementById('city-name').textContent = "Geolocation not supported by your browser.";
}
