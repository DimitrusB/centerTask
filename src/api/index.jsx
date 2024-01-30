const reqUrl = "https://api.github.com/search/users";

export const getUser = async (name, page = 1) => {
  try {
    const result = await fetch(`${reqUrl}?q=${name}&page=${page}`, {
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

export const getUserRepo = async (user, page = 1) => {
  try {
    const result = await fetch(`${reqUrlRepo}/${user}/repos?page=${page}` ,{
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
