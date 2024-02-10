export default function groupByQuestionIdOptimized(data: any): any {
  const groupedData: any = [];

  // Create a Map to efficiently group data by question_id
  const groupedMap = new Map<number, any>();
  for (const item of data) {
    const questionId = item.question_id;
    const group = groupedMap.get(questionId) || {
      id: item.id, // Optional id based on your requirement
      level: item.questionbank.level.title,
      skill: item.questionbank.skill.skill,
      question: item.questionbank.question,
      options: new Array(4).fill(null), // Pre-allocate for 10 options (adjust as needed)
    };
    const options = group.options; // Avoid redundant lookups
    const optionIndex = options.findIndex((option: any) => option === null); // Find first empty slot
    options[optionIndex] = {
      option: item.option,
      is_correct: item.is_correct,
      id: item.id, // Include id if needed
    };
    groupedMap.set(questionId, group);
  }

  // Convert Map entries to array of QuestionGroup objects
  for (const [questionId, group] of groupedMap.entries()) {
    group.id = questionId.toString(); // Set id explicitly (or use questionId itself)
    groupedData.push(group);
  }

  return groupedData;
}
