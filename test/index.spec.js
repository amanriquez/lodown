var 
    expect = require('chai').expect,
    sinon = require('sinon'),
    lodown = require('../index'),
    customers = require('./fixtures/customers.json');

describe('lodown', function() {
    describe('each', function() {
        it('should iterate an Array, applying action to each element, index of the element, and the collection', function() {
            var action = sinon.spy();
            lodown.each(customers, action);
            expect(action.callCount).to.equal(customers.length);
            customers.forEach(function(customer, index){
               expect(action.calledWith(customer, index, customers)).to.be.true;
            });
        });
   
        it('should iterate an Object, applying action for each value, key of value, and Object', function() {
            var action = sinon.spy();
            var customer = customers[0];
            lodown.each(customer, action);
            expect(action.callCount).to.equal(Object.keys(customer).length);
            for(var key in customer) {
              expect(action.calledWith(customer[key], key, customer)).to.be.true;
            }
        });
    });
    describe('identity', function() {
        it('should return any value unchanged', function() {
            expect(lodown.identity(customers[0].name)).to.equal('Adele Mullen');
        });
    });
    describe('typeOf', function(){
        it('should return type of input', function(){
            expect(lodown.typeOf(customers[0].name)).to.equal('string');
            expect(lodown.typeOf(new Date)).to.equal('date');
        });
    });
    describe('first', function(){
        it('should return the first <number> of elements from given array', function(){
            expect(lodown.first([1,2,3,4,5], 3)).to.eql([1,2,3]);
        });
        it('should return empty array if zero is passed in as the index', function() {
            expect(lodown.first([1,2,3], 0)).to.eql([]);
        });
        it('should return all the array\'s elements if the index argument is larger than the length of the array', function() {
            expect(lodown.first([1,2,3], 5)).to.eql([1, 2, 3]);
        });
    });
    describe('last', function() {
        it('should return the last <number> of elements from given array', function(){
            expect(lodown.last(customers, 1)).to.eql([customers[customers.length -1]]);
        });
    });
    describe('indexOf', function() {
        it('should return first index occurence of given value', function() {
            expect(lodown.indexOf(customers, customers[2])).to.equal(2);
        });
    });
    describe('contains', function() {
        it('should return boolean value wether array contains element', function(){
            expect(lodown.contains([1,2,3,4,5], 5)).to.equal(true);
        });
    });
    describe('unique', function() {
        it('should eliminate duplicates from given array', function(){
            expect(lodown.unique([1,2,2,2,3,3,4,5])).to.eql([1,2,3,4,5]);
        });
    });
    describe('filter', function() {
        it('should iterate an Array, applying action to each element, index of the element, and the collection', function() {
            var action = sinon.spy();
            lodown.each(customers, action);
            expect(action.callCount).to.equal(customers.length);
            customers.forEach(function(customer, index){
               expect(action.calledWith(customer, index, customers)).to.be.true;
            });
        });
        it('should remove elments from array that do not pass action test', function(){
            let action = (e) => e > 2;
            expect(lodown.filter([1,2,3,4,5], action)).to.eql([3,4,5]);
        });
    });
    describe('reject', function() {
        it('should return a new array of every elemenet that didn\'t pass callback test', function(){
            let action = (e) => e > 2;
            expect(lodown.reject([1,2,3,4,5], action)).to.eql([1,2]);
        });
    });
    describe('partition', function(){
        it('should return new array of sub array of false returns and sub array of true returns', function(){
            let action = (e) => e > 2;
            expect(lodown.partition([1,2,3,4,5], action)).to.eql([[3,4,5],[1,2]]);
        });
    });
    describe('map', function() {
        it('should iterate an Array, applying action to each element, index of the element, and the collection', function() {
            var action = sinon.spy();
            lodown.each(customers, action);
            expect(action.callCount).to.equal(customers.length);
            customers.forEach(function(customer, index){
               expect(action.calledWith(customer, index, customers)).to.be.true;
            });
        });
        it('should return mutated array using given callback', function(){
            let action = (e) => e*2;
            expect(lodown.map([1,2,3,4], action)).to.eql([2,4,6,8]);
        });
    });
    describe('pluck', function() {
        it(' should return an array containing the value of the given property for each object element in the array', function(){
            expect(lodown.pluck([{a: 1},{a: 2},{a: 3}], 'a')).to.eql([1,2,3]);
        });
    });
    describe('every', function() {
        it('should return true if every element in array passes callback test', function(){
            expect(lodown.every(customers, e => e.name)).to.eql(true);
        });
    });
    describe('some', function() {
        it('should return true if at least one elment in array passes callback test', function(){
            expect(lodown.every(customers, e => e.age > 20)).to.equal(true);
        });
    });
    describe('reduce', function() {
        it('should return seed accumulator transformed with given callback', function(){
            expect(lodown.reduce([1,2,3,4], (a,b) => a + b)).to.eql(10);     
        });
    });
});