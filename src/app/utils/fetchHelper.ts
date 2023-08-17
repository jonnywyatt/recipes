const isProd = process.env.NODE_ENV === 'production';
export const HOST = isProd
  ? 'https://recipes-sigma-five.vercel.app'
  : 'http://localhost:3000';
export async function fetchHelper(url: string, opts?: RequestInit) {
  try {
    const res = await fetch(`${HOST}${url}`, opts || {});
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}
