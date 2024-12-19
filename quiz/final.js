/** @format */
class Final {
  constructor(correctAnswers, totalAnswers) {
    this.againBTN = document.getElementById("againBtn");
    this.scoreElement = document.getElementById("score");
    this.render(correctAnswers, totalAnswers);
    this.againBTN.addEventListener("click", this.startAgain);
  }
  startAgain = () => {
    location.reload();
  };
  render(correctAnswers, totalAnswers) {
    this.scoreElement.innerHTML = `you answered ${correctAnswers} from ${totalAnswers}`;
  }
}
export default Final;
