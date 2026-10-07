import { Link } from 'react-router-dom';
import { toolkit, projects } from '@/data/profile';
import { Meta, PageHeader, column } from '@/components/Page';

// Evidence instead of self-rated percentages: which projects actually use a tool.
// Matches the tool's first word against each project's stack on word boundaries
// (so "Go" never matches "Django").
const usedIn = (item) => {
  const key = item.split(/[\s(/]/)[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`\\b${key}\\b`, 'i');
  return projects.filter((p) => p.stack.some((s) => re.test(s)));
};

export default function SkillsPage() {
  return (
    <>
      <Meta title="Skills" description="Mittal Domadiya's toolkit across cloud, Kubernetes, IaC, CI/CD, observability, languages and applied AI, with the projects that use each tool." />
      <PageHeader title="Toolkit">
        No skill bars. Each tool links to the projects where I actually used it; tools with no project link are ones I've learned through coursework or labs.
      </PageHeader>

      <div className={`${column} pb-32`}>
        {toolkit.map((g) => (
          <section key={g.group} aria-labelledby={`g-${g.group}`} className="grid gap-6 border-t border-line py-10 lg:grid-cols-[14rem_minmax(0,1fr)]">
            <h2 id={`g-${g.group}`} className="label pt-1 text-mist">{g.group}</h2>
            <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2 2xl:grid-cols-3">
              {g.items.map((item) => {
                const ps = usedIn(item);
                return (
                  <li key={item}>
                    <p className="text-lg text-mist">{item}</p>
                    <p className="mt-1 text-sm text-mist-dim">
                      {ps.length ? (
                        <>Used in {ps.map((p, i) => (
                          <span key={p.slug}>{i > 0 && ', '}<Link className="underline decoration-line underline-offset-4 hover:text-ember hover:decoration-ember" to={`/projects#${p.slug}`}>{p.name}</Link></span>
                        ))}</>
                      ) : 'Coursework and labs'}
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
