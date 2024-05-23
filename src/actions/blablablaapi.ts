"use server";

export async function simpleFetch(url: string, options: {}) {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(response.status);
    return result;
  } catch {
    console.log("bad shizz went down");
  }
}
