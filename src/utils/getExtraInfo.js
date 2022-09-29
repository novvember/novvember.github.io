export async function getGithubInfo(id = 'novvember') {
  const res = await fetch(`https://api.github.com/users/${id}`);
  if (!res.ok) throw new Error(res.status);
  const data = await res.json();
  return data.public_repos;
}

export async function getStackoverflowInfo(id = '352251') {
  const res = await fetch(
    `https://api.stackexchange.com/2.2/users/${id}?site=ru.stackoverflow`,
  );
  if (!res.ok) throw new Error(res.status);
  const data = await res.json();
  return data.items[0].reputation;
}

export async function getCodewarsInfo(id = 'novvember') {
  const res = await fetch(`https://www.codewars.com/api/v1/users/${id}`);
  if (!res.ok) throw new Error(res.status);
  const data = await res.json();
  return data.honor;
}
