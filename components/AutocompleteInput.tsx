import React, { useState } from 'react';
import { Form, ListGroup } from 'react-bootstrap';

const cities = ['Moscow', 'St Petersburg', 'Rostov-on-Don', 'Vladivostok', 'Krasnodar', 'Yekaterinburg'];

interface AutocompleteInputProps {
  onSelectCity: (city: string) => void;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({ onSelectCity }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    const filteredSuggestions = cities.filter((city) => city.toLowerCase().startsWith(value.toLowerCase()));
    setSuggestions(filteredSuggestions);
  };

  const handleSelectCity = (city: string) => {
    setInputValue(city);
    setSuggestions([]);
    onSelectCity(city);
  };

  return (
    <Form.Group>
      <Form.Control
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter city"
      />
      {suggestions.length > 0 && (
        <ListGroup>
          {suggestions.map((city, index) => (
            <ListGroup.Item key={index} action onClick={() => handleSelectCity(city)}>
              {city}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Form.Group>
  );
};

export default AutocompleteInput;
