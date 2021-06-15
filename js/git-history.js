function buildGitHistoryTable (repos) {
  let table = document.querySelector('.git-history-table')
  repos.forEach((repo, i) => {
    let repoLine = table.insertRow(1);
    let repoName = repoLine.insertCell(0);
    let repoLang = repoLine.insertCell(1);
    repoName.innerHTML = `<a target="_blank" href="${repo.svn_url}">${repo.name}</span>`
    repoLang.innerHTML = `<span class="word-tag">${repo.language || '[Nenhuma]'} </span>`
  });
}

function getGitReposHistory (callback) {
  let repos;
  let reposReq = new XMLHttpRequest();
  reposReq.open('GET', 'https://api.github.com/users/henriqueyun/repos');
  reposReq.send();
  reposReq.onload = function(e) {
    repos = JSON.parse(e.currentTarget.responseText);
    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#descri%C3%A7%C3%A3o
    repos.sort((repoA, repoB) => {
      return Date.parse(repoB.updated_at) - Date.parse(repoA.updated_at);
    })
    callback(repos.slice(0,5))
  };
}

getGitReposHistory(buildGitHistoryTable)
