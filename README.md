Next to go (React)
==================

- Bootstrapped with `bun init`.
- Code, tests, and documentation was all written by a human (me). Absolutely no
  AI was used at any point.
- VS Code workspace extensions (recommended):
  - [ESLint][ext-eslint] (`dbaeumer.vscode-eslint`) -
    Linting and formatting on save.
  - [EditorConfig][ext-editorconfig] (`editorconfig.editorconfig`) -
    Consistent line endings and whitespace.
  - [Bun][ext-bun] (`oven.bun-vscode`) -
    Test runner and debugger.

[ext-eslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[ext-editorconfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[ext-bun]: https://marketplace.visualstudio.com/items?itemName=oven.bun-vscode

Development
-----------

```sh
# Start development server. HMR and mocks enabled.
bun dev

# Start production server. HMR and mocks disabled.
bun start
```

Criteria
--------

1. [x] **User should see 5 races at all times.** Uses overfetching to minimise
   the chance of less than 5 races at any time, however with category filtering
   it cannot be guaranteed that the backend returns at least 5 races in each
   category.
2. [x] **Races should be sorted by time ascending.** Sorting is not implemented
   on the frontend and instead deferred to the backend. This application trusts
   that result order is ensured by `next_to_go_ids`. Chronological sorting is
   trivial but intentionally omitted to reduce clientside performance overhead.
3. [x] **Race should disappear from the list after 1 min past the start time.**
   Races are filtered out of result set from API response according to category
   ID filtering and by comparing the race's jump time with the current system
   time. It is feasible that the user's system time is out of sync and this can
   result in undefined behaviour but handling this is out of scope.
4. [x] **User should see meeting name, race number and countdown timer that
   indicates the start of the race.** A global timer is used to ensure all
   countdowns are updated on the same render pass.
5. [x] **User should be able to toggle race categories to view races belonging
   to only the selected category.** These category IDs are hardcoded as constant
   values, however there is a potential area of improvement in deriving these
   from the backend to ensure separation of concerns and promote scalability.
