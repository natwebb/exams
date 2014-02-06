/* jshint unused: false */

var Person = (function(){

  'use strict';

  function Person(name, gender, age, weight){
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.weight = weight;
    this.foods = [];
  }

  Person.prototype.eat = function(food, servings){
    this.foods.push(food);

    var cals = (food.caloriesPerServing)*servings;
    var gain = cals/3500;
    this.weight += gain;
    this.weight = Math.round(this.weight);
  };


  Person.prototype.exercise = function(name, minutes){
    var hours = minutes/60;
    var cals;

    if(this.gender==='Male'){
      if(name==='Run'){
        cals = 700*hours;
      }
      else if(name==='Swim'){
        cals = 900*hours;
      }
    }
    else if (this.gender==='Female'){
      if(name==='Run'){
        cals = 500*hours;
      }
      else if(name==='Swim'){
        cals = 700*hours;
      }
    }

    var loss = cals/3500;
    this.weight -= loss;
    this.weight = Math.round(this.weight);
  };

  Object.defineProperty(Person.prototype, 'crazyString', {
    get: function(){
      var newArr = _.uniq(this.foods);
      newArr = _.map(newArr, function(e){
        if(e.name.length%2===0){
          return e.name.toLowerCase();
        }
        else{
          return e.name.toUpperCase();
        }
      });
      newArr = newArr.reverse();
      var joined = newArr.join('--');

      return joined;
    }
  });

  return Person;

})();
