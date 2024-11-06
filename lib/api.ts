const NASA_API_KEY = "DEMO_KEY";
const NASA_BASE_URL = "https://api.nasa.gov";

export async function fetchAPOD() {
  const response = await fetch(
    `${NASA_BASE_URL}/planetary/apod?api_key=${NASA_API_KEY}`
  );
  return response.json();
}

export async function fetchMarsPhotos() {
  const response = await fetch(
    `${NASA_BASE_URL}/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=${NASA_API_KEY}`
  );
  return response.json();
}

export async function fetchEarthImagery(lat = "29.78", lon = "-95.33") {
  const response = await fetch(
    `${NASA_BASE_URL}/planetary/earth/assets?lon=${lon}&lat=${lat}&date=2024-01-01&dim=0.15&api_key=${NASA_API_KEY}`
  );
  return response.json();
}