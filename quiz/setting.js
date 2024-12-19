/** @format */
import Quiz from "./quiz.js";
// https://opentdb.com/api.php?amount=10&category=9&difficulty=easy
//www.opentdb.com
class Settings {
  constructor() {
    this.settingDom = document.getElementById("settings");
    this.quizDom = document.getElementById("quiz");
    this.category = document.getElementById("category");
    this.nQuestions = document.getElementById("nQuestions");
    this.difficulty = [
      document.getElementById("easy"),
      document.getElementById("medium"),
      document.getElementById("hard"),
    ];
    this.quiz = {};
    this.startBtn = document.getElementById("startBtn");
    this.startBtn.addEventListener("click", this.startQuizApp);
  }
  startQuizApp = async () => {
    try {
      const amount = this.getAmount();
      const difficulty = this.getDifficulty();
      const categoryId = this.category.value;

      //fetch data

      const url = `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}`;
      // let result = await this.fetchData(url);
      let result = await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.results);
          return data.results;
        });

      console.log(result);

      if (result) {
        this.quiz = new Quiz(this.quizDom, amount, result);
        console.log("results");
        this.toggleElements();
      } else {
        console.log("noo result");
      }
    } catch (error) {
      alert(error);
    }
  };
  getAmount = () => {
    if (this.nQuestions.value > 0 && this.nQuestions.value <= 20) {
      return this.nQuestions.value;
    } else {
      alert("please enter a vaild number");
    }
  };
  getDifficulty = () => {
    const difficult = this.difficulty.filter((el) => {
      return el.checked;
    });
    if (difficult.length === 1) {
      return difficult[0].id;
    } else {
      alert("please select difficulty");
    }
  };
  toggleElements = () => {
    this.settingDom.style.display = "none";
    this.quizDom.style.display = "block";
  };
  //  fetchData = (url) => {
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data.results);
  //       return data.results;
  //     });
  // };
}
export default Settings;
