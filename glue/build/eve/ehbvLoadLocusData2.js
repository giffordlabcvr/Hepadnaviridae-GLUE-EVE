// Preset variables
var refconDataPath = "tabular/eve/ehbv-refseqs-side-data.tsv";

// Load the eHBV reference seq data and store relationships between locus and viral taxonomy
var ehbvRefseqResultMap = {};
get_refcon_data(ehbvRefseqResultMap, refconDataPath);
//glue.log("INFO", "RESULT WAS ", ehbvRefseqResultMap);




// Load EVE data from tab file 
var loadResult;
glue.inMode("module/hepadnaviridaeTabularUtility", function() {
	loadResult = glue.tableToObjects(glue.command(["load-tabular", "tabular/eve/ehbv-side-data.tsv"]));
    //glue.log("INFO", "load result was:", loadResult);
});

_.each(loadResult, function(eveObj) {

    var locus_name;
	glue.inMode("custom-table-row/locus_data/"+eveObj.sequenceID, function() {
	
		//glue.log("INFO", "Entering locus table data for DIGS sequence:", eveObj.sequenceID);
		
		glue.command(["set", "field", "locus_numeric_id", eveObj.locus_numeric_id]);
		glue.command(["set", "field", "scaffold", eveObj.scaffold]);
		glue.command(["set", "field", "start_position", eveObj.extract_start]);
		glue.command(["set", "field", "end_position", eveObj.extract_end]);
		glue.command(["set", "field", "orientation", eveObj.orientation]);
		glue.command(["set", "field", "bitscore", eveObj.bitscore]);
		glue.command(["set", "field", "identity", eveObj.identity]);
		glue.command(["set", "field", "sequence_length", eveObj.sequence_length]);
		glue.command(["set", "field", "assigned_name", eveObj.locus_name]);
		glue.command(["set", "field", "host_class", eveObj.host_class]);
		glue.command(["set", "field", "host_species", eveObj.host_species]);
		glue.command(["set", "field", "host_superorder", eveObj.host_superorder]);
		glue.command(["set", "field", "host_order", eveObj.host_order]);
		glue.command(["set", "field", "host_family", eveObj.host_family]);
		glue.command(["set", "field", "host_genus", eveObj.host_genus]);
		locus_name = eveObj.locus_name;
		// glue.command(["set", "field", "host_major_clade", eveObj.major_clade]);
		// glue.command(["set", "field", "host_middle_clade", eveObj.middle_clade]);
		// glue.command(["set", "field", "host_minor_clade", eveObj.minor_clade]);
	});

	glue.inMode("sequence/fasta-digs-ehbv/"+eveObj.sequenceID, function() {
	
		//glue.log("INFO", "Entering sequence table data for DIGS sequence:", eveObj.sequenceID);
		glue.command(["set", "field", "name", eveObj.sequenceID]);
		glue.command(["set", "field", "full_name", eveObj.sequenceID]);
		glue.command(["set", "field", "genus", eveObj.virus_genus]);

	});

});

// get a list of sequence IDs from a given source in an alignment
function get_refcon_data(resultMap, refconDataPath) {

  // Load EVE reference data from tab file 
  var loadResult;
  glue.inMode("module/hepadnaviridaeTabularUtility", function() {
	  loadResult = glue.tableToObjects(glue.command(["load-tabular", refconDataPath]));
	  //glue.log("INFO", "load result was:", loadResult);
  });

  _.each(loadResult, function(eveObj) {

	  var source_name = eveObj.source_name
	  var sequenceID = eveObj.sequenceID
	  var locus_numeric_id = eveObj.locus_numeric_id;
	  var locus_name = eveObj.locus_name;
	  //glue.log("INFO", "Setting locus data for EVE locus:", eveObj.locus_name);
	  resultMap[locus_name] = eveObj;
	
  });
  
}
