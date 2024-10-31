export const fetchWorkers = async () => {
  try {
    const response = await fetch("/api/workers");

    if (!response.ok) {
      throw new Error("Error fetching workers");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

export const fetchUpdateWorker = async (worker) => {
  try {
    const response = await fetch(`/api/workers/${worker.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(worker),
    });

    if (!response.ok) {
      throw new Error('Failed to update worker');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating worker:', error);
    throw error;
  }
};

export const fetchCreateWorker = async (worker) => {
  try {
    const response = await fetch('/api/workers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(worker),
    });

    if (!response.ok) {
      throw new Error('Failed to create worker');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating worker:', error);
    throw error;
  }
}