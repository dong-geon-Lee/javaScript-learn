export const getJSON = async url => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`something Wrong! (${response.status})`);
  const data = await Promise.race([response.json(), timeout(10)]);
  return data;
};

export const timeout = s => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
