// app/study-in-germany/page.tsx
import StudyHero from '@/sections/StudyInGermany/Hero';
import StudyStats from '@/sections/StudyInGermany/Stats';
import StudyFields from '@/sections/StudyInGermany/Fields';
import StudyCareerProspects from '@/sections/StudyInGermany/CareerProspects';
import StudySemesterCalendar from '@/sections/StudyInGermany/SemesterCalendar';
import StudyFinalCTA from '@/sections/StudyInGermany/FinalCTA';

export const metadata = {
  title: 'Study in Germany — EuroZiel',
  description: 'Zero tuition fees, 18-month post-study visa, 1.7 million unfilled jobs. Everything Indian students need to know about studying in Germany.',
};

export default function StudyInGermanyPage() {
  return (
    <main>
      <StudyHero />
      <StudyStats />
      <StudyFields />
      <StudyCareerProspects />
      <StudySemesterCalendar />
      <StudyFinalCTA />
    </main>
  );
}