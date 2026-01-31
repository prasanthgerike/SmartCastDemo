/* Glassmorphism Design System - Data Visualization Aesthetics
   Translucent glass cards with backdrop blur, gradient backgrounds,
   smooth spring animations, cyan/violet accents */

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Linkedin, Briefcase, Code, GraduationCap, Award } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold gradient-text">Prasanth Gerike</h1>
            <div className="flex gap-4">
              <Button 
                variant="ghost" 
                onClick={() => scrollToSection("experience")}
                className="text-foreground/80 hover:text-foreground"
              >
                Experience
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => scrollToSection("projects")}
                className="text-foreground/80 hover:text-foreground"
              >
                Projects
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => scrollToSection("contact")}
                className="text-foreground/80 hover:text-foreground"
              >
                Contact
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        style={{
          backgroundImage: "url(/images/hero-background.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background"></div>
        <div className="absolute inset-0 dot-grid opacity-30"></div>
        
        <div className="container relative z-10 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <Badge className="mb-6 px-6 py-2 text-sm bg-accent/20 text-accent border-accent/30 backdrop-blur-sm">
              SAP S/4HANA MM Consultant
            </Badge>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-light mb-6 tracking-tight">
              Prasanth <span className="gradient-text font-semibold">Gerike</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-foreground/70 mb-4 max-w-3xl mx-auto font-light">
              Enterprise Solutions Architect | Procure-to-Pay Specialist | Manufacturing Integration Expert
            </p>
            
            <p className="text-lg text-foreground/60 mb-12 max-w-2xl mx-auto">
              6+ years of expertise delivering transformative SAP S/4HANA implementations across Oil & Gas, Chemical, and Manufacturing industries
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                onClick={() => scrollToSection("experience")}
              >
                View My Work
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-border/50 backdrop-blur-sm"
                onClick={() => scrollToSection("contact")}
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics Section */}
      <section className="py-20 relative">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard number="200+" label="Business Users" description="Supported across enterprise implementations" delay={0} />
            <MetricCard number="8,000+" label="Monthly Transactions" description="Processed with consistent accuracy" delay={100} />
            <MetricCard number="27%" label="Vendor Deduplication" description="Achieved through master data optimization" delay={200} />
            <MetricCard number="30%" label="Error Reduction" description="In reconciliation via MM-FI integration" delay={300} />
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section id="experience" className="py-20 relative">
        <div className="container">
          <Tabs defaultValue="experience" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="glass-card p-2">
                <TabsTrigger value="experience" className="gap-2">
                  <Briefcase className="w-4 h-4" />
                  Experience
                </TabsTrigger>
                <TabsTrigger value="projects" className="gap-2">
                  <Code className="w-4 h-4" />
                  Projects
                </TabsTrigger>
                <TabsTrigger value="skills" className="gap-2">
                  <Award className="w-4 h-4" />
                  Skills
                </TabsTrigger>
                <TabsTrigger value="education" className="gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Education
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Experience Tab */}
            <TabsContent value="experience" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-light mb-4">Professional Experience</h2>
                <p className="text-foreground/60 text-lg">6+ years delivering enterprise SAP solutions</p>
              </div>

              <ExperienceCard
                title="SAP S/4HANA MM Consultant"
                company="HyperNex Technologies"
                location="Texas, USA"
                period="Jan 2025 – Present"
                current={true}
                description="Leading end-to-end Procure-to-Pay implementations and Materials Management configurations for enterprise clients."
                achievements={[
                  "Configured end-to-end Procure-to-Pay processes supporting 200+ business users",
                  "Set up enterprise structure across 6 plants and storage locations",
                  "Processed and stabilized 8,000+ PR/PO/GR/Invoice transactions per month",
                  "Reduced duplicate vendors by 27% through master data optimization",
                  "Improved inventory accuracy by 18% through process optimization",
                  "Reduced reconciliation errors by 30% via MM-FI integration",
                  "Led UAT cycles with 120+ test cases, achieving zero Sev-1 defects post go-live"
                ]}
                technologies={["SAP S/4HANA", "MM", "P2P", "FI Integration", "Configuration"]}
              />

              <ExperienceCard
                title="SAP Associate Consultant"
                company="Capgemini"
                location="India"
                period="Nov 2021 – Jan 2024"
                description="Provided L2/L3 support and enhancement services for SAP S/4HANA MM implementations across multiple manufacturing units."
                achievements={[
                  "Supported and enhanced SAP S/4HANA MM configurations for P2P and Inventory Management",
                  "Resolved 350+ MM L2/L3 incidents related to PO processing, GR/GI postings, and invoice mismatches",
                  "Maintained 98%+ SLA compliance across monthly support cycles",
                  "Performed root-cause analysis for recurring issues, eliminating 40% of repeat tickets",
                  "Coordinated fixes with FI, PP, and ABAP teams across 3 manufacturing units",
                  "Implemented configuration changes via change requests and transport requests"
                ]}
                technologies={["SAP S/4HANA", "MM", "P2P", "Incident Management", "Root Cause Analysis"]}
              />

              <ExperienceCard
                title="MM Associate"
                company="Xyphramin Technologies"
                location="India"
                period="Jan 2019 – Oct 2021"
                description="Supported procurement operations and inventory management for Oil & Gas projects valued at $1M+ annually."
                achievements={[
                  "Monitored PR, PO, GR, and inventory postings across multiple storage locations",
                  "Managed 500+ weekly fulfillment orders with 96% on-time delivery",
                  "Improved order accuracy by 18% through material and stock process corrections",
                  "Reduced delivery risk by 21% via supplier performance tracking and segmentation",
                  "Provided month-end closing support for inventory and GR/IR accounts"
                ]}
                technologies={["SAP MM", "Procurement", "Inventory Management", "Supplier Management"]}
              />
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent id="projects" value="projects" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-light mb-4">Featured Projects</h2>
                <p className="text-foreground/60 text-lg">Key implementations and achievements</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ProjectCard
                  title="SAP S/4HANA MM - Procure-to-Pay Implementation"
                  duration="6 months"
                  description="End-to-end implementation of Procure-to-Pay processes for a multi-plant enterprise, supporting 200+ business users across 6 locations."
                  impact={[
                    "Enabled centralized procurement control across 6 plants",
                    "Reduced procurement cycle time by 25%"
                  ]}
                  metrics={[
                    { value: "200+", label: "Business Users" },
                    { value: "8,000+", label: "Monthly Transactions" }
                  ]}
                  image="/images/sap-visualization.png"
                />

                <ProjectCard
                  title="SAP S/4HANA Manufacturing Integration (MM–PP–QM)"
                  duration="4 months"
                  description="Coordinated MM–PP–QM integration to ensure accurate material flow and quality management for manufacturing operations."
                  impact={[
                    "Synchronized material availability with production schedules",
                    "Reduced material shortage incidents by 35%"
                  ]}
                  metrics={[
                    { value: "150+", label: "Production Orders/Month" },
                    { value: "35%", label: "Material Shortage Reduction" }
                  ]}
                  image="/images/enterprise-tech.png"
                />

                <ProjectCard
                  title="Brownfield S/4HANA Enhancements & Support"
                  duration="2+ years"
                  description="Provided ongoing L2/L3 support and implemented configuration enhancements for existing SAP S/4HANA MM implementations."
                  impact={[
                    "Resolved 350+ incidents with 98%+ SLA compliance",
                    "Reduced repeat ticket rate by 40%"
                  ]}
                  metrics={[
                    { value: "350+", label: "Incidents Resolved" },
                    { value: "98%+", label: "SLA Compliance" }
                  ]}
                  image="/images/data-analytics.png"
                />
              </div>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-light mb-4">Skills & Expertise</h2>
                <p className="text-foreground/60 text-lg">Comprehensive technical and professional capabilities</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <SkillCategory
                  title="Core SAP Skills"
                  skills={[
                    "SAP S/4HANA MM Configuration",
                    "Procure-to-Pay (P2P)",
                    "Materials Management (MM)",
                    "Master Data Management",
                    "MM-FI Integration",
                    "MM-PP-QM Integration",
                    "MRP & Planning",
                    "Inventory Management"
                  ]}
                />

                <SkillCategory
                  title="Process & Support"
                  skills={[
                    "Testing & Deployment (SIT/UAT)",
                    "AMS & Production Support",
                    "Root Cause Analysis",
                    "Documentation & Stakeholder Coordination",
                    "Incident Management",
                    "SLA Management",
                    "Process Optimization"
                  ]}
                />

                <SkillCategory
                  title="Certifications & Tools"
                  skills={[
                    "SAP Certified Associate - S/4HANA PP",
                    "Project Management Essentials",
                    "Git & GitHub",
                    "SAP GUI",
                    "Excel",
                    "Change Management"
                  ]}
                />
              </div>
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-light mb-4">Education & Certifications</h2>
                <p className="text-foreground/60 text-lg">Academic background and professional certifications</p>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-medium mb-6">Degrees</h3>
                
                <EducationCard
                  degree="Master of Science (MS)"
                  field="Management Information Systems"
                  institution="Lamar University"
                  location="USA"
                  period="2024-2025"
                />

                <EducationCard
                  degree="Bachelor of Engineering (BE)"
                  field="Electrical & Electronics Engineering"
                  institution="Sri Venkateswara College of Engineering"
                  location="Tirupati, India"
                  period="2017-2021"
                />

                <h3 className="text-2xl font-medium mb-6 mt-12">Professional Certifications</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CertificationCard
                    title="SAP Certified Associate"
                    description="S/4HANA Production Planning and Manufacturing"
                  />
                  <CertificationCard
                    title="Project Management Essentials"
                    description="Professional project management certification"
                  />
                  <CertificationCard
                    title="Git & GitHub"
                    description="Introduction to version control and collaboration"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="container">
          <div className="glass-card p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-light mb-6">Let's Work Together</h2>
            <p className="text-foreground/70 text-lg mb-8 max-w-2xl mx-auto">
              I'm always interested in discussing SAP implementations, enterprise solutions, and how I can contribute to your team's success.
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-8">
              <a href="mailto:prasanthgerike@gmail.com" className="flex items-center gap-2 text-foreground/80 hover:text-accent transition-colors">
                <Mail className="w-5 h-5" />
                prasanthgerike@gmail.com
              </a>
              <a href="tel:+13465756299" className="flex items-center gap-2 text-foreground/80 hover:text-accent transition-colors">
                <Phone className="w-5 h-5" />
                +1 (346) 575-6299
              </a>
              <div className="flex items-center gap-2 text-foreground/80">
                <MapPin className="w-5 h-5" />
                Texas, USA
              </div>
            </div>
            
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                <a href="mailto:prasanthgerike@gmail.com">
                  <Mail className="w-4 h-4 mr-2" />
                  Send me an Email
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-border/50 backdrop-blur-sm" asChild>
                <a href="https://www.linkedin.com/in/prasanth-gerike-335a0a24b/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4 mr-2" />
                  Connect on LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/30">
        <div className="container text-center text-foreground/60">
          <p>© 2025 Prasanth Gerike. All rights reserved.</p>
          <p className="text-sm mt-2">SAP S/4HANA MM Consultant | Enterprise Solutions Architect</p>
        </div>
      </footer>
    </div>
  );
}

// Component: Metric Card
function MetricCard({ number, label, description, delay }: { number: string; label: string; description: string; delay: number }) {
  return (
    <Card className="glass-card p-6 text-center animate-fade-up" style={{ animationDelay: `${delay}ms` }}>
      <div className="text-4xl md:text-5xl font-light gradient-text mb-2">{number}</div>
      <div className="text-lg font-medium text-foreground mb-2">{label}</div>
      <div className="text-sm text-foreground/60">{description}</div>
    </Card>
  );
}

// Component: Experience Card
function ExperienceCard({
  title,
  company,
  location,
  period,
  current,
  description,
  achievements,
  technologies
}: {
  title: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}) {
  return (
    <Card className="glass-card p-8">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
        <div>
          <h3 className="text-2xl font-medium mb-2">{title}</h3>
          <p className="text-foreground/70">{company} • {location}</p>
        </div>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          {current && (
            <Badge className="bg-accent/20 text-accent border-accent/30">Current</Badge>
          )}
          <span className="text-foreground/60">{period}</span>
        </div>
      </div>
      
      <p className="text-foreground/80 mb-4">{description}</p>
      
      <div className="mb-4">
        <h4 className="font-medium mb-3 text-foreground/90">Key Achievements</h4>
        <ul className="space-y-2">
          {achievements.map((achievement, index) => (
            <li key={index} className="flex items-start gap-2 text-foreground/70">
              <span className="text-accent mt-1">•</span>
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h4 className="font-medium mb-3 text-foreground/90">Technologies</h4>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <Badge key={index} variant="secondary" className="bg-secondary/50 backdrop-blur-sm">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}

// Component: Project Card
function ProjectCard({
  title,
  duration,
  description,
  impact,
  metrics,
  image
}: {
  title: string;
  duration: string;
  description: string;
  impact: string[];
  metrics: { value: string; label: string }[];
  image: string;
}) {
  return (
    <Card className="glass-card overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-medium">{title}</h3>
          <Badge variant="outline" className="border-accent/30 text-accent">
            {duration}
          </Badge>
        </div>
        
        <p className="text-foreground/70 mb-4">{description}</p>
        
        <div className="mb-4">
          <h4 className="font-medium mb-2 text-foreground/90">Impact</h4>
          <ul className="space-y-1">
            {impact.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-foreground/70">
                <span className="text-accent">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/30">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-light gradient-text">{metric.value}</div>
              <div className="text-xs text-foreground/60">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

// Component: Skill Category
function SkillCategory({ title, skills }: { title: string; skills: string[] }) {
  return (
    <Card className="glass-card p-6">
      <h3 className="text-xl font-medium mb-4 gradient-text">{title}</h3>
      <ul className="space-y-3">
        {skills.map((skill, index) => (
          <li key={index} className="flex items-start gap-2 text-foreground/80">
            <span className="text-accent mt-1">•</span>
            <span>{skill}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

// Component: Education Card
function EducationCard({
  degree,
  field,
  institution,
  location,
  period
}: {
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
}) {
  return (
    <Card className="glass-card p-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="text-xl font-medium mb-1">{degree}</h3>
          <p className="text-foreground/80 mb-2">{field}</p>
          <p className="text-foreground/60">{institution}</p>
          <p className="text-foreground/60">{location}</p>
        </div>
        <Badge variant="outline" className="border-accent/30 text-accent mt-2 md:mt-0">
          {period}
        </Badge>
      </div>
    </Card>
  );
}

// Component: Certification Card
function CertificationCard({ title, description }: { title: string; description: string }) {
  return (
    <Card className="glass-card p-6">
      <h3 className="text-lg font-medium mb-2 gradient-text">{title}</h3>
      <p className="text-foreground/70 text-sm">{description}</p>
    </Card>
  );
}
