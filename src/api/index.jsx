const reqUrl = "https://api.github.com/search/users?q";

export const getUser = async (name) => {
  try {
    const result = await fetch(`${reqUrl}=${name}`, {
      headers: {
        'Authorization': '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'
      }
    });
    const data = await result.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};


const reqUrlRepo = "https://api.github.com/users";

export const getUserRepo = async (user) => {
  try {
    const result = await fetch(`${reqUrlRepo}/${user}/repos` ,{
         headers: {
      'Authorization': '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'
    }
  });
    const data = await result.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
