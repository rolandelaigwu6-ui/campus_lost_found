export const meta = {
  name: 'verify-register-back-button',
  description: 'Verify the new back-to-landing link on the register page via runtime, conventions/a11y, and typecheck lenses',
  phases: [
    { title: 'Verify', detail: '3 concurrent lenses: live render, conventions/a11y/design, typecheck' },
    { title: 'Judge', detail: 'adversarially weigh the three verdicts into one call' },
  ],
}

const CONTEXT = [
  'PROJECT: /home/student/campus_lost_found - Next.js 16 App Router + React 19 + Tailwind v4 (tokens in src/app/globals.css via @theme).',
  'A Next.js dev server is ALREADY RUNNING on http://localhost:3000 (turbopack). DO NOT run next build, and do not restart or kill the dev server - it shares .next with dev state and the user is using it.',
  '',
  'THE CHANGE JUST MADE (the thing under review):',
  'File: src/app/(auth)/register/page.tsx',
  '1. Added import: import { ArrowLeft } from "lucide-react";',
  '2. Inside the card column (div className="w-full max-w-sm"), before the logo/heading block, added:',
  '   <Link href="/" className="mb-6 inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-text-secondary transition-colors hover:bg-surface hover:text-text">',
  '     <ArrowLeft size={16} /> Back',
  '   </Link>',
  'User request: "add a back button on the register page where users can navigate back to the landing page."',
  '',
  'KNOWN FACTS ALREADY ESTABLISHED (do not re-litigate, but flag if they invalidate the change):',
  '- The landing page is src/app/page.tsx and curl http://localhost:3000/ returns it (contains "Lost something on campus? Find it here"). So the target of href="/" is correct in practice.',
  '- src/app/(main)/page.tsx also exists and also resolves to "/" - a pre-existing duplicate-route oddity, NOT part of this change.',
  '- The repo already has a back-control idiom at src/app/(main)/items/[id]/page.tsx around line 15 that uses router.back() with ArrowLeft size 16.',
  '- The register page logo is already wrapped in <Link href="/">.',
].join('\n')

const VERDICT_SCHEMA = {
  type: 'object',
  properties: {
    ok: { type: 'boolean', description: 'true if the change is correct and complete for the user request' },
    issues: {
      type: 'array',
      description: 'Real defects or worthwhile improvements. Empty array if none.',
      items: {
        type: 'object',
        properties: {
          severity: { type: 'string', description: 'critical | major | minor | nit' },
          detail: { type: 'string' },
          evidence: { type: 'string', description: 'exact command output, file:line, or rendered markup proving it' },
        },
        required: ['severity', 'detail', 'evidence'],
      },
    },
    notes: { type: 'string', description: 'Anything the judge must know; raw evidence, no politeness' },
  },
  required: ['ok', 'issues', 'notes'],
}

const LENSES = [
  {
    key: 'runtime-render',
    prompt: [
      CONTEXT,
      '',
      'YOUR LENS - RUNTIME RENDER (the most important lens; be adversarial).',
      '',
      'The dev server hot-reloads, so the change should already be live. Prove or disprove that the back link actually renders and works:',
      '1. Run: curl -s http://localhost:3000/register  and inspect the HTML. Confirm: (a) the page still returns 200, (b) an anchor with href="/" containing the text "Back" is present in the markup, (c) the page did NOT render an error overlay or compile error (search the HTML for "Unhandled Runtime Error", "Module not found", "Failed to compile", "Build Error"), (d) the rest of the register form still rendered - "Create an account", the Full Name/Email/Password/Cluster/Phone inputs, "Create Account" button, and the "Already have an account? Log in" line.',
      '2. Verify the link target actually serves the landing page: curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/  and  curl -s http://localhost:3000/ | grep -o "Lost something on campus? Find it here"',
      '3. Check there is exactly ONE back control and the markup is well-formed: count occurrences of the anchor to "/" containing "Back", and confirm the ArrowLeft svg is inside that anchor. Paste the exact matching markup snippet as evidence.',
      '4. Report whether the dev server emitted a compile error for this route. You may inspect recent dev logs read-only (for example ls -t on files under .next/dev) and read them. Do not kill or restart anything, and do not run next build.',
      '',
      'If curl cannot reach the server, say so explicitly as evidence rather than assuming success. Do not edit any files. Return raw command output in your evidence fields.',
    ].join('\n'),
  },
  {
    key: 'conventions-a11y-design',
    prompt: [
      CONTEXT,
      '',
      'YOUR LENS - CONVENTIONS, ACCESSIBILITY, AND VISUAL DESIGN (read-only; do NOT edit files).',
      '',
      'Read the changed file in full (src/app/(auth)/register/page.tsx) plus: src/app/(auth)/login/page.tsx, src/app/(auth)/layout.tsx, src/app/(main)/items/[id]/page.tsx, src/app/page.tsx, src/components/ui/Button.tsx, src/app/globals.css.',
      '',
      'Do all of this:',
      '1. Confirm the JSX is well-formed and the new element sits inside the intended container. Report the final line numbers of the new link.',
      '2. Accessibility: is the control keyboard-reachable in a sensible tab order (is it the FIRST focusable element on the page)? Does it have an accessible name? Does focus-visible styling exist for it (globals.css defines an a:focus-visible outline)? Is the icon a problem given adjacent text? Is "Back" an adequate label for a link that goes to the landing page, or would "Back to home" serve screen-reader users better?',
      '3. Design consistency: does the styling match the codebase back-control idiom (items/[id] uses "flex items-center gap-1.5 text-sm text-text-secondary hover:text-text") and the app token vocabulary (text-text-secondary, hover:bg-surface, text-text from the @theme block in globals.css)? Is rounded-lg + px-2 py-1.5 + hover:bg-surface coherent with how other links are styled (compare landing page header links, which use rounded-lg px-4 py-2 hover:bg-surface)? Flag any class name that is not a real token in globals.css and would silently no-op.',
      '4. Layout/responsive risk: the outer wrapper is "flex min-h-dvh items-center justify-center px-6 py-12". The new link is in-flow with mb-6 above a centered logo/heading block. Does this cause any visual or vertical-centering problem at small widths (320px) or short viewports? Does it collide with anything? Is a left-aligned back link above a text-center heading block visually awkward, and if so is it worth changing?',
      '5. Completeness of the user request. The implementation uses <Link href="/"> rather than the repo router.back() idiom. Argue whether that is the right call (consider: register can be entered directly via URL or externally, where history is empty and router.back() would leave the app or do nothing; but router.back() preserves the referring page). State which you would ship and why, and whether the divergence from the in-repo idiom is a defect or an improvement.',
      '6. Note (do not fix) whether the same affordance is missing on src/app/(auth)/login/page.tsx - the user only asked about register, so this is scope information, not a defect.',
      '7. Note whether src/app/page.tsx and src/app/(main)/page.tsx both resolving to "/" is a real problem for this feature or a pre-existing landmine (pre-existing; assess risk only).',
      '',
      'Every issue you report must cite file:line or exact markup as evidence. Do not invent issues to seem thorough - an empty issues array is a valid answer.',
    ].join('\n'),
  },
  {
    key: 'typecheck',
    prompt: [
      CONTEXT,
      '',
      'YOUR LENS - STATIC CORRECTNESS.',
      '',
      '1. Run a TypeScript check that does NOT interfere with the running dev server: cd /home/student/campus_lost_found && npx tsc --noEmit -p tsconfig.json . Report the FULL raw output and exit code. typescript ^7.0.2 is installed - if the binary is missing or the flags differ, report that verbatim instead of guessing.',
      '2. Confirm lucide-react actually exports ArrowLeft in the installed version: grep for ArrowLeft in the installed lucide-react type definitions under node_modules/lucide-react and report what you find.',
      '3. Confirm next/link supports the props used (href string, className, children) - covered by the tsc run if it passes; say so.',
      '4. Verify the edit introduced exactly the intended diff: run git diff -- "src/app/(auth)/register/page.tsx" and report it verbatim. Also run git status --porcelain and confirm no other source file was modified by this change. Note: .next/dev/trace showing as modified is pre-existing build output noise, not part of the change.',
      '5. Do NOT run next build (the dev server shares .next). If you believe a build is required for confidence, say so as a recommendation instead of running it.',
      '',
      'Report raw command output as evidence. Do not edit any files.',
    ].join('\n'),
  },
]

phase('Verify')
const verdicts = await parallel(LENSES.map((l) => () =>
  agent(l.prompt, { label: 'verify:' + l.key, phase: 'Verify', schema: VERDICT_SCHEMA })
    .then((v) => ({ lens: l.key, ...v }))
))

const live = verdicts.filter(Boolean)
log(live.length + '/' + LENSES.length + ' lenses returned a verdict')

phase('Judge')
const judgment = await agent([
  CONTEXT,
  '',
  'You are the adversarial judge. Three independent reviewers each examined the change through one lens. Their structured verdicts (JSON) follow. Treat their claims as UNVERIFIED until you check the cheap ones yourself - reviewers sometimes hallucinate successful curl output.',
  '',
  JSON.stringify(live, null, 2),
  '',
  'Do this:',
  '1. Independently re-run the two cheapest decisive checks yourself and paste raw output: (a) curl -s http://localhost:3000/register -> does it contain an anchor to "/" with text "Back", and no compile-error markers? (b) cd /home/student/campus_lost_found && npx tsc --noEmit -p tsconfig.json (or report if unavailable). Do NOT run next build.',
  '2. For each issue any reviewer raised: mark it CONFIRMED (you reproduced it) or REFUTED (you could not, or it is factually wrong / a non-issue / pre-existing and out of scope). Cite your own evidence.',
  '3. Then decide the final verdict on the user request: is the back-to-landing link on the register page correctly and completely implemented, and does it actually work?',
  '4. List any residual risk the user should know about (pre-existing duplicate "/" route, missing equivalent on login, anything else) - clearly labelled as pre-existing / out of scope rather than as defects in this change.',
  '',
  'Return a final report: a short plain-language summary of what was shipped and whether it works, the confirmed defects (empty if none), the refuted claims with why, and the files/line numbers involved. Be honest - if verification failed or was impossible, say exactly that instead of claiming success. Return plain text, not JSON.',
].join('\n'), { label: 'judge:synthesis', phase: 'Judge' })

return { verdicts: live, judgment }
