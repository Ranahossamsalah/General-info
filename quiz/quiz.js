/** @format */

import Final from "./final.js";
import Question from "./question.js";
class Quiz {
  constructor(quizDom, amount, questions) {
    this.quizDom = quizDom;
    this.currentElement = document.getElementById("current");
    this.totalElement = document.getElementById("total");
    this.finalElement = document.getElementById("final");
    this.nextBtn = document.getElementById("nextBtn");
    this.totalAmount = amount;
    this.questions = this.setQuestion(questions);
    this.answerAmount = 0;
    //important
    // this.nextBtn.addEventListener("click",this.nextQuestion.bind(this)) if normal function not arrow function
    //it means make this related to quiz not related to window
    this.nextBtn.addEventListener("click", this.nextQuestion);
    this.renderQuestion();
  }
  setQuestion(questions) {
    return questions.map((question) => new Question(question));
  }

  renderQuestion() {
    this.questions[this.answerAmount].render();
    this.currentElement.innerHTML = this.answerAmount;
    this.totalElement.innerHTML = this.totalAmount;
  }
  nextQuestion = () => {
    const checkElement = this.questions[
      this.answerAmount
    ].answerElements.filter((ele) => {
      return ele.firstChild.checked;
    });
    if (checkElement.lenght == 0) {
      alert("please check your answer");
    } else {
      this.questions[this.answerAmount].answer(checkElement);
      this.answerAmount++;
      this.answerAmount < this.totalAmount
        ? this.renderQuestion()
        : this.endApp();
    }
  };

  countCorrectAnswers = () => {
    let count = 0;
    this.questions.forEach((ele) => {
      if (ele.isCorrect) {
        count++;
        console.log(count);
      }
      else{console.log(count,ele.isCorrect);}
      return count;
    });
  };
  endApp = () => {
    this.quizDom.style.display = "none";
    this.finalElement.style.display = "block";
    const correct = this.countCorrectAnswers();
    new Final(correct, this.totalAmount);
  };
}
export default Quiz;
