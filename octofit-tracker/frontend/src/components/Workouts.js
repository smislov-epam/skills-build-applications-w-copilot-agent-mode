import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    console.log('Workouts API endpoint:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Workouts fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching workouts:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="container mt-4">
      <div className="alert alert-info" role="alert">
        <div className="spinner-border spinner-border-sm me-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        Loading workouts...
      </div>
    </div>
  );
  
  if (error) return (
    <div className="container mt-4">
      <div className="alert alert-danger" role="alert">
        <strong>Error:</strong> {error}
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      <div className="row">
        {workouts.length > 0 ? (
          workouts.map(workout => (
            <div key={workout.id} className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{workout.name}</h5>
                  <p className="card-text">{workout.description}</p>
                  <ul className="list-unstyled">
                    <li><strong>Activity Type:</strong> {workout.activity_type}</li>
                    <li><strong>Duration:</strong> {workout.duration} minutes</li>
                    <li><strong>Difficulty:</strong> {workout.difficulty_level}</li>
                    <li><strong>Calories:</strong> {workout.calories_estimate}</li>
                    {workout.user_name && (
                      <li><strong>Recommended for:</strong> {workout.user_name}</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-center">No workouts found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Workouts;
