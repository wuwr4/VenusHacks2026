let surveyCompleted = false;

export function isSurveyCompleted() {
  return surveyCompleted;
}

export function setSurveyCompleted(value = true) {
  surveyCompleted = value;
  return surveyCompleted;
}
