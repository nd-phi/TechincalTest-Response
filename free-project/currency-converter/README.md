# Currency Converter

A React application built with TypeScript and Tailwind CSS for converting between different currencies.
This project is entirely built by Github Copilot agent mode, using Claude Haiku 4.5 model
IDE: VS Code
Source version control: Github

## Approaching
- I started the project with React and TS template which provides a strong type validation
- Tailwind is chosen by its css frendliness and easy to custom
- Initially, I started with i18n definination which pickup top 5 most used currencies, this helps the currency/its format visible to me during rendering layout, a better look instead of just the skeletion
- Next, I organized the UI with 3 panels in horizontal: History panel in the far left, Conversion panel in the midle, the rest is a blank panel (maybe a list of rates based on selected currency can be showed here)
- I've learned that there's been a hugh migration from tailwind v3 to v4, which introduced a better performance but also required a good understanding of the configuration to avoid compile-time error

## Prompts for Initiating the Project
Within the folder free-project, do the following actions:

- Create a React project using typescript template, project name is "currency-converter", use tailwind for css library
- Remove all pre-defined code from the creation
- Add a README file within this project with 3 sections: Prompts for initiating the project, Prompts for development and Features.

## Prompts for Development

- **Apply i18n**: Use i18n to define: top 5 most popular currencies, Suggest and define a file/folder to save this setting

- **Layout**:
Add a grid layout with 3 columns, from left to right, it should be:

The first column is a history panel which shows all conversion that has done.
The second column has 3 components: a currency selector for those 5 currencies; and 2 textboxes for inputing amounts, they should automatically format the numbers in currency
The third column is blank

- **Apply rate fetch**:
https://open.er-api.com/v6/latest will refresh rates after 24 hours
Apply a custom hook to fetch rates based on given based currency (From)
Only call the API when the rates is out of date within 24 hours
Apply the new hook for conversion

-- **Apply code format rules with ESlint and prettier**:

Single quote for string
No semicolon required

-- **Added functionalities**:
When user clicks on an history item, apply it to the current convesion

## Features

- **React with TypeScript**: Provides type safety and modern development practices
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Responsive Design**: Mobile-friendly interface built with Tailwind utilities
- **Hot Reload**: Automatic page refresh during development for instant feedback
- **Modern JavaScript**: ES6+ support with Create React App build tools

## Notes/Issues

**Issue with tailwind v4**
- We may face this issue `[v4] stuck at "[postcss] It looks like you're trying to use tailwindcss directly as a PostCSS plugin. The PostCSS plugin has moved to a separate package, so to continue using Tailwind CSS with PostCSS you'll need to install @tailwindcss/postcss and update your PostCSS`
- This is because the tailwind has been shifted from js configuration tool to a css oriented framework in v4
- I chose to downgrade the version to the latest of v3. Although the v4 introduces a significant performance improvement in build times, but the impact should be considered in large project only.
- In term of new features that v4 suggests, it has introduced a suite of 3D ultilities which this project does not required. This missing is not a big deal for currency conversion