const log = require('debug')('app:aws:ec2:getInstances');
const Retriever = require('./Retriever');

module.exports = (from, to, sortBy, sortDesc) => {
  log('getting instances from %d to %d. sort by %s in %s order.', from, to, sortBy, sortDesc ? "DESC" : "ASC");
  const retriever = new Retriever(sortBy, sortDesc);
  return retriever.get(from, to).then(instances => {
    return {
      instances,
      total: retriever.getTotal()
    };
  });
};
