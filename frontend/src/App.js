import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import Results from './components/Results';
import { searchEvents } from './api/search';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [searches, setSearches] = useState([]);

  const addNewSearchBlock = () => {
    setSearches(prev => [
      ...prev,
      {
        id: Date.now(),
        params: { searchString: '', startTime: '', endTime: '' },
        results: [],
        currentPage: 1,
        hasNext: false,
        hasPrevious: false,
        loading: false,
      },
    ]);
  };

  const updateSearchParams = (id, params) => {
    setSearches(prev =>
      prev.map(search =>
        search.id === id ? { ...search, params } : search
      )
    );
  };

  const handleSearch = async (id, params, page = 1) => {
    setSearches(prev =>
      prev.map(search =>
        search.id === id ? { ...search, loading: true } : search
      )
    );

    try {
      const data = await searchEvents({ ...params, page });
      setSearches(prev =>
        prev.map(search =>
          search.id === id
            ? {
                ...search,
                results: data.results || [],
                hasNext: !!data.next,
                hasPrevious: !!data.previous,
                currentPage: page,
                loading: false,
              }
            : search
        )
      );
    } catch (error) {
      console.error(`Search error for block ${id}:`, error);
      setSearches(prev =>
        prev.map(search =>
          search.id === id ? { ...search, loading: false } : search
        )
      );
      alert(`Search error in block ${id}.`);
    }
  };

  const handleSearchAll = () => {
    if (searches.length < 2) {
      alert('Please add at least one more search block to use "Search All".');
      return;
    }

    let hasIncomplete = false;

    searches.forEach(search => {
      const { id, params } = search;
      const { searchString, startTime, endTime } = params;
      if (!searchString || !startTime || !endTime) {
        hasIncomplete = true;
        console.warn(`Search Block ${id} is incomplete.`);
      } else {
        handleSearch(id, params);
      }
    });

    if (hasIncomplete) {
      alert('Some search blocks are incomplete. Only complete ones were triggered.');
    }
  };

  const handlePageChange = (id, newPage) => {
    const search = searches.find(s => s.id === id);
    if (search?.params) {
      handleSearch(id, search.params, newPage);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Multi-Search Event Log Explorer</h2>

      <div className="d-flex justify-content-between mb-3">
        <button onClick={addNewSearchBlock} className="btn btn-success">
          ➕ Add Search Block
        </button>
        <button
          onClick={handleSearchAll}
          className="btn btn-primary"
          disabled={searches.length < 2}
          title={searches.length < 2 ? "Add more blocks to use Search All" : ""}
        >
          🚀 Search All
        </button>
      </div>
    
      {searches.map(search => (
        <div key={search.id} className="mb-5 p-3 border rounded shadow-sm bg-light">
          <SearchForm
            onSearch={params => {
              updateSearchParams(search.id, params);
              handleSearch(search.id, params);
            }}
            defaultParams={search.params}
            onParamsUpdate={params => updateSearchParams(search.id, params)}
          />
          <Results
            data={search.results}
            loading={search.loading}
            currentPage={search.currentPage}
            hasNext={search.hasNext}
            hasPrevious={search.hasPrevious}
            onPageChange={page => handlePageChange(search.id, page)}
          />
        </div>
      ))}
    </div>
  );
}

export default App;
