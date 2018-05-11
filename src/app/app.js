import angular from 'angular';

import '../style/app.css';

import githubExplorerDirective from '../github-explorer/github-explorer-directive';

angular.module('githubExplorerApp', [])
       .directive('githubExplorer', githubExplorerDirective);
