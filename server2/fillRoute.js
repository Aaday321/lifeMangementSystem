
class Person{
  constructor(nameP){
    this.name = nameP;
    this.speak();
  }
  method(){
    console.log('this method ran :)');
  }
  speak(){
    console.log(this.name + " spoke");
  }
}

function oldPerson(nameP){
  this.name = nameP;
  this.speak();

  this.speak = function(){
    console.log(this.name + " spoke");
  }
}