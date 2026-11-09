# QA Automation Portfolio — Playwright + JavaScript

## Overview

This repository demonstrates my transition from manual QA to test automation, building on 12+ years of experience in software quality assurance, test design, defect investigation, and regression testing.

The project uses Playwright and JavaScript to automate web application scenarios, with an emphasis on reliable locators, meaningful assertions, and risk-based test coverage.

## Tech Stack

- JavaScript
- Playwright Test
- Node.js and npm
- Git and GitHub

## Current Test Coverage

The current test suite includes:

- Login page validation
- Successful authentication
- Invalid password handling
- Required username and password validation
- Locked-out account handling
- Product page element validation

## Getting Started

### Prerequisites

- Node.js and npm

### Installation

```bash
npm install
npx playwright install
```

### Run Tests

Run all configured tests:

```bash
npx playwright test
```

Run login tests in Chromium:

```bash
npx playwright test tests/login.spec.js --project=chromium
```

View the HTML report:

```bash
npx playwright show-report
```

## Project Structure

```text
tests/
  login.spec.js
  homepage.spec.js
  example.spec.js

playwright.config.js
package.json
package-lock.json
```

## Future Improvements

- Page Object Model (POM)
- External test data management
- Product and checkout automation
- API testing
- Smoke and regression suite organization
- Cross-browser validation
- GitHub Actions CI/CD

## Testing Approach

My automation approach prioritizes high-risk scenarios, positive and negative testing, resilient locators, clear assertions, and maintainable test code.

The goal is to build a scalable automation framework that combines strong QA fundamentals with modern automation practices.