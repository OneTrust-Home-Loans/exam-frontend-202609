/*
 * EXERCISE 1 - The borrower search box
 *
 * Run:  npm run test:1      See it:  npm run dev
 *
 * THE REPORT
 * ----------
 * "I can only type one letter at a time in the borrower search. It loses
 *  focus after every keystroke and I have to click back in." - three loan
 * officers, same week. It got worse after we restyled the filter bar.
 *
 * WHAT IT HAS TO DO
 * -----------------
 * Type continuously into the Borrower box without the caret going anywhere.
 * The milestone dropdown and the reset button keep working as they do now,
 * and the filter bar keeps the same markup and labels.
 *
 * Fix this file. Don't change the checks in src/__checks__/.
 */
import type { ReactNode } from 'react';
import type { Milestone } from './types.ts';
import { MILESTONES } from './data.ts';

type Props = {
  query: string;
  milestone: Milestone | 'All';
  onQueryChange: (value: string) => void;
  onMilestoneChange: (value: Milestone | 'All') => void;
  onReset: () => void;
};

export function PipelineFilters({
  query,
  milestone,
  onQueryChange,
  onMilestoneChange,
  onReset,
}: Props) {
  // TODO: the restyle added this wrapper. That detail is in the bug report
  // for a reason.
  function Field({ label, children }: { label: string; children: ReactNode }) {
    return (
      <label className="field">
        <span className="field-label">{label}</span>
        {children}
      </label>
    );
  }

  return (
    <div className="filters">
      <Field label="Borrower">
        <input
          type="text"
          className="control"
          placeholder="Search borrower or loan number"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </Field>

      <Field label="Milestone">
        <select
          className="control"
          value={milestone}
          onChange={(event) => onMilestoneChange(event.target.value as Milestone | 'All')}
        >
          <option value="All">All milestones</option>
          {MILESTONES.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </Field>

      <button type="button" className="reset" onClick={onReset}>
        Reset
      </button>
    </div>
  );
}
