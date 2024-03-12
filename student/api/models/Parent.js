/**
 * Parent.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    firstName: {
      type: 'string',
      required: true
    },
    lastName: {
      type: 'string',
      required: true
    },
    parentOf: {
      type: 'string',
      required: true
    },
    relation: {
      type: 'string',
      required: true
    },
    phoneNo: {
      type: 'string',
      required: true
    }
  }

};

