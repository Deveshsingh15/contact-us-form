# Contact Us Form — React

A clean, production-ready Contact Us form built with React functional components and hooks. Submits to the GreatFrontEnd contact-form API endpoint with full loading, success, and error state handling.

## Folder Structure

```
contact-form/
├── package.json
├── public/
│   └── index.html
├── README.md
└── src/
    ├── App.js
    ├── index.js
    ├── styles.css
    └── components/
        └── ContactForm.js
```

## Features

- Controlled inputs (Name, Email, Message) backed by a single `formData` state object
- `async/await` + Fetch API POST request on submit
- `event.preventDefault()` to stop the page refresh
- Submit button disables and shows "Sending..." while the request is in flight
- Success message + form reset on success
- Error message on failed request or network failure
- Modern, centered, responsive card UI

## Installation Instructions

### Run locally

```bash
# 1. Unzip / clone the project, then move into it
cd contact-form

# 2. Install dependencies
npm install

# 3. Start the dev server
npm start
```

The app opens at `http://localhost:3000`.

### Run in CodeSandbox

1. Go to [codesandbox.io](https://codesandbox.io) and create a new **React** sandbox.
2. Replace the generated `src/App.js` and `src/index.js` with the versions provided here.
3. Create `src/components/ContactForm.js` and `src/styles.css` and paste in the provided code.
4. Replace `package.json` with the one provided (or just `npm install` nothing extra is needed — it only uses `react` and `react-dom`, which CodeSandbox's React template already includes).

## Implementation Explanation

**State management (`ContactForm.js`)**
- `formData` — a single object `{ name, email, message }`, updated by one shared `handleChange` function that reads `event.target.name` to know which field to update. This avoids writing three near-identical handlers.
- `isSubmitting` — boolean, toggled true right before the fetch call and false in the `finally` block, guaranteeing it resets whether the request succeeds or fails.
- `status` / `statusMessage` — drive which feedback banner (success or error) is shown beneath the form.

**Submit flow**
1. `handleSubmit` calls `event.preventDefault()` immediately to stop the native form POST/page refresh.
2. Sets `isSubmitting` to `true` and clears any previous status.
3. Sends a `POST` request via `fetch` with `Content-Type: application/json` and the form data as the JSON body.
4. If `response.ok` is `false` (e.g. 4xx/5xx), an error is thrown manually so it's caught the same way as a network failure.
5. On success: resets `formData` to empty strings and shows "Message sent successfully!"
6. On any failure (bad response *or* network error — fetch rejects automatically on network failures like DNS/offline issues): shows a generic error message and logs details to the console for debugging.
7. `finally` block always re-enables the button and resets the "Sending..." text, regardless of outcome.

**UI**
- A single centered card (`.contact-form-card`) on a gradient background, common in modern SaaS landing pages.
- Inputs have visible focus states (border + soft shadow) for accessibility.
- Fully responsive — the card scales down and padding tightens on narrow viewports via a media query.

## Deployment Instructions (Vercel)

1. Push the project to a GitHub repository (see steps below).
2. Go to [vercel.com](https://vercel.com) and sign in (GitHub login is easiest).
3. Click **Add New... → Project**.
4. Select your GitHub repository from the list (you may need to click "Adjust GitHub App Permissions" if it doesn't appear).
5. Vercel auto-detects it as a Create React App project:
   - **Build Command:** `npm run build` (auto-filled)
   - **Output Directory:** `build` (auto-filled)
6. Click **Deploy**.
7. After a minute or two, Vercel gives you a live URL like `https://contact-us-form-yourname.vercel.app`.

No environment variables are needed — the API URL is a public endpoint hardcoded in `ContactForm.js`.

## GitHub Upload Instructions

```bash
# From inside the contact-form project folder
git init
git add .
git commit -m "Initial commit: Contact Us form"

# Create a new repo on GitHub first (via github.com), then:
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

If you prefer the GitHub CLI:

```bash
gh repo create contact-us-form --public --source=. --remote=origin
git push -u origin main
```

## Assumptions Made

- No client-side validation was implemented, per the assignment's explicit instruction — fields can be submitted empty.
- The API's exact success response body isn't relied upon; only `response.ok` (HTTP status) is checked to decide success vs. failure, since the assignment didn't specify the response shape.
- A generic error message is shown to the user for *any* failure (bad request, server error, or network/offline issue), while the specific error is logged to the console — this is standard practice so as not to leak technical details to end users.
- Plain CSS (no UI framework like Bootstrap/MUI) was used to keep the project dependency-free and easy to drop into CodeSandbox without extra installs.
