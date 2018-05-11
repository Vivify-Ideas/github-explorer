import angular from 'angular';

import '../style/app.css';

import githubExplorerDirective from '../github-explorer/github-explorer-directive';
import githubExplorerCtrl from '../github-explorer/github-explorer-ctrl';

angular.module('githubExplorerApp', [])
       .directive('githubExplorer', githubExplorerDirective)
       .controller('githubExplorerCtrl', githubExplorerCtrl);
