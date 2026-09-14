/*
 * The board itself. Nothing is broken in this file - it's here so you can
 * see both bugs in a real screen with `npm run dev`.
 */
import { useMemo, useState } from 'react';
import { PipelineFilters } from './PipelineFilters.tsx';
import { ConditionsList } from './ConditionsList.tsx';
import { CONDITIONS, LOANS, formatUsd } from './data.ts';
import type { Milestone } from './types.ts';

export function App() {
  const [query, setQuery] = useState('');
  const [milestone, setMilestone] = useState<Milestone | 'All'>('All');

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return LOANS.filter((loan) => {
      const matchesMilestone = milestone === 'All' || loan.milestone === milestone;
      const matchesQuery =
        needle === '' ||
        loan.borrower.toLowerCase().includes(needle) ||
        loan.loanNumber.includes(needle);
      return matchesMilestone && matchesQuery;
    });
  }, [query, milestone]);

  const totalCents = visible.reduce((sum, loan) => sum + loan.loanAmountCents, 0);

  return (
    <main className="app">
      <header className="app-header">
        <h1>Branch pipeline</h1>
        <p className="subhead">710 - Baltimore</p>
      </header>

      <PipelineFilters
        query={query}
        milestone={milestone}
        onQueryChange={setQuery}
        onMilestoneChange={setMilestone}
        onReset={() => {
          setQuery('');
          setMilestone('All');
        }}
      />

      <table className="pipeline">
        <thead>
          <tr>
            <th>Loan</th>
            <th>Borrower</th>
            <th>Milestone</th>
            <th className="num">Amount</th>
            <th>Loan officer</th>
            <th>Lock expires</th>
          </tr>
        </thead>
        <tbody>
          {visible.map((loan) => (
            <tr key={loan.loanNumber}>
              <td className="mono">{loan.loanNumber}</td>
              <td>{loan.borrower}</td>
              <td>{loan.milestone}</td>
              <td className="num">{formatUsd(loan.loanAmountCents)}</td>
              <td>{loan.loanOfficer}</td>
              <td className="mono">{loan.lockExpiresOn}</td>
            </tr>
          ))}
          {visible.length === 0 && (
            <tr>
              <td colSpan={6} className="empty">
                No loans match those filters.
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>
              {visible.length} loan{visible.length === 1 ? '' : 's'}
            </td>
            <td className="num">{formatUsd(totalCents)}</td>
            <td colSpan={2} />
          </tr>
        </tfoot>
      </table>

      <ConditionsList loanNumber="2609001842" initialConditions={CONDITIONS} />
    </main>
  );
}
