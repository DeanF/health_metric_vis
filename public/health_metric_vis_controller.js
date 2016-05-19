/* jshint esversion: 6 */

define(function (require) {
  let _ = require('lodash');
  const module = require('ui/modules').get('health_metric_vis');

  module.controller('KbnHealthMetricVisController', function ($scope, Private) {
    const tabifyAggResponse = Private(require('ui/agg_response/tabify/tabify'));

    const metrics = $scope.metrics = [];

    function isInvalid(val) {
      return _.isUndefined(val) || _.isNull(val) || _.isNaN(val);
    }

    $scope.processTableGroups = function (tableGroups) {
      tableGroups.tables.forEach(function (table) {
        table.columns.forEach(function (column, i) {
          const fieldFormatter = table.aggConfig(column).fieldFormatter();
          let value = table.rows[0][i];

          value = isInvalid(value) ? '?' : fieldFormatter(value);

          metrics.push({
            value: value
          });
        });
      });
    };

    $scope.$watch('esResponse', function (resp) {
      if (resp) {
        metrics.length = 0;
        $scope.processTableGroups(tabifyAggResponse($scope.vis, resp));
      }
    });
  });
});
