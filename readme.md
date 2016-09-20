# uzh-courses-with-no-module

List containing all courses that you can book but that don't belong to a module.
To generate, run `npm run fetch HS15`

What we know:

Courses (=Lehrveranstaltungen) are not the same thing as modules. You can book courses, but in the summary of credits, they are not linked as modules are.

Example: You can book [this course](http://www.vorlesungen.uzh.ch/HS15/lehrangebot/fak-50044345/sc-50017764/cga-50017764090/cg-50017777/e-50733012.details.html), but it does not belong to a module
but it is not part of a

In the summary of credits, the only identifier you get is the 'Lehrveranstaltungskürzel'. Multiple courses can share one Lehrveranstaltungskürzel. Example: [1](http://www.vorlesungen.uzh.ch/HS15/lehrangebot/fak-50044345/sc-50017764/cga-50017764090/cg-50017777/e-50733012.details.html), [2](http://www.vorlesungen.uzh.ch/HS15/lehrangebot/fak-50044345/sc-50017764/cga-50017764090/cg-50017777/e-50751212.details.html), [3](http://www.vorlesungen.uzh.ch/HS15/lehrangebot/fak-50044345/sc-50017764/cga-50017764090/cg-50017777/e-50733568.details.html). These courses form a 'pseudo-module'.

Starting in 2016, the courses do belong to a module. The problem only applies to previous years.

## License

MIT © [Jonny Burger](https://bestande.ch)
