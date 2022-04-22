const axios = require('axios');

axios.interceptors.response.use((res) => {
  return res.data;
})

async function fetchRepoList() {
  return await axios.get('https://api.github.com/orgs/zhu-cli/repos');
}

async function fetchTagList(repo) {
  return await axios.get(`https://api.github.com/repos/zhu-cli/${repo}/tags`);
}

module.exports = {
  fetchRepoList,
  fetchTagList
}