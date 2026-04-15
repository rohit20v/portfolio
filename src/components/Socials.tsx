import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from 'lucide-react';

const socials = [
  { name: 'GitHub', icon: <Github />, href: 'https://github.com/rohit20v', color: 'hover:bg-gray-800 hover:text-white' },
  { name: 'LinkedIn', icon: <Linkedin />, href: 'https://it.linkedin.com/in/dev-rohit-verma', color: 'hover:bg-blue-600 hover:text-white' },
  { name: 'Twitter', icon: <Twitter />, href: 'https://x.com/rohit_verma_dev?s=21', color: 'hover:bg-sky-500 hover:text-white' },
  { name: 'Email', icon: <Mail />, href: 'mailto:verma.rohit.1203@gmail.com', color: 'hover:bg-amber-500 hover:text-white' },
];

const Socials = () => {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-7xl font-black mb-12 tracking-tighter">Let's build something <span className="text-gradient">epic</span>.</h2>
        
        <div className="flex flex-wrap justify-center gap-6 mb-20">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              className={`flex items-center gap-3 px-8 py-4 glass rounded-full font-bold text-lg transition-all duration-300 hover:scale-110 ${social.color} hover-trigger`}
            >
              {social.icon} {social.name} <ArrowUpRight size={18} className="opacity-50" />
            </a>
          ))}
        </div>

        <footer className="border-t border-white/10 pt-12 text-gray-500 text-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <p>© 2026 Developer Portfolio. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Socials;
