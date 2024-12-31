/** @format */

import Final from "./final.js";
import Question from "./question.js";
class Quiz {
  constructor(quizDom, amount, questions) {
    this.quizDom = quizDom;
    this.quizBox =document.getElementById("quiz");
    this.currentElement = document.getElementById("current");
    this.totalElement = document.getElementById("total");
    this.finalElement = document.getElementById("final");
    this.nextBtn = document.getElementById("nextBtn");
    this.loader = document.getElementById("loader");
    this.totalAmount = amount;
    this.questions = this.setQuestion(questions);
    this.answerAmount = 0;
    this.correctCount = undefined;
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
    this.quizBox.style.display = "block";
    this.questions[this.answerAmount].render();
    this.currentElement.innerHTML = this.answerAmount;
    this.totalElement.innerHTML = this.totalAmount;
  }

  countCorrectAnswers = () => {
    let count = 0;
    this.questions.forEach((ele) => {
      if (ele.isCorrect) {
        count++;
        console.log(count);
        this.correctCount = count;
        console.log(this.correctCount);
      } else {
        console.log(count, ele.isCorrect);
      }
      return count;
    });
  };
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
      console.log(this.answerAmount, this.totalAmount);
      this.answerAmount < this.totalAmount
        ? this.renderQuestion()
        : this.endApp();
    }
  };

  endApp = () => {
    this.quizDom.style.display = "none";
    this.finalElement.style.display = "block";
    // let finalCount = this.correctCount;
    // const correct = this.correctCount;
    setTimeout(() => {
      new Final(this.correctCount, this.totalAmount),
      this.loader.style.display = "none";
    }, 3000);
    console.log("====================================");
    console.log(
      this.countCorrectAnswers(),
      this.correctCount,
      this.totalAmount,
      
    );
    console.log("====================================");
  };
}
export default Quiz;
