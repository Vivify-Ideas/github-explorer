import angular from 'angular';
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

    $scope.$watch(() => {
      return this.searchQuery;
    }, () => {
      this.page = 1;
      this.searchRepos()
    })
  }

  calculateOrder() {
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
    let order = this.calculateOrder();
    this.sort = sort;
    this.page = 1;
    this.searchRepos();
  }

  searchRepos() {
    if (!this.searchQuery) {
      this.repos = [];
      return;
    }

    this.$http.get(
      GITHUB_BASE_URL + '/search/repositories',
      { params: {q: this.searchQuery, sort: this.sort, order: this.order, page: this.page} }
    ).then((resp) => {
      this.repos = resp.data.items;
      this.totalCount = resp.data.total_count;
    })
    .catch((error) => {
      alert(error.data.message);
    });
  }

}
