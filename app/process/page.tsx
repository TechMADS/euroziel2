import ProcessHero from '@/sections/Process/Hero';
import ProcessTimeline from '@/sections/Process/Timeline';
import ProcessChecklist from '@/sections/Process/Checklist';
import ProcessInsights from '@/sections/Process/Insights';
import ProcessFinalCTA from '@/sections/Process/FinalCTA';

export const metadata = {
  title: 'Process — EuroZiel',
  description: 'Your structured Germany roadmap from profile evaluation to arrival — every step guided by EuroZiel.',
};

export default function ProcessPage() {
  return (
    <main>
      <ProcessHero />
      <ProcessTimeline />
      <ProcessChecklist />
      <ProcessInsights />
      <ProcessFinalCTA />
    </main>
  );
}