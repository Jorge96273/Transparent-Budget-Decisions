# Transparent-Budget-Decision

- Clone Git Repo to local machine
- IN CLI for project: npm create vite@latest .
- Select Ignore Files and Continue
- Add Package Name: transparent-budget-decisions
- Select React
- Select JavaScript
- In CLI for project: npm install -D tailwindcss postcss autoprefixer
- In CLI for project: npx tailwindcss init -p
- Create file jsconfig.json
- Inside jsconfig.json paste:
  {
  "compilerOptions": {
  // ...
  "baseUrl": ".",
  "paths": {
  "@/_": [
  "./src/_"
  ]
  }
  // ...
  }
  }
- In CLI for project: npm i -D @types/node
- In vite.config.js replace all text with:
  import path from "path"
  import react from "@vitejs/plugin-react"
  import { defineConfig } from "vite"

export default defineConfig({
plugins: [react()],
resolve: {
alias: {
"@": path.resolve(\_\_dirname, "./src"),
},
},
})

- In CLI for project: npx shadcn-ui@latest init

  - TypeScript: no
  - style: default
  - base color: slate
  - global CSS: src/index.css
  - CSS variables: yes
  - Custom tailmind prefix: no
  - tailwind.config.js: "press enter"
  - components: "press enter"
  - utils: "press enter"
  - React Server Components: yes
  - Proceed: Y

- To test installation:

  - In CLI for project: npx shadcn-ui@latest add button
  - Look in /src/components for a ui folder with button.jsx inside
  - In /src/components create Button.jsx file
  - Paste the following into Button.jsx:

        import { Button } from "@/components/ui/button"

        export default function Home() {
        return (
             <div>
                <Button>Click me</Button>
            </div>
         )
        }

- In App.jsx:
  -import { Button } from './components/ui/button'
  -add <Button /> below <h1>
- In CLI for project: npm install
- In CLI for project: npm install
- In CLI for project: o "enter"
- Look for black square under "Vite + React" to confirm shadcn functionality
