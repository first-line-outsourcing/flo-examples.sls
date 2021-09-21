'use strict';

module.exports.handler = async (event) => {
  console.log(event);

  const token = event.identitySource?.[0];

  if (token === 'error') {
    throw new Error('Internal server error');
  }

  if (token !== 'token') {
    return {
      isAuthorized: false,
    };
  }

  return {
    isAuthorized: true,
    context: {
      myVariable: 'myValue',
    },
  };
};
