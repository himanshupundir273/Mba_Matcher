const API_BASE_URL = import.meta.env.VITE_API_URL;
console.log("API Base URL:", API_BASE_URL);

export const searchUniversities = async (searchParams) => {
  try {
    const response = await fetch(`${API_BASE_URL}/universities/match`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchParams),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Search failed");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getAllUniversities = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/universities`);

    if (!response.ok) {
      throw new Error("Failed to fetch universities");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getUniversityById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/universities/${id}`);

    if (!response.ok) {
      throw new Error("University not found");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
