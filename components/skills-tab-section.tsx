import { resumeData } from "@/lib/portfolio-data"

interface SkillsTabSectionProps {
  data?: typeof resumeData
}

export function SkillsTabSection({ data = resumeData }: SkillsTabSectionProps) {
  return (
    <div className="space-y-8 md:space-y-10">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">My Skills</h2>
        <div className="w-10 h-1 bg-accent rounded-full mb-6" />
      </div>

      <div className="space-y-5 md:space-y-6">
        {data.skills.map((skill, index) => (
          <div key={index}>
            <div className="flex justify-between mb-2">
              <span className="text-xs md:text-sm font-medium text-foreground">{skill.name}</span>
              <span className="text-xs md:text-sm text-muted-foreground">{skill.level}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
