realtime-patientform-app/
│
├── app/                           # Next.js app directory for routing and layouts
│   ├── (backOffice)/              # Back-office routes and layouts
│   │   ├── dashboard/             # Dashboard for managing patient forms
│   │   │   └── page.tsx           # Main dashboard page for form submission and updates
│   │   └── layout.tsx             # Layout for back-office pages
│   └── (home)/                    # Home-facing routes
│       ├── formsubmit/            # Form submission view
│       │   └── page.tsx           # Patient form submission and updates
│       ├── leaving/               # Displays patients leaving the facility
│       │   └── page.tsx           # Handles patient status changes
│       ├── page.tsx               # Homepage listing all patients
│       └── layout.tsx             # Layout for home pages
│
├── components/                    # Reusable UI components
│   ├── dashboard/                 # Dashboard-specific components
│   │   ├── NavBar.tsx             # Navigation bar
│   │   ├── PatientCard.tsx        # Patient card display
│   │   ├── PatientDetails.tsx     # Detailed patient view
│   │   ├── StatusNotification.tsx # Patient status notifications
│   │   └── SearchBar.tsx          # Search functionality
│   ├── form/                      # Form components
│   │   ├── PatientForm.tsx        # Patient form handling
│   │   └── StaffView.tsx          # Staff management view
│   ├── forminput/                 # Form input components
│   │   ├── TextInput.tsx
│   │   ├── RadioInput.tsx
│   │   ├── LanguageInput.tsx
│   │   ├── NationalityInput.tsx
│   │   └── OptionalTextInput.tsx
│   ├── frontend/                  # Frontend elements
│   │   ├── SiteHeader.tsx         # Header with notifications
│   │   └── Footer.tsx             # Footer with dark/light mode toggle
│   ├── Logo.tsx                   # App logo
│   ├── MainNav.tsx                # Main navigation bar
│   ├── ModeToggle.tsx             # Dark/light mode toggle
│   ├── Providers.tsx              # Context providers
│   └── theme-providers.tsx        # Theme context management
│
├── context/                       # Global state management
│   └── PatientContext.tsx         # Manages patient data and statuses
│
├── config/                        # Configuration files
│   └── websocketConfig.ts         # WebSocket server setup
│
├── dist/                          # Compiled server files
│   └── server.mjs                 # WebSocket server logic
│
├── lib/                           # Helper libraries
│   └── socketClient.ts            # Client-side WebSocket logic
│
├── public/                        # Static files (images, icons, etc.)
├── type/                          # TypeScript type definitions
├── ui/                            # Custom UI elements
├── .env                           # Environment variables
├── tsconfig.json                  # TypeScript configuration
├── tsconfig.server.json           # Server-side TypeScript config
├── tailwind.config.ts             # TailwindCSS configuration
├── server.mts                     # WebSocket server entry point
└── next.config.ts                 # Next.js configuration
