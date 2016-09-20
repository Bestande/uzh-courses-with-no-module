import {writeFileSync} from 'fs';
import got from 'got';
import {load} from 'cheerio';
import {flatten, find} from 'underscore';
import resolve from 'url-resolve';

// Modules that do not belong to a faculty (prefix 507)
// are not linked in the summary of credits.
// This script fetches all of these modules so they can be remapped.

const semester = process.argv[4];

const links = [
	`http://www.vorlesungen.uzh.ch/${semester}/lehrangebot/fak-50044345/sc-50017764/cga-50017764090.html`,
	`http://www.vorlesungen.uzh.ch/${semester}/lehrangebot/fak-50044345/sc-50018974/cga-50018974090.html`,
	`http://www.vorlesungen.uzh.ch/${semester}/lehrangebot/fak-50044345/sc-50516334/cga-50516334090.html`
];

const getHTML = async function (url) {
	const listingurls = [];
	const result = await got(url);
	const $ = load(result.body);
	const subsections = $('li li li li');
	subsections.each((key, ss) => {
		const href = $(ss).find('a').attr('href');
		const absoluteHref = resolve(url, href);
		listingurls.push(absoluteHref);
	});
	return listingurls;
};

const fetchModuleUrls = async function (url) {
	const links = [];
	let page = 0;
	while (true) { // eslint-disable-line no-constant-condition
		page++;
		const {body} = await got(`${url}?page=${page}`); // eslint-disable-line babel/no-await-in-loop
		if (body.match(/Keine Lehrveranstaltungen/)) {
			return links;
		}
		const $ = load(body);
		const trs = $('.ornate tr a.internal');
		trs.each((key, a) => {
			const href = $(a).attr('href');
			if (href.match(/e-([0-9]+).details/)) {
				links.push(resolve(url, href));
			}
		});
	}
};

const fetchDetailPage = async function (url) {
	const {body} = await got(url);
	const $ = load(body);
	const infos = [];
	$('.ornate tr').each((key, tr) => {
		const field = $(tr).find('th').text();
		const value = $(tr).find('td').text();
		infos.push({field, value});
	});
	const identifier = find(infos, i => i.field === 'Lehrveranstaltungskürzel:');
	return [identifier.value, url.match(/e-([0-9]+)/)[1]];
};

const start = async () => {
	const map = {};
	for (let i = 0; i < links.length; i++) {
		const urls = await getHTML(links[i]); // eslint-disable-line babel/no-await-in-loop
		for (let j = 0; j < urls.length; j++) {
			const links = flatten(await fetchModuleUrls(urls[j])); // eslint-disable-line babel/no-await-in-loop
			for (let k = 0; k < links.length; k++) {
				const [key, value] = await fetchDetailPage(links[k]); // eslint-disable-line babel/no-await-in-loop
				if (!map[key]) {
					map[key] = [];
				}
				console.log([key, value]);
				map[key].push(value);
			}
		}
	}
	writeFileSync(`data/${semester}.json`, JSON.stringify(map, null, 2), 'utf8');
};

start()
.catch(err => console.error(err));
