import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  Code2,
  Lightbulb,
  Sparkles,
  UsersRound,
} from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "About us",
  description:
    "Meet the mentor and student team behind Northstar Learning, an online learning platform created at ISTAD.",
  path: "/about",
});

const teamMembers = [
  {
    name: "Sithikun Nourv",
    role: "Project lead",
    image: "/images/about/member-1-lead.jpg",
    objectPosition: "center 28%",
    description: "Coordinates the project direction and helps bring the product experience to life.",
  },
  {
    name: "Vathana Lormchhina",
    role: "Team member",
    image: "/images/about/member-2.jpg",
    objectPosition: "center 32%",
    description: "Contributes to the platform implementation and the learning experience.",
  },
  {
    name: "Kimsoung Pov",
    role: "Team member",
    image: "/images/about/member-3.jpg",
    objectPosition: "center 29%",
    description: "Supports the interface details, project testing, and overall quality.",
  },
];

export default function AboutPage() {
  return (
    <AppShell>
      <section className="about-hero">
        <div className="container about-hero-grid">
          <div className="about-hero-copy">
            <span className="eyebrow">About Northstar</span>
            <h1>Built by learners, <em>for learners.</em></h1>
            <p>
              Northstar is an ISTAD student project created to make technology
              learning feel clearer, more focused, and easier to continue every day.
            </p>
            <div className="about-hero-actions">
              <Link className="button button-primary" href="#team">
                Meet the team <ArrowRight />
              </Link>
              <Link className="button button-secondary" href="/courses">
                Explore the platform
              </Link>
            </div>
          </div>

          <div className="about-project-card">
            <div className="about-project-icon"><Sparkles /></div>
            <span>Student project · ISTAD</span>
            <h2>A shared idea turned into a learning platform.</h2>
            <p>
              Designed, developed, and reviewed as a team—with thoughtful
              guidance from our mentor.
            </p>
            <div className="about-project-stats">
              <div><strong>3</strong><span>Team members</span></div>
              <div><strong>1</strong><span>Project mentor</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-story-section">
        <div className="container about-story-grid">
          <div>
            <span className="eyebrow">Our purpose</span>
            <h2>Turn curiosity into steady progress.</h2>
          </div>
          <div className="about-story-copy">
            <p>
              We built Northstar around a simple belief: learning works best when
              the next step is easy to understand. The platform organizes practical
              courses into focused lessons so learners can start confidently and
              keep moving.
            </p>
            <div className="about-values">
              <div><span><BookOpenCheck /></span><strong>Clear learning</strong><p>Focused lessons with a visible path forward.</p></div>
              <div><span><Code2 /></span><strong>Practical skills</strong><p>Technology topics connected to real work.</p></div>
              <div><span><UsersRound /></span><strong>Built together</strong><p>Collaboration at every stage of the project.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-mentor-section">
        <div className="container">
          <div className="about-section-heading">
            <div><span className="eyebrow light">Project guidance</span><h2>Meet our mentor</h2></div>
            <p>Technical direction, thoughtful feedback, and support from idea to final product.</p>
          </div>
          <article className="about-mentor-card">
            <div className="about-mentor-photo">
              <Image
                src="/images/about/mentor.jpeg"
                alt="Project mentor"
                fill
                priority
                sizes="(max-width: 850px) 100vw, 42vw"
                style={{ objectPosition: "center 36%" }}
              />
            </div>
            <div className="about-mentor-copy">
              <span>Project mentor</span>
              <h3>Sokcheat Srorng</h3>
              <strong>Academic guidance & technical review</strong>
              <p>
                Our mentor helped the team turn an early concept into a more
                thoughtful product by challenging decisions, reviewing progress,
                and keeping the project connected to its learning goals.
              </p>
              <div className="about-mentor-note"><Lightbulb /><span>Guiding the team from the first idea to the final learning experience.</span></div>
            </div>
          </article>
        </div>
      </section>

      <section className="section about-team-section" id="team">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">The people behind Northstar</span>
              <h2>Meet our team</h2>
              <p>Three students, one shared goal, and many thoughtful iterations.</p>
            </div>
          </div>
          <div className="about-team-grid">
            {teamMembers.map((member, index) => (
              <article className="about-team-card" key={member.name}>
                <div className="about-team-photo">
                  <Image
                    src={member.image}
                    alt={`${member.name} portrait`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
                    style={{ objectPosition: member.objectPosition }}
                  />
                  <span>0{index + 1}</span>
                </div>
                <div className="about-team-card-copy">
                  <span>{member.role}</span>
                  <h3>{member.name}</h3>
                  <p>{member.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
