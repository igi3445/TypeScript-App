import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Spinner } from 'react-bootstrap';
import { Link, useHistory, useParams } from 'react-router-dom';

interface WeatherForecastPageParams {
  city: string;
}

const WeatherForecastPage: React.FC = () => {
  const { city } = useParams<WeatherForecastPageParams>();
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const history = useHistory();

  useEffect(() => {
    const { lat, lng } = history.location.query;
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=GMT`);
      const data = await response.json();
      setForecastData(data.daily);
      setLoading(false);
    };

    fetchData();
  }, [history.location.query]);

  return (
    <Container>
      <Button as={Link} to="/" className="mt-4" variant="secondary">Back</Button>
      <h1 className="mt-4">{city} Weather Forecast</h1>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Date</th>
              <th>Min Temperature</th>
              <th>Max Temperature</th>
              <th>Weather</th>
            </tr>
          </thead>
          <tbody>
            {forecastData.map((forecast: any, index: number) => (
              <tr key={index}>
                <td>{forecast.date}</td>
                <td>{forecast.temperature_2m_min}</td>
                <td>{forecast.temperature_2m_max}</td>
                <td>{forecast.weather}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default WeatherForecastPage;
