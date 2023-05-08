const HOST = 'http://localhost:3000';
export async function getData(url: string) {
  try {
    const res = await fetch(`${HOST}${url}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}
