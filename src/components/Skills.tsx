import { Cpu, Database, Layout, Terminal } from 'lucide-react';

const skills = [
  { name: 'Frontend', icon: <Layout size={24} />, items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { name: 'Backend', icon: <Database size={24} />, items: ['Node.js', 'Go', 'PostgreSQL', 'Redis'] },
  { name: 'Architecture', icon: <Cpu size={24} />, items: ['Microservices', 'System Design', 'Serverless', 'AWS'] },
  { name: 'Tools', icon: <Terminal size={24} />, items: ['Git', 'Docker', 'Kubernetes', 'CI/CD'] },
];

const Skills = () => {
  return (
    <section id="skills" className="pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Tech Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <div key={index} className="glass p-8 rounded-3xl hover:border-primary/50 transition-colors group hover-trigger">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                {skill.icon}
              </div>
              <h3 className="text-xl font-bold mb-6">{skill.name}</h3>
              <ul className="space-y-3">
                {skill.items.map(item => (
                  <li key={item} className="text-gray-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
