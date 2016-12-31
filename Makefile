VERSION="5.0.0"

version:
	mkdir -p kibana
	cp -r docs public index.js package.json kibana
	sed -i 's/{VERSION}/${VERSION}/g' kibana/package.json
	zip -r health_metric_vis-${VERSION}.zip kibana
	rm -rf kibana
