# Prescription Analyzer Assistant - Flow Design

## Overview

The Prescription Analyzer Assistant allows a patient to analyze any prescription and then continue chatting with an AI assistant.

The first interaction is **automatic**. Once the user clicks **Analyze**, the system fetches the prescription, sends it to the AI, displays a thinking state, and finally shows the analysis. After that, the chat behaves like a normal AI assistant with full conversation memory.

---

# High Level Architecture

```mermaid
flowchart LR

A[User] --> B[Next.js Frontend]
B --> C[NestJS Backend]
C --> D[(PostgreSQL)]
C --> E[FastAPI AI Service]
E --> F[Gemini/OpenAI]
F --> E
E --> C
C --> B
B --> A
```

---

# Architecture
```mermaid
flowchart TD

    A[👤 User]
    A --> B[Click Analyze]

    B --> C[Open Chat UI]

    C --> D[Send prescriptionId]

    D --> E[NestJS Backend]

    E --> F[(PostgreSQL)]

    E --> G[Verify User Owns Prescription]

    G --> H[Fetch Prescription]

    H --> I[Create Conversation]

    I --> J[Store Conversation]

    J --> K[Convert to AI-friendly JSON]

    K --> L[FastAPI]

    L --> M[LLM]

    M --> N[Generate Initial Analysis]

    N --> O[Stream Response]

    O --> P[Display Analysis]

    P --> Q[User Follow-up Question]

    Q --> E

    E --> R[Load Conversation History]

    R --> L

    L --> M

    M --> S[Generate AI Reply]

    S --> O
```
---

# Complete User Flow

```mermaid
flowchart TD

A[User clicks Analyze] --> B[Open Chat UI]

B --> C[Automatically call handleSend]

C --> D[Send prescriptionId]

D --> E[NestJS API]

E --> F[Fetch Prescription from Database]

F --> G[Send Structured Prescription JSON to FastAPI]

G --> H[AI Analysis Starts]

H --> I[Frontend Shows Thinking Animation]

H --> J[Gemini Generates Analysis]

J --> K[FastAPI Returns Response]

K --> L[NestJS Returns Chat Response]

L --> M[Thinking Stops]

M --> N[Display AI Response]

N --> O[User Can Continue Chatting]

O --> P[Future Messages Use Conversation Context]
```

---

# Frontend Sequence

```mermaid
sequenceDiagram

participant U as User
participant UI as Chat UI
participant FE as Frontend
participant BE as NestJS
participant AI as FastAPI

U->>UI: Click Analyze

UI->>UI: Open Chat Window

UI->>FE: handleSend(prescriptionId)

FE->>UI: Add Thinking Message

FE->>BE: POST /analyze

BE->>AI: Analyze Prescription

AI-->>BE: Analysis

BE-->>FE: Response

FE->>UI: Remove Thinking

FE->>UI: Render AI Message
```

---

# Backend Flow

```mermaid
flowchart TD

Request[Receive prescriptionId]

Request --> Fetch[Fetch Prescription]

Fetch --> Validate{Prescription Exists?}

Validate -- No --> Error[Return Error]

Validate -- Yes --> BuildJSON[Create Structured JSON]

BuildJSON --> FastAPI[Call FastAPI]

FastAPI --> Analyze[Generate AI Analysis]

Analyze --> Save[Optional: Save Conversation]

Save --> Response[Return Response]
```

---

# Chat Lifecycle

```mermaid
stateDiagram-v2

[*] --> Closed

Closed --> Opened : User clicks Analyze

Opened --> Thinking : Automatic Analysis Started

Thinking --> Responded : AI Response Received

Responded --> Chatting : User Sends Message

Chatting --> Thinking : Waiting for AI

Thinking --> Chatting : AI Responds

Chatting --> Closed : User Leaves
```

---

# Thinking State

While FastAPI is processing:

- Disable input (optional)
- Show animated typing indicator
- Display text like:
  - "Analyzing your prescription..."
  - "Checking medicines..."
  - "Looking for interactions..."
  - "Preparing explanation..."

The thinking message is temporary and removed once the AI response arrives.

---

# Conversation States

| State | Description |
|---------|------------|
| idle | Chat not opened |
| initializing | Chat opened |
| sending | Sending prescriptionId |
| fetching | Backend fetching prescription |
| analyzing | AI generating response |
| thinking | Frontend showing loading |
| completed | First response shown |
| chatting | Normal AI conversation |
| error | Something failed |

---

# API Flow

## Initial Analysis

```
POST /analyze/prescription

Body

{
    "prescriptionId": "abc123"
}
```

### Backend

1. Fetch prescription
2. Convert to structured JSON
3. Send JSON to FastAPI
4. Receive analysis
5. Return response

Example response

```json
{
  "conversationId": "conv_123",
  "message": "This prescription contains..."
}
```

---

## Continue Chat

```
POST /chat/message

{
    "conversationId":"conv_123",
    "message":"Can I take this medicine after food?"
}
```

Backend forwards the message to FastAPI together with the conversation context.

---

# Message Flow

```text
User
│
├── Analyze Prescription
│
AI
│
├── Analyzing your prescription...
├── Looking at medications...
├── Checking interactions...
└── Done

↓

AI

"This prescription contains three medicines.

Medicine A is...

Medicine B is...

Possible side effects...

Recommendations..."
```

---

# Error Flow

```mermaid
flowchart TD

Start --> SendRequest

SendRequest --> Success{Success?}

Success -- Yes --> ShowMessage

Success -- No --> Error

Error --> Retry{Retry?}

Retry -- Yes --> SendRequest

Retry -- No --> Close
```

---

# End-to-End Flow Summary

```mermaid
flowchart LR

ClickAnalyze

--> OpenChat

--> SendPrescriptionId

--> NestFetchPrescription

--> FastAPIAnalysis

--> AIModel

--> AnalysisGenerated

--> ResponseReturned

--> ShowResponse

--> ContinueChat

--> ConversationMemory

--> MoreQuestions
```

---

# Design Principles

- **Automatic first message:** The user doesn't need to type anything after clicking **Analyze**; the analysis starts immediately.
- **Responsive UI:** Open the chat instantly and show a thinking indicator while analysis is in progress.
- **Conversation continuity:** Reuse a `conversationId` so follow-up questions have context.
- **Backend separation:** NestJS handles authentication, authorization, data fetching, and orchestration; FastAPI focuses solely on AI reasoning.
- **Scalable architecture:** The same chat infrastructure can later support lab reports, medical history, imaging reports, and general health questions.