/* Checks for exercise 1. Don't edit this file. */
import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import { PipelineFilters } from '../PipelineFilters.tsx';
import type { Milestone } from '../types.ts';

/** Stands in for App: holds the filter state, so every keystroke re-renders. */
function Harness() {
  const [query, setQuery] = useState('');
  const [milestone, setMilestone] = useState<Milestone | 'All'>('All');
  return (
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
  );
}

const borrowerBox = () => screen.getByPlaceholderText(/search borrower/i) as HTMLInputElement;

test('the borrower box keeps focus while you type', async () => {
  const user = userEvent.setup();
  render(<Harness />);

  await user.click(borrowerBox());

  for (const character of 'okafor') {
    await user.keyboard(character);
    expect(
      borrowerBox(),
      `lost focus after typing "${character}" - the input in the DOM is not the one that had the caret`,
    ).toHaveFocus();
  }
});

test('typing a full name lands the whole name in the box', async () => {
  const user = userEvent.setup();
  render(<Harness />);

  await user.type(borrowerBox(), 'okafor');

  expect(borrowerBox()).toHaveValue('okafor');
});

test('the milestone dropdown still works', async () => {
  const user = userEvent.setup();
  render(<Harness />);

  await user.selectOptions(screen.getByRole('combobox'), 'Underwriting');

  expect(screen.getByRole('combobox')).toHaveValue('Underwriting');
});

test('reset clears the filters', async () => {
  const user = userEvent.setup();
  render(<Harness />);

  await user.type(borrowerBox(), 'price');
  await user.selectOptions(screen.getByRole('combobox'), 'Funding');
  await user.click(screen.getByRole('button', { name: /reset/i }));

  expect(borrowerBox()).toHaveValue('');
  expect(screen.getByRole('combobox')).toHaveValue('All');
});

test('the filter bar still has its labels', () => {
  render(<Harness />);

  expect(screen.getByText('Borrower')).toBeInTheDocument();
  expect(screen.getByText('Milestone')).toBeInTheDocument();
});
