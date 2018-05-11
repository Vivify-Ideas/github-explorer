import angular from 'angular';
import { GITHUB_BASE_URL } from '../app/constants';

export default class GithubExplorerCtrl {

  static get $inject() { return ['$scope', '$http']; }

  constructor($scope, $http) {
    this.searchQuery = '';
    this.repos = [];
    this.$http = $http;

    $scope.$watch(angular.bind(this, function() {
      return this.searchQuery;
    }), angular.bind(this, this.onSearchQueryChange))
  }

  onSearchQueryChange() {
    if (!this.searchQuery) {
      return;
    }

    this.$http.get(GITHUB_BASE_URL + '/search/repositories', { params: { q: this.searchQuery } })
        .then(angular.bind(this, function(resp) {
          this.repos = resp.data.items;
        }))
        .catch(function (error) {
          alert(error.data.message);
        });
  }

}
