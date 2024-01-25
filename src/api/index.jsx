const reqUrl = "https://api.github.com/search/users?q";

export const getUser = async (name) => {
  try {
    const result = await fetch(`${reqUrl}=${name}`);
    const data = await result.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
