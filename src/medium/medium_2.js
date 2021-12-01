import mpg_data from "./data/mpg_data.js";
import {getStatistics, getSum} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allrestats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allrestats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the res were made.
 *
 * @param {allrestats.ratioHybrids} ratio of res that are hybrids
 */
export const allrestats = {
    avgMpg: {city: mpg_data.map(c => c.city_mpg).reduce((a, b) => a + b, 0) / mpg_data.length,
    highway: mpg_data.map(c => c.highway_mpg).reduce((a, b) => a + b, 0) / mpg_data.length},
    allYearStats: getStatistics(mpg_data.map(c => c.year)),
    ratioHybrids: mpg_data.filter((a) => a.hybrid).length / mpg_data.length,
};
/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: getMakerHybrids(mpg_data),
    avgMpgByYearAndHybrid: getAvgMpgByYearAndHybrid(mpg_data),
};

export function getMakerHybrids(array) {
    let arr = [];
    var res = array.reduce(
        function(prev, curr) {
            if(curr.hybrid) {
                var i = prev.map(c => c.make).indexOf(curr.make);
                if(i != -1) {
                    prev[i].res.push(curr.id);
                } else {
                    prev.push({"make":curr.make,"hybrids":[curr.id]});
                }
            }
            return prev;
        }, arr
    );
    res.sort(function(a, b) {
        if(a.res.length < b.res.length) {
            return 1;
        }
        if(b.res.length < a.res.length ) {
            return -1;
        }
        return 0;
    });
    return res;
}

export function getAvgMpgByYearAndHybrid(array) {
    let obj = {};
    var res = array.reduce(
        function(prev, curr) {
            if(!(curr.year in prev)) {
                prev[curr.year] = {"hybrid":[],"notHybrid":[]}
            }
            if(curr.hybrid) {
                prev[curr.year].hybrid.push(curr);
            } else {
                prev[curr.year].notHybrid.push(curr);
            }
            return prev;
        }, obj
    );
    Object.keys(res).forEach(c => res[c].hybrid = AvgMpg(res[c].hybrid));
    Object.keys(res).forEach(c => res[c].notHybrid = AvgMpg(res[c].notHybrid));
    return res;
}

