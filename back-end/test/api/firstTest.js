const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../server/controller/FileController');
const db = require('../../bin/dbConnection');
const pluginController = require('../../server/controller/PluginController');

describe('Plugins test', () => {

    let ratings = [1, 2, 3];
    let ratingsOneElement = [10];
    let ratingsZeroElement = [];
    let ratingsScore = 2;
    let ratingsOneElementScore = 10;
    let ratingsZeroElementScore = 0;

    it('Plugin compute score methode', () =>  {
        let result = pluginController.computeScore(ratings);
        expect(result).equals(ratingsScore);
    });

    it('Plugin compute score methode with one element in array', () => {
        let result = pluginController.computeScore(ratingsOneElement);
        expect(result).equals(ratingsOneElementScore);
    });

    it('Plugin compute score methode with no elements in array', () => {
        let result = pluginController.computeScore(ratingsZeroElement);
        expect(result).equals(ratingsZeroElementScore);
    });



});
