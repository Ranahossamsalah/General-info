/** @format */

class Question {
  constructor(question) {
    //get data from html and api
    //html data
    this.questionEelement = document.getElementById("question");
    this.answerElements = [
      document.getElementById("a1"),
      document.getElementById("a2"),
      document.getElementById("a3"),
      document.getElementById("a4"),
    ];
    // api data
    console.log(question);
    this.question = question.question;
    console.log(this.question);
    this.correctAnswer = question.correct_answer;
    this.allAnswers = [question.correct_answer, ...question.incorrect_answers];
    this.isCorrect = false;
  }
  //check if the answer is true or false
  answer(checkedElement) {
   
      checkedElement[0].textContent === this.correctAnswer ?  this.isCorrect =true : this.isCorrect =false;
      console.log('====================================');
      console.log(this.isCorrect);
      console.log('====================================');
  }
  //put all data in the question page
  render() {
    this.questionEelement.innerHTML = this.question;
    this.answerElements.forEach((e, index) => {
      //importtant name= "radio"
      e.innerHTML =
        '<input  type="radio" name= "radio"> <span class="checkmark"></span>' +
        this.allAnswers[index];
    });
  }
}
export default Question;
