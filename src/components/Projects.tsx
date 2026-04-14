import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce solution with real-time inventory and global payments.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Stripe'],
    github: '#',
    demo: '#',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'AI Portfolio',
    description: 'Intelligent portfolio builder powered by OpenAI for dynamic content generation.',
    tags: ['React', 'OpenAI API', 'GSAP', 'Framer Motion'],
    github: '#',
    demo: '#',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'DeFi Dashboard',
    description: 'Real-time cryptocurrency tracking and management dashboard for DeFi protocols.',
    tags: ['Web3.js', 'Ethers.js', 'Recharts', 'Solidity'],
    github: '#',
    demo: '#',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="relative py-32 px-6 overflow-hidden">
      {/* Top Fade Gradient for seamless Hero blending */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-20">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-apple-gradient">
              Featured Work
            </h2>
            <p className="text-xl md:text-2xl text-foreground/50 max-w-xl font-light leading-relaxed">
              A selection of my recent projects where I combine design and engineering.
            </p>
          </div>
          <a href="#" className="text-primary font-semibold hover:underline hover-trigger pb-2 transition-all">
            View all projects &rarr;
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group relative border border-foreground/5 bg-foreground/[0.02] backdrop-blur-sm rounded-[40px] overflow-hidden hover:scale-[1.02] hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover-trigger"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-10 space-y-6">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full bg-foreground/5 border border-foreground/5 text-foreground/40">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-3xl font-bold tracking-tight">{project.title}</h3>
                <p className="text-foreground/50 leading-relaxed line-clamp-2 font-light">{project.description}</p>
                <div className="flex items-center gap-8 pt-2">
                  <a href={project.github} className="flex items-center gap-2 text-sm font-semibold text-foreground/40 hover:text-foreground transition-colors">
                    <Github size={20} /> Code
                  </a>
                  <a href={project.demo} className="flex items-center gap-2 text-sm font-semibold text-foreground/40 hover:text-foreground transition-colors">
                    <ExternalLink size={20} /> Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
