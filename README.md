# Practical exam - Frontend (React + Vite + TypeScript)

**Two bugs, about 25 minutes. Both reported by real users.**

This is the branch pipeline board: a filterable loan list and the
underwriting conditions checklist that sits under it. Two bug reports came
in from the field. Make the checks pass.

## Running it

```
npm install
npm run dev       # the board, on http://localhost:5180
npm test          # both exercises
npm run test:1    # borrower search
npm run test:2    # conditions checklist
npm run typecheck
```

Right now that's **5 of 11 passing**. The 5 that pass are there to make
sure your fix doesn't break anything that already worked.

**Open the app first.** Both bugs are things you can see and feel in the
browser in about ten seconds, and watching one happen is usually faster
than reading the test output.

## The two exercises

| | File | What the user said |
|---|---|---|
| 1 | [src/PipelineFilters.tsx](src/PipelineFilters.tsx) | "I can only type one letter at a time in the borrower search" |
| 2 | [src/ConditionsList.tsx](src/ConditionsList.tsx) | "The checkbox won't tick" and "my note jumped to a different condition" |

The full report for each is in a comment at the top of the file. Read it -
the exact wording of a report is usually the fastest route to the cause.

## Ground rules

- Edit only `src/PipelineFilters.tsx` and `src/ConditionsList.tsx`. Leave
  `src/__checks__/` alone.
- No new dependencies, no state library. Everything here is plain React.
- Don't restructure the app. Both fixes are small; if you're rewriting a
  component from scratch, step back.
- Keep the existing markup, class names and accessible labels - other
  screens and the checks both rely on them.

## How you're assessed

We may do one of these by reading together rather than typing - we'll say
which at the start.

Green checks are the floor. Afterwards we'll ask you to explain what was
actually going wrong and why it produced that specific complaint - so
things like why one bug hid the other in exercise 2, or why the dropdown
appeared to be fine in exercise 1.

Think out loud. If you're stuck, tell us what you've ruled out.
