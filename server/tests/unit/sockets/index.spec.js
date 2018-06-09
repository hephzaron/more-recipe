import chai from 'chai';
import io from 'socket.io-client';

const { expect } = chai;
const socketURL = 'http://0.0.0.0:5000';
const options = {
  transports: ['websocket'],
  'force new connection': true
};

describe('Notifications', () => {

});