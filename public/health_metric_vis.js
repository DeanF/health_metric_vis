import 'plugins/health_metric_vis/health_metric_vis.less';
import 'plugins/health_metric_vis/health_metric_vis_controller';
import TemplateVisTypeTemplateVisTypeProvider from 'ui/template_vis_type/template_vis_type';
import VisSchemasProvider from 'ui/vis/schemas';


require('ui/registry/vis_types').register(HealthMetricVisProvider);

function HealthMetricVisProvider(Private) {
  const TemplateVisType = Private(TemplateVisTypeTemplateVisTypeProvider);
  const Schemas = Private(VisSchemasProvider);

  // return the visType object, which kibana will use to display and configure new
  // Vis object of this type.
  return new TemplateVisType({
    name: 'health-metric',
    title: 'Health Metric',
    description: 'A numeric health metric, can show a number and color it accordingly.',
    icon: 'fa-calculator',
    template: require('plugins/health_metric_vis/health_metric_vis.html'),
    params: {
      defaults: {
        handleNoResults: true,
        fontSize: 60,
        invertScale: false,
        redThreshold: 0,
        greenThreshold: 0,
        redColor: "#fd482f",
        yellowColor: "#ffa500",
        greenColor: "#6dc066"
      },
      editor: require('plugins/health_metric_vis/health_metric_vis_params.html')
    },
    implementsRenderComplete: true,
    schemas: new Schemas([
      {
        group: 'metrics',
        name: 'metric',
        title: 'Metric',
        min: 1,
        max: 1,
        defaults: [
          { type: 'count', schema: 'metric' }
        ]
      }
    ])
  });
}

export default HealthMetricVisProvider;
