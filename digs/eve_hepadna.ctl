# Database integrated genome screening (DIGS) control file for endogenous flaviviral element screen
# DIGS tool: https://giffordlabcvr.github.io/DIGS-tool/

Begin SCREENDB;
	db_name=eve_hepadna;      # Screening database name
	mysql_server=localhost;   # Using local MySQL database server
ENDBLOCK;


# Paths and parameters for in silico screening using DIGS
BEGIN SCREENSETS;
	query_aa_fasta=/home2/giff01r/DIGS/projects/eve/final_fasta/hepadna-probes.faa;   # Path to polypeptide sequence probe library
	reference_aa_fasta=/home2/giff01r/DIGS/projects/eve/final_fasta/hepadna-refs.faa; # Path to polypeptide sequence reference library
	output_path=./tmp/;
	bitscore_min_tblastn=60;
	seq_length_minimum=40;
	defragment_range=1000;
	consolidate_range=3000;
	blast_threads=8;
ENDBLOCK;


# List of target genomes to screen - DIGS screens all genome assemblies in each of these directories
BEGIN TARGETS;
	Aves/
	Squamata/
	Crocodilia/
	Amphibia/
	Actinopterygii/
	Sarcopterygii/
	Chondrichthyes/
ENDBLOCK;

