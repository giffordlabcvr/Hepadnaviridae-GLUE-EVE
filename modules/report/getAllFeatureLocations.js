// output all feature locations in project as a single table
function getAllFeatureLocations() {

	// get a list of all reference sequences from GLUE
	var result = glue.command(["list","reference"]);
	var listResult = result["listResult"];
	var referencesList = listResult["row"];
	//glue.log("INFO", "RESULT WAS ", referencesList);
	
	// iterate through list getting feature locations
	// iterate through reference list and get AA composition of each coding feature
	var referenceResults = {};
	var outputArray = [];
	_.each(referencesList, function(refObj) {

		//glue.log("INFO", "RESULT WAS ", refObj);
		var refseqResults = {};
		var referenceProperties = refObj["value"];
		var referenceName = referenceProperties[0];
		//glue.log("INFO", "Reference name result was:", referenceName);

		// list feature locations	
		glue.inMode("/reference/"+referenceName, function() {

			featureLocationResults = {};
			var featuresResult = glue.tableToObjects(glue.command(["list", "feature-location"]));
			//glue.log("INFO", "RESULT WAS ", featuresResult);
			 
			// iterate through feature locations
			_.each(featuresResult, function(featureObj) {

				//glue.log("INFO", "RESULT WAS ", featureObj);
			    var featureResults = {};
		
			    // get amino acid sequence of coding feature
			    var featureName = featureObj["feature.name"];
			    //glue.log("INFO", "Feature name result was:", featureName);
				
				// list feature locations	
				glue.inMode("/feature-location/"+featureName, function() {
				
					var segmentsResult = glue.tableToObjects(glue.command(["list", "segment"]));

					// iterate through feature locations
					_.each(segmentsResult, function(segmentObj) {

						//glue.log("INFO", "SEGMENT RESULT WAS ", segmentObj);

						// add results to array to be returned to GLUE
						outputArray.push({
	   
							referenceName: referenceName,
							featureName: featureName,
							refStart: segmentObj["refStart"],
							refEnd: segmentObj["refEnd"],
							spliceIndex: segmentObj["spliceIndex"],
							transcriptionIndex: segmentObj["transcriptionIndex"],
							translationModifierName: segmentObj["translationModifierName"]

						});
		 
					});
				
				 });

			 });
	
		 });

	});

	// send the output to digs console	 
	return outputArray;
	
}

