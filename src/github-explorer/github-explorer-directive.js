let githubExplorer = () => {
  return {
    template: require('./github-explorer.html'),
    controller: 'githubExplorerCtrl',
    controllerAs: 'githubExplorer'
  }
};

export default githubExplorer;
