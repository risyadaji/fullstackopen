sequenceDiagram
participant browser
participant server

    browser->>browser: Push new Note to List
    browser->>browser: Re-draw/Re-render Notes
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 Created
    deactivate server
