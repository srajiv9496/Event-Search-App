import React from 'react';
import { Table, Button } from 'react-bootstrap';

function Results({ data, onPageChange, currentPage, hasNext, hasPrevious }) {
  if(!Array.isArray(data)) {
    console.error("Expected data to be an array, but received:", data);
    return <p>Invalid data format. Expected an array.</p>;
  }
  if (!data || data.length === 0) return <p>No results found.</p>;

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Src Addr</th>
            <th>Dst Addr</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Action</th>
            <th>File</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r, i) => (
            <tr key={i}>
              <td>{r.event.srcaddr}</td>
              <td>{r.event.dstaddr}</td>
              <td>{r.event.starttime}</td>
              <td>{r.event.endtime}</td>
              <td>{r.event.action}</td>
              <td>{r.file}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between mt-3">
        <Button
          variant="secondary"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrevious}
        >
          Previous
        </Button>
        <span>Page {currentPage}</span>
        <Button
          variant="secondary"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNext}
        >
          Next
        </Button>
      </div>
    </>
  );
}

export default Results;
