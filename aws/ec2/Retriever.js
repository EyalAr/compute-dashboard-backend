const MAX_RESULTS = 999;
const log = require('debug')('app:aws:ec2:Retriever');
const describeInstances = require('./describeInstances');
const extractInstanceData = require('./extractInstanceData');

/**
 * A helper class to retrieve paginated & sorted results from AWS.
 * The AWS SDK doesn't provide an easy way to sort and paginate results,
 * as it doesn't accept any form of range/page/start params.
 * It only allows to retrieve the 'next' batch of results, relative to a
 * previous request.
 */
class Retriever {
  constructor(sortBy, sortDesc) {
    this.sortBy = sortBy;
    this.sortVal = sortDesc ? -1 : 1;
    this.cachedInstances = [];
    this.nextToken = null;
    this.moreResults = true;
  }

  sort() {
    this.cachedInstances.sort((i1, i2) => {
      const prop1 = i1[this.sortBy];
      const prop2 = i2[this.sortBy];
      return prop1 > prop2 ? this.sortVal : -this.sortVal;
    });
  }

  /**
   * Makes sure results are available in the cache up to index 'to'.
   */
  ensure() {
    return new Promise((resolve, reject) => {
      if (!this.moreResults) {
        resolve();
      } else {
        log('Fetching next batch of instances');
        describeInstances({
          MaxResults: MAX_RESULTS,
          NextToken: this.nextToken,
        }).then((data) => {
          data.Reservations.forEach((r) => {
            r.Instances.forEach((i) => {
              this.cachedInstances.push(extractInstanceData(i));
            });
          });
          this.nextToken = data.NextToken;
          this.moreResults = !!this.nextToken;
        })
          .then(() => this.ensure())
          .then(() => this.sort())
          .then(resolve, reject);
      }
    });
  }

  getTotal() {
    return this.cachedInstances.length;
  }

  get(from, to) {
    return this.ensure().then(() => this.cachedInstances.slice(from, to + 1));
  }
}

module.exports = Retriever;
