import { courses } from '@/data/profile';
import { Meta, PageHeader, column } from '@/components/Page';

export default function CoursesPage() {
  return (
    <>
      <Meta title="Courses" description="Courses and skill badges Mittal Domadiya has completed in AWS, Kubernetes, Linux and Google Cloud." />
      <PageHeader title="Courses & badges">
        What I've studied alongside the degree. These are courses and skill badges, not certification exams; the CKA exam is still ahead of me.
      </PageHeader>

      <ol className={`${column} pb-32`}>
        {courses.map((c) => (
          <li key={c.title} className="grid gap-4 border-t border-line py-10 md:grid-cols-[6rem_minmax(0,1fr)_auto] md:items-baseline md:gap-8">
            <span className="font-mono text-sm text-mist-dim">{c.year}</span>
            <div>
              <h2 className="text-xl text-mist sm:text-2xl">{c.title}</h2>
              <p className="mt-1 text-mist-dim">{c.provider}</p>
              <p className="mt-3 font-mono text-sm text-mist-dim">{c.topics.join(' · ')}</p>
            </div>
            <p className="flex flex-wrap gap-2 md:justify-end">
              <span className="label border border-line px-3 py-1.5 text-mist">{c.kind}</span>
              {c.note && <span className="label border border-ember/70 px-3 py-1.5 text-ember">{c.note}</span>}
            </p>
          </li>
        ))}
      </ol>
    </>
  );
}
