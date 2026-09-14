/*
 * EXERCISE 2 - The underwriting conditions checklist
 *
 * Run:  npm run test:2      See it:  npm run dev
 *
 * THE REPORT
 * ----------
 * Two complaints from processing, filed separately:
 *
 *  a) "Checking a condition off does nothing. The box won't tick. If I
 *      change the milestone filter at the top, suddenly the ones I clicked
 *      are checked."
 *  b) "I removed a satisfied condition and my note jumped onto a different
 *      condition."
 *
 * WHAT IT HAS TO DO
 * -----------------
 * Ticking a condition updates it straight away, and only it. Removing a
 * condition leaves every other row exactly as it was - cleared state and
 * the typed note both stay with the condition they belong to. The note box
 * is scratch text until the processor hits Save, so it lives in the DOM
 * rather than in state; that part is deliberate, and it must survive a
 * removal.
 *
 * Fix this file. Don't change the checks in src/__checks__/.
 */
import { useState } from 'react';
import type { LoanCondition } from './types.ts';
import { CATEGORY_LABEL } from './data.ts';

type Props = {
  loanNumber: string;
  initialConditions: LoanCondition[];
};

export function ConditionsList({ loanNumber, initialConditions }: Props) {
  const [conditions, setConditions] = useState<LoanCondition[]>(initialConditions);

  function toggleCleared(index: number) {
    // TODO
    conditions[index].cleared = !conditions[index].cleared;
    setConditions(conditions);
  }

  function removeCondition(index: number) {
    // TODO
    conditions.splice(index, 1);
    setConditions(conditions);
  }

  const outstanding = conditions.filter((condition) => !condition.cleared).length;

  return (
    <section className="conditions">
      <h2>
        Conditions <span className="loan-ref">Loan {loanNumber}</span>
      </h2>
      <p className="outstanding">{outstanding} outstanding</p>

      <ul className="condition-list">
        {conditions.map((condition, index) => (
          // TODO
          <li key={index} className={condition.cleared ? 'condition cleared' : 'condition'}>
            <input
              type="checkbox"
              checked={condition.cleared}
              onChange={() => toggleCleared(index)}
              aria-label={`Clear ${condition.text}`}
            />
            <span className="badge">{condition.category}</span>
            <span className="condition-text" title={CATEGORY_LABEL[condition.category]}>
              {condition.text}
            </span>
            <input
              type="text"
              className="note"
              placeholder="Note to UW"
              aria-label={`Note for ${condition.text}`}
            />
            <button
              type="button"
              className="remove"
              onClick={() => removeCondition(index)}
              aria-label={`Remove ${condition.text}`}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
