# Briefly AI

**Your AI-Powered Copywriting & Marketing Assistant**

Briefly AI is a web application designed to help users with copywriting and marketing tasks through a conversational interface. It provides a workspace for interacting with an AI assistant, composing requests, and working with text and file attachments.

## Features

- **Conversational Interface** — interact with the assistant through a chat-based workspace.
- **Copywriting & Marketing Assistance** — designed to support content creation and marketing-related tasks.
- **File Attachments** — attach image, document, audio, and video files through the input interface.
- **Markdown Rendering** — display assistant responses with Markdown formatting and GitHub Flavored Markdown support.
- **Sidebar Navigation** — access workspace sections through organized navigation.
- **Modern UI** — built with Next.js, React, and Tailwind CSS.

> Note: These features describe the available frontend implementation. Actual AI integration, file processing, and backend functionality depend on the connected services and application logic.

## Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js](https://nextjs.org/) | React framework |
| [React](https://react.dev/) | User interface |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [React Markdown](https://github.com/remarkjs/react-markdown) | Markdown rendering |
| [remark-gfm](https://github.com/remarkjs/remark-gfm) | GitHub Flavored Markdown support |
| [Untitled UI Icons](https://www.untitledui.com/) | Interface icons |

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm, yarn, pnpm, or bun
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AldioYaspindoDev/BRIEFLY-AI-APP.git
   ```

2. Navigate to the project directory:

   ```bash
   cd BRIEFLY-AI-APP
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Project Structure

The following is a simplified overview of the confirmed frontend files:

```text
BRIEFLY-AI-APP/
├── app/
│   ├── components/
│   │   ├── fieldInput.tsx
│   │   └── sidebarNavigation.tsx
│   ├── data/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── package.json
├── next.config.ts
└── tsconfig.json
```

The structure above is intentionally simplified. Additional directories and files may exist in the repository.

## Development

The main application page is located at `app/page.tsx`. The chat input and conversation interface are implemented in `app/components/fieldInput.tsx`, while the sidebar navigation is defined in `app/components/sidebarNavigation.tsx`.

To modify the application:

1. Update the page layout and interface components.
2. Customize the design through Tailwind CSS classes and `app/globals.css`.
3. Connect the conversational interface to the appropriate AI service to enable live responses.
4. Configure and test file uploads and any required backend integrations.

## Roadmap

Potential improvements include:

- Integrating an AI model for real-time copywriting assistance.
- Adding specialized marketing and copywriting templates.
- Supporting conversation history and saved drafts.
- Implementing robust file upload and content extraction workflows.
- Adding user authentication and workspace management.
- Improving error handling, accessibility, and responsive behavior.

## Contributing

Contributions, suggestions, and feedback are welcome. Fork the repository, create a feature branch, and submit a pull request with a clear description of your changes.

## Author

**Aldio Yaspindo**

- GitHub: [@AldioYaspindoDev](https://github.com/AldioYaspindoDev)
- Repository: [BRIEFLY-AI-APP](https://github.com/AldioYaspindoDev/BRIEFLY-AI-APP)
