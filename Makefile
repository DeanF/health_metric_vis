VERSION="5.0.0"

version:
	mkdir -p kibana/health_metric_vis
	cp -r docs public index.js package.json kibana/health_metric_vis
	sed -i 's/{VERSION}/${VERSION}/g' kibana/health_metric_vis/package.json
	zip -r health_metric_vis-${VERSION}.zip kibana
	rm -rf kibana
