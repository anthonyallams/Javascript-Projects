const form = document.querySelector("form");
const result = document.querySelector(".result");

const correctAnswers = ["A", "B", "A", "D", "C"];
let score = 0;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const userAnswers = [
    form.q1.value,
    form.q2.value,
    form.q3.value,
    form.q4.value,
    form.q5.value,
  ];

  for (let [i, v] of userAnswers.entries()) {
    if (v === correctAnswers[i]) {
      score += 20;
    }
  }

  scrollTo(0, 0);
  result.classList.remove("showResult");
  form.reset();

  let output = 0;
  const timer = setInterval(() => {
    result.querySelector("span").innerText = `${output}`;
    if (output === score) {
      clearInterval(timer);
    } else {
      output++;
    }
  }, 100);
});
