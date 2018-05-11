import { GITHUB_BASE_URL } from '../app/constants';

export default class GithubExplorerCtrl {

  static get $inject() { return ['$scope', '$http']; }

  constructor($scope, $http) {
    this.searchQuery = 'vivify';
    this.repos = [];
    this.$http = $http;
    this.page = 1;
    this.totalCount = 0;
    this.order = 'desc';
    this.sort = 'stars';
    this.filter = {
      license: '',
      stars: '',
      forks: ''
    };

    this.registerWatchers($scope);
  }

  registerWatchers($scope) {
    $scope.$watch(() => {
      return this.searchQuery;
    }, () => {
      this.page = 1;
      this.searchRepos()
    });

    $scope.$watch(() => {
      return this.filter;
    }, (val, oldVal) => {
      if (val === oldVal) {
        return;
      }
      this.page = 1;
      this.searchRepos()
    }, true)
  }

  calculateNewOrder() {
    let order = 'desc';

    if (this.order) {
      if (this.order === 'desc') {
        order = 'asc';
      }
    }

    this.order = order;

    return order;
  }

  getPageCount() {
    if (!this.totalCount) {
      return 0;
    }

    return Math.ceil(this.totalCount / 30);
  }

  nextPage() {
    if (this.page + 1 > this.getPageCount()) {
      return;
    }

    this.page++;
    this.searchRepos()
  }

  prevPage() {
    if (this.page === 1) {
      return;
    }

    this.page--;
    this.searchRepos()
  }

  toggleOrder(sort) {
    let order = this.calculateNewOrder();
    this.sort = sort;
    this.page = 1;
    this.searchRepos();
  }

  // this formats the filter so GitHub API can read it
  composeSearchQuery() {
    let filter = '';

    if (this.filter.license) {
      filter = ' license:' + this.filter.license;
    }

    if (this.filter.stars) {
      filter += ' stars:' + this.filter.stars;
    }

    if (this.filter.forks) {
      filter += ' forks:' + this.filter.forks;
    }

    return this.searchQuery + filter;
  }

  searchRepos() {
    if (!this.searchQuery) {
      this.repos = [];
      return;
    }

    this.$http.get(
      GITHUB_BASE_URL + '/search/repositories',
      { params: {q: this.composeSearchQuery(), sort: this.sort, order: this.order, page: this.page} }
    ).then((resp) => {
      this.repos = resp.data.items;
      this.totalCount = resp.data.total_count;
    });
  }

}
