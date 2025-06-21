import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

function SearchForm({ onSearch, defaultParams = {}, onParamsUpdate }) {
  const [searchString, setSearchString] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    setSearchString(defaultParams.searchString || '');
    setStartTime(defaultParams.startTime || '');
    setEndTime(defaultParams.endTime || '');
  }, [defaultParams]);

  useEffect(() => {
    onParamsUpdate?.({ searchString, startTime, endTime });
  }, [searchString, startTime, endTime]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchString || !startTime || !endTime) {
      alert('Please fill all fields');
      return;
    }
    onSearch({ searchString, startTime, endTime });
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <Row>
        <Col md={4}>
          <Form.Group controlId="searchString">
            <Form.Label>Search String</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. srcaddr=159.62.125.136"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="startTime">
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              type="number"
              placeholder="Start Unix Time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="endTime">
            <Form.Label>End Time</Form.Label>
            <Form.Control
              type="number"
              placeholder="End Unix Time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={2} className="d-flex align-items-end">
          <Button type="submit" variant="primary" className="w-100">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default SearchForm;
