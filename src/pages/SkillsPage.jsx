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
      <Meta title="Skills" description="Mittal Domadiya's toolkit across cloud, Kubernetes, IaC, CI/CD, observability, testing, AI training and LLM evaluation, with the projects that use each tool." />
      <PageHeader title="Toolkit">
        No skill bars. Where a tool appears in one of my projects, it links straight to that project.
      </PageHeader>

      <div className={`${column} pb-32`}>
        {toolkit.map((g) => {
          // aria-labelledby takes a space-separated id list, so the id must be a slug
          const gid = `g-${g.group.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
          return (
          <section key={g.group} aria-labelledby={gid} className="grid gap-6 border-t border-line py-10 lg:grid-cols-[14rem_minmax(0,1fr)]">
            <h2 id={gid} className="label pt-1 text-mist">{g.group}</h2>
            <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2 2xl:grid-cols-3">
              {g.items.map((item) => {
                const ps = usedIn(item);
                return (
                  <li key={item}>
                    <p className="text-lg text-mist">{item}</p>
                    {ps.length > 0 && (
                      <p className="mt-1 text-sm text-mist-dim">
                        Used in {ps.map((p, i) => (
                          <span key={p.slug}>{i > 0 && ', '}<Link className="underline decoration-line underline-offset-4 hover:text-ember hover:decoration-ember" to={`/projects#${p.slug}`}>{p.name}</Link></span>
                        ))}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
          );
        })}
      </div>
    </>
  );
}
