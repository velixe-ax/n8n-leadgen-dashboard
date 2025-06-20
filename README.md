# Lead Generation Dashboard

A web application for managing and analyzing lead generation tasks, built with Loveable.ai, Modified with Cursor IDE, and used N8N as simple backend.

## Features

- Task management and monitoring
- Lead scoring and categorization (Hot, Warm, Cold)
- Detailed lead analytics and visualization
- AI-powered task assistance
- Real-time data updates
- Responsive design for all devices

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- PostgreSQL database

## Database Schema

The application requires two main tables in your PostgreSQL database:

### 1. leads_pipeline Table

This table stores all lead information and their scoring data:

```sql
CREATE TABLE public.leads_pipeline (
    "E-mail" text NULL,
    "First Name" text NULL,
    "Last Name" text NULL,
    linkedin_url text NULL,
    title text NULL,
    "Company name" text NULL,
    "Company website_url" text NULL,
    "Company linkedin_url" text NULL,
    created_time timestamp with time zone NULL,
    state text NULL,
    country text NULL,
    lead_linkedin_post_data text NULL,
    lead_linkedin_company_post_data text NULL,
    scraped_company_data text NULL,
    "LEAD PROFILING" text NULL,
    "Overall Score" text NULL,
    "VERDICT" text NULL,
    "Decision-Maker Score" text NULL,
    "Business Need Score" text NULL,
    "Engagement Potential" text NULL,
    "Timing Score" text NULL,
    "Scoring Justification" text NULL,
    "Email-Status" text NULL,
    "Linkedin Connection Request" text NULL,
    "Id" integer GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    "Email-Subject-Line" text NULL,
    linked_post_enum smallint NULL DEFAULT '1'::smallint,
    "Lead-LinkedIn-PostData-DataSetId" text NULL,
    "Email-IceBreaker" text NULL,
    url_lead_id bigint NULL,
    "City" text NULL,
    "Email-Score" smallint NULL,
    "isAddedToInstantly" boolean NOT NULL DEFAULT false,
    "ModifiedCompanyName" text NULL,
    CONSTRAINT leads_pipeline_pkey PRIMARY KEY ("Id"),
    CONSTRAINT leads_pipeline_E_mail_key UNIQUE ("E-mail"),
    CONSTRAINT leads_pipeline_Id_key UNIQUE ("Id"),
    CONSTRAINT leads_pipeline_url_lead_id_fkey FOREIGN KEY (url_lead_id) REFERENCES "url-tasks" ("Id")
) TABLESPACE pg_default;
```

### 2. url_tasks Table

This table stores information about lead generation tasks:

```sql
CREATE TABLE public.url_tasks (
    "URL" text NULL,
    location text NULL,
    "Seniority levels" text NULL,
    "Company size ranges" text NULL,
    "Industry keywords" text NULL,
    "Id" bigint GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    "DefaultDataSetId" text NULL,
    "Title" text NULL,
    "Checkpoint-Status" smallint NOT NULL DEFAULT '0'::smallint,
    created_time timestamp with time zone NULL DEFAULT now(),
    "Task-Status" smallint NULL DEFAULT '1'::smallint,
    CONSTRAINT url_lead_pkey PRIMARY KEY ("Id"),
    CONSTRAINT url_lead_Id_key UNIQUE ("Id")
) TABLESPACE pg_default;
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd darkflow-lead-gen
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## Configuration

### Webhook URLs

The application uses several webhook endpoints that need to be configured. You'll need to modify the following files to replace the hardcoded webhook URLs with your own:

1. Task Management (`src/pages/Index.tsx`):
   - Replace the webhook URL for fetching task list
   - Replace the webhook URL for loading task details

2. Lead Management (`src/components/LeadDetailModal.tsx`):
   - Replace the webhook URL for loading detailed lead information

3. AI Task Assistant (`src/components/AITaskModal.tsx`):
   - Replace the webhook URL for the chat endpoint

### Customization

#### UI Components

The application uses shadcn-ui components which can be customized in the following ways:

1. Theme customization: Edit `tailwind.config.ts` to modify colors, spacing, and other design tokens
2. Component styling: Modify component styles in `src/components/ui/`
3. Layout customization: Edit `src/components/layout/` files

#### Data Models

The main data models are defined in:
- Tasks: `src/types/task.ts`
- Leads: `src/types/lead.ts`

Modify these types to match your data structure.

## Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run build:dev`: Build for development
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build

### Project Structure

```
src/
├── components/     # React components
│   ├── ui/        # UI components
│   └── charts/    # Chart components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
├── pages/         # Page components
└── types/         # TypeScript type definitions
```

## Deployment

1. Build the application:
```bash
npm run build
```

2. The built files will be in the `dist` directory, which can be deployed to any static hosting service.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
