import test from 'ava';
import {getAllSeriesFromOneSerie} from './';

test('Should get all series from 1 serid', t => {
	const expected = ['50739123', '50739124', '50739125'];
	const result = getAllSeriesFromOneSerie('HS15', '50739123');
	t.deepEqual(expected, result);
});
