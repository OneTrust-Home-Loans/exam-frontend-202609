/* Checks for exercise 2. Don't edit this file. */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import { ConditionsList } from '../ConditionsList.tsx';
import type { LoanCondition } from '../types.ts';

const BANK_STATEMENTS = 'Most recent 2 months bank statements, all pages';
const VERBAL_VOE = 'Verbal VOE within 10 days of note date';
const HOMEOWNERS = 'Homeowners policy with mortgagee clause';
const FORM_4506C = 'Signed 4506-C for both borrowers';

function conditions(): LoanCondition[] {
  return [
    { id: 'c-8801', category: 'PTA', text: BANK_STATEMENTS, cleared: false },
    { id: 'c-8802', category: 'PTD', text: VERBAL_VOE, cleared: false },
    { id: 'c-8803', category: 'PTD', text: HOMEOWNERS, cleared: false },
    { id: 'c-8804', category: 'PTF', text: FORM_4506C, cleared: false },
  ];
}

const checkboxFor = (text: string) => screen.getByLabelText(`Clear ${text}`);
const noteFor = (text: string) => screen.getByLabelText(`Note for ${text}`);
const removeFor = (text: string) => screen.getByLabelText(`Remove ${text}`);

function renderList() {
  return render(<ConditionsList loanNumber="2609001842" initialConditions={conditions()} />);
}

test('ticking a condition checks it right away', async () => {
  const user = userEvent.setup();
  renderList();

  await user.click(checkboxFor(VERBAL_VOE));

  expect(checkboxFor(VERBAL_VOE)).toBeChecked();
});

test('ticking one condition leaves the others alone', async () => {
  const user = userEvent.setup();
  renderList();

  await user.click(checkboxFor(VERBAL_VOE));

  expect(checkboxFor(BANK_STATEMENTS)).not.toBeChecked();
  expect(checkboxFor(HOMEOWNERS)).not.toBeChecked();
  expect(checkboxFor(FORM_4506C)).not.toBeChecked();
});

test('the outstanding count follows along', async () => {
  const user = userEvent.setup();
  renderList();

  expect(screen.getByText('4 outstanding')).toBeInTheDocument();

  await user.click(checkboxFor(VERBAL_VOE));
  expect(screen.getByText('3 outstanding')).toBeInTheDocument();

  await user.click(checkboxFor(VERBAL_VOE));
  expect(screen.getByText('4 outstanding')).toBeInTheDocument();
});

test('removing a condition drops that one and only that one', async () => {
  const user = userEvent.setup();
  renderList();

  await user.click(removeFor(BANK_STATEMENTS));

  expect(screen.queryByText(BANK_STATEMENTS)).not.toBeInTheDocument();
  expect(screen.getByText(VERBAL_VOE)).toBeInTheDocument();
  expect(screen.getByText(FORM_4506C)).toBeInTheDocument();
});

test('a note stays with its own condition after a removal', async () => {
  const user = userEvent.setup();
  renderList();

  await user.type(noteFor(VERBAL_VOE), 'emailed HR 9/11');
  await user.click(removeFor(BANK_STATEMENTS));

  expect(noteFor(VERBAL_VOE)).toHaveValue('emailed HR 9/11');
  expect(noteFor(HOMEOWNERS)).toHaveValue('');
});

test('cleared state stays with its own condition after a removal', async () => {
  const user = userEvent.setup();
  renderList();

  await user.click(checkboxFor(FORM_4506C));
  await user.click(removeFor(BANK_STATEMENTS));

  expect(checkboxFor(FORM_4506C)).toBeChecked();
  expect(checkboxFor(VERBAL_VOE)).not.toBeChecked();
  expect(checkboxFor(HOMEOWNERS)).not.toBeChecked();
});
