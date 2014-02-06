(function(){

  'use strict';

  $(document).ready(initialize);

  var timer;
  var wordList = [];
  var counter = 0;

  function initialize(){
    $('#textBox').val('We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America.');
    $('#sort').click(clickSort);
  }

  function clickSort(){
    wordList = $('#textBox').val().split(' ');
    wordList = _.shuffle(wordList);
    timer = setInterval(masterSort, 1000);
  }

  function masterSort(){
    var current = wordList[counter];
    if(current===undefined){
      clearInterval(timer);
      alert('All done!');
    }
    current = killPunctuation(current);
    sortEvenOdd(current);
    counter++;
  }

  function killPunctuation(word){
    word = word.replace(',', '');
    word = word.replace('.', '');
    return word;
  }

  function sortEvenOdd(word){
    if(word.length%2===0){
      createEven(word);
    }
    else{
      createOdd(word);
    }
  }

  function createEven(word){
    var original = word;

    word = word.toLowerCase();

    var firstLetter = word.slice(0,1);
    word = word.slice(1, word.length);
    word = word + firstLetter + 'a';

    var $box = makeWordBox(word, original);
    $box.addClass('evenBox');

    $box.find('div:nth-child(3)').text(sum(word.length));

    $('#evenList').append($box);
  }

  function createOdd(word){
    var original = word;
    word = word.toUpperCase();

    word = _.reject(word, function(l){
      return (l==='A'||l==='E'||l==='I'||l==='O'||l==='U'||l==='Y');
    }).join('');

    if(word.length>0){
      var $box = makeWordBox(word, original);
      $box.addClass('oddBox');

      $box.find('div:nth-child(3)').text(factorial(word.length));

      $('#oddList').append($box);
    }
  }

  function makeWordBox(word, original){
    var $li = $('<li>');
    var $a = $('<a>');
    $a.attr('href', 'https://www.google.com/#q='+original);
    $a.attr('target', 'target="_blank"');
    var $wordDiv = $('<div>');
    var $lengthDiv = $('<div>');
    var $mathDiv = $('<div>');
    $wordDiv.text(word);
    $lengthDiv.text(word.length);
    $a.append($wordDiv);
    $a.append($lengthDiv);
    $a.append($mathDiv);
    $li.append($a);
    $li.addClass('wordBox');
    return $li;
  }

  function factorial(n){
    var total = 1;
    for(var i = 1; i<=n; i++){
      total *= i;
    }
    return total;
  }

  function sum(n){
    var total =0;
    for(var i = 1; i<=n; i++){
      total += i;
    }
    return total;
  }

})();
