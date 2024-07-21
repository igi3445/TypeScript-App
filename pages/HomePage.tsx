import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AutocompleteInput from '../components/AutocompleteInput';

const cities = ['Moscow', 'St Petersburg', 'Rostov-on-Don', 'Vladivostok', 'Krasnodar', 'Yekaterinburg'];

const HomePage: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await Promise.all(
        cities.map(async (city) => {
          const cityData = await fetchCityData(city);
          return cityData;
        })
      );
      setWeatherData(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const fetchCityData = async (city: string) => {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
    const cityCoords = await response.json();
    const { latitude, longitude } = cityCoords[0];
    const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&windspeed_unit=ms`);
    const weatherData = await weatherResponse.json();
    return { city, ...weatherData };
  };

  return (
    <Container>
      <h1 className="mt-4">Weather Forecast</h1>
      <Row>
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          weatherData.map((data, index) => (
            <Col key={index} lg={4} md={6} sm={12} className="mt-4">
              <Card>
                <Card.Body>
                  <Card.Title>{data.city}</Card.Title>
                  <Card.Text>Temperature: {data.temperature}</Card.Text>
                  <Card.Text>Weather: {data.weather}</Card.Text>
                  <Card.Text>Wind Speed: {data.wind_speed}</Card.Text>
                  <Button as={Link} to={`/weather/${encodeURIComponent(data.city)}?lat=${data.latitude}&lng=${data.longitude}`} variant="primary">View Forecast</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default HomePage;
