# productboard-test

## [Task](task.md)

## Analysis and features

1. separate big queries (e.g. search categories) from actual search suggestions
2. keep the list small as this would induce choice paralysis for the user
3. show max 10 items so the user won't have to scroll in a small area, that would introduce further confusion
4. highlight the differences in query and suggestions
5. support keyboard navigation
6. copy the text of the currently focused suggestion to the search field
7. implement hover styles, as some users will still use mouse to select suggestions from the list
8. add labels (such as 'search suggestions') to clearly indicate what it is

## Nice to haves

- tests - 0.5 MD
- accessibility - 0.5 MD
- show search history - 0.5 MD
- tap-ahead (icon that replaces the query upon click) - 0.15 MD

## Instructions

- clone
- `npm i`
- `npm start`
