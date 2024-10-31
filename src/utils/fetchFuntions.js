export const fetchWorkers = async () => {
  try {
    const response = await fetch("/api/workers");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
