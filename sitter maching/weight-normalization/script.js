document.getElementById("weight-location").oninput = function () {
  document.getElementById("val-location").textContent = this.value;
};
document.getElementById("weight-certificate").oninput = function () {
  document.getElementById("val-certificate").textContent = this.value;
};
document.getElementById("weight-experience").oninput = function () {
  document.getElementById("val-experience").textContent = this.value;
};
document.getElementById("weight-days").oninput = function () {
  document.getElementById("val-days").textContent = this.value;
};

const sitters = [
  {
    name: "김시터",
    location: true,
    certificate: true,
    experience: false,
    days: true,
  },
  {
    name: "이시터",
    location: false,
    certificate: true,
    experience: true,
    days: true,
  },
  {
    name: "박시터",
    location: true,
    certificate: false,
    experience: true,
    days: false,
  },
];

function matchSitter() {
  const weights = {
    location: parseInt(document.getElementById("weight-location").value),
    certificate: parseInt(document.getElementById("weight-certificate").value),
    experience: parseInt(document.getElementById("weight-experience").value),
    days: parseInt(document.getElementById("weight-days").value),
  };

  // function matchSitter() {
  //   const wLoc = parseInt(document.getElementById("weight-location").value);
  //   const wCert = parseInt(document.getElementById("weight-certificate").value);
  //   const wExp = parseInt(document.getElementById("weight-experience").value);
  //   const wDays = parseInt(document.getElementById("weight-days").value);

  //   let results = sitters.map((sitter) => {
  //     let score = 0;
  //     score += sitter.location ? wLoc : 0;
  //     score += sitter.certificate ? wCert : 0;
  //     score += sitter.experience ? wExp : 0;
  //     score += sitter.days ? wDays : 0;
  //     return { name: sitter.name, score };
  //   });
  //   results.sort((a, b) => b.score - a.score);

  const totalWeight =
    weights.location + weights.certificate + weights.experience + weights.days;

  const normalized = {
    location: weights.location / totalWeight,
    certificate: weights.certificate / totalWeight,
    experience: weights.experience / totalWeight,
    days: weights.days / totalWeight,
  };

  let bestSitter = null;
  let highestScore = 0;
  let contribution = {};

  sitters.forEach((sitter) => {
    let score = 0;
    let sitterContribution = {};

    sitterContribution.location = sitter.location ? normalized.location : 0;
    sitterContribution.certificate = sitter.certificate
      ? normalized.certificate
      : 0;
    sitterContribution.experience = sitter.experience
      ? normalized.experience
      : 0;
    sitterContribution.days = sitter.days ? normalized.days : 0;

    score =
      sitterContribution.location +
      sitterContribution.certificate +
      sitterContribution.experience +
      sitterContribution.days;

    if (score > highestScore) {
      bestSitter = sitter;
      highestScore = score;
      contribution = sitterContribution;
    }
  });

  document.getElementById("matchedSitter").innerHTML = bestSitter
    ? `<strong>${bestSitter.name}</strong> 님이 가장 적합합니다! (점수: ${(
        highestScore * 100
      ).toFixed(1)}점)`
    : "적합한 시터가 없습니다.";

  document.getElementById("contributionChart").innerHTML = `
    <h3>조건별 기여도</h3>
    <ul>
      <li>위치: ${(contribution.location * 100).toFixed(1)}%</li>
      <li>자격증: ${(contribution.certificate * 100).toFixed(1)}%</li>
      <li>경력: ${(contribution.experience * 100).toFixed(1)}%</li>
      <li>요일: ${(contribution.days * 100).toFixed(1)}%</li>
    </ul>
  `;
}
