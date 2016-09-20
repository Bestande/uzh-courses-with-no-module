exports.data = {
	HS15: require('./data/HS15'),
	FS15: require('./data/FS15'),
	HS14: require('./data/HS14'),
	FS14: require('./data/FS14'),
	HS13: require('./data/HS13'),
	FS13: require('./data/FS13'),
	HS12: require('./data/HS12'),
	FS12: require('./data/FS12')
};

exports.getAllSeriesFromOneSerie = (semester, serie) => {
	if (!exports.data[semester]) {
		return [serie];
	}
	const dataset = exports.data[semester];
	const keys = Object.keys(dataset);
	for (let i = 0; i < keys.length; i++) {
		const set = dataset[keys[i]];
		if (set.indexOf(String(serie)) > -1) {
			return set;
		}
	}
	return [serie];
};
