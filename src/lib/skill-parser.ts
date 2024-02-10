interface Skill {
  skill: string;
  rating?: number; // Optional rating property
}

interface DbSkill {
  id: number;
  created_at: string;
  skill: string;
  keywords: string[];
}

export default function findMatchingSkills(
  skillsData: Skill[] | any,
  dbSkills: DbSkill[] | any
): number[] {
  const matchingIds: number[] = [];

  for (const dbSkill of dbSkills) {
    const { skill, keywords } = dbSkill;

    for (const dataSkill of skillsData) {
      const { skill: skillText } = dataSkill;

      for (const keyword of keywords) {
        // Use regular expressions for case-insensitive matching
        const regex = new RegExp(`\\b${keyword}\\b`, "i");

        if (regex.test(skillText)) {
          matchingIds.push(dbSkill.id);
          break; // Stop iterating over keywords if a match is found
        }
      }
    }
  }

  return matchingIds;
}
